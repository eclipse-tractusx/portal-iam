#!/bin/bash
###############################################################
# Copyright (c) 2022 Contributors to the Eclipse Foundation
#
# See the NOTICE file(s) distributed with this work for additional
# information regarding copyright ownership.
#
# This program and the accompanying materials are made available under the
# terms of the Apache License, Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0.
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
#
# SPDX-License-Identifier: Apache-2.0
###############################################################

# Script for Helm upgrade testing with comprehensive diagnostics and fallback to --force
# Usage: ./helm-upgrade-with-diagnostics.sh <CHART_NAME> <CHART_PATH> <VALUES_FILE> <NAMESPACE> <BASE_VERSION>

set -euo pipefail

CHART_NAME="${1:-}"
CHART_PATH="${2:-}"
VALUES_FILE="${3:-}"
NAMESPACE="${4:-}"
BASE_VERSION="${5:-2.1.0}"

if [[ -z "$CHART_NAME" || -z "$CHART_PATH" || -z "$VALUES_FILE" || -z "$NAMESPACE" ]]; then
  echo "Usage: $0 <CHART_NAME> <CHART_PATH> <VALUES_FILE> <NAMESPACE> [BASE_VERSION]"
  echo "Example: $0 centralidp charts/centralidp charts/values-test-upgrade.yaml upgrade 2.1.0"
  exit 1
fi

echo "Starting helm upgrade test for $CHART_NAME..."

# Setup helm repositories
helm repo add bitnami-full-index https://raw.githubusercontent.com/bitnami/charts/archive-full-index/bitnami
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm repo update

echo "Installing base version $BASE_VERSION..."
if ! helm install "$CHART_NAME" "tractusx-dev/$CHART_NAME" -f "$VALUES_FILE" --version "$BASE_VERSION" --namespace "$NAMESPACE" --create-namespace --debug --wait --timeout=15m \
  --set keycloak.image.registry=docker.io \
  --set keycloak.image.repository=bitnamilegacy/keycloak \
  --set keycloak.postgresql.image.registry=docker.io \
  --set keycloak.postgresql.image.repository=bitnamilegacy/postgresql \
  --set keycloak.startupProbe.enabled=false \
  --set keycloak.livenessProbe.initialDelaySeconds=600 \
  --set keycloak.readinessProbe.initialDelaySeconds=300; then
  echo "::error::Base version installation failed"
  echo "Gathering diagnostic information for base installation..."

  # Check pod status
  echo "Pod Status:"
  kubectl get pods -n "$NAMESPACE" -o wide || true

  # Check events
  echo "Namespace Events:"
  kubectl get events -n "$NAMESPACE" --sort-by='.lastTimestamp' || true

  # Get logs from failed pods
  echo "Pod Logs:"
  for pod in $(kubectl get pods -n "$NAMESPACE" --no-headers -o custom-columns=":metadata.name" 2>/dev/null || true); do
    echo "=== Logs for pod: $pod ==="
    kubectl logs "$pod" -n "$NAMESPACE" --all-containers=true --previous=true 2>/dev/null || true
    kubectl logs "$pod" -n "$NAMESPACE" --all-containers=true 2>/dev/null || true
    echo "=== Describe pod: $pod ==="
    kubectl describe pod "$pod" -n "$NAMESPACE" || true
  done
  
  exit 1
fi

echo "Base version installed successfully"
helm dependency update "$CHART_PATH"

echo "⬆️ Attempting upgrade..."
# First attempt upgrade without force
if ! helm upgrade "$CHART_NAME" "$CHART_PATH" -f "$VALUES_FILE" --namespace "$NAMESPACE" --debug --wait --timeout=10m --atomic; then
  echo "::warning::Initial upgrade failed, attempting with --force flag"
  echo "📋 Gathering diagnostic information before retry..."
  
  # Check current state
  echo "Current Pod Status:"
  kubectl get pods -n "$NAMESPACE" -o wide || true
  
  echo "Recent Events:"
  kubectl get events -n "$NAMESPACE" --sort-by='.lastTimestamp' | tail -20 || true
  
  # Get logs from problematic pods
  echo "Current Pod Logs:"
  for pod in $(kubectl get pods -n "$NAMESPACE" --no-headers -o custom-columns=":metadata.name" 2>/dev/null || true); do
    if [[ $(kubectl get pod "$pod" -n "$NAMESPACE" -o jsonpath='{.status.phase}' 2>/dev/null) != "Running" ]]; then
      echo "=== Logs for non-running pod: $pod ==="
      kubectl logs "$pod" -n "$NAMESPACE" --all-containers=true --previous=true 2>/dev/null || true
      kubectl logs "$pod" -n "$NAMESPACE" --all-containers=true 2>/dev/null || true
      kubectl describe pod "$pod" -n "$NAMESPACE" || true
    fi
  done
  
  echo "Retrying upgrade with --force flag..."
  # Retry with force flag if first attempt fails
  if ! helm upgrade "$CHART_NAME" "$CHART_PATH" -f "$VALUES_FILE" --namespace "$NAMESPACE" --debug --wait --timeout=10m --atomic --force; then
    echo "::error::Upgrade failed even with --force flag"
    echo "📋 Final diagnostic information..."
    
    # Comprehensive diagnostics for complete failure
    echo "Final Pod Status:"
    kubectl get pods -n "$NAMESPACE" -o wide || true
    
    echo "All Events:"
    kubectl get events -n "$NAMESPACE" --sort-by='.lastTimestamp' || true
    
    echo "StatefulSet Status:"
    kubectl get statefulset -n "$NAMESPACE" -o wide || true
    kubectl describe statefulset -n "$NAMESPACE" || true
    
    echo "Service Status:"
    kubectl get svc -n "$NAMESPACE" -o wide || true
    
    echo "PVC Status:"
    kubectl get pvc -n "$NAMESPACE" -o wide || true
    
    echo "All Pod Logs:"
    for pod in $(kubectl get pods -n "$NAMESPACE" --no-headers -o custom-columns=":metadata.name" 2>/dev/null || true); do
      echo "=== Complete logs for pod: $pod ==="
      kubectl logs "$pod" -n "$NAMESPACE" --all-containers=true --previous=true 2>/dev/null || true
      kubectl logs "$pod" -n "$NAMESPACE" --all-containers=true 2>/dev/null || true
      echo "=== Complete describe for pod: $pod ==="
      kubectl describe pod "$pod" -n "$NAMESPACE" || true
      echo "=========================="
    done
    
    # Check for common issues
    echo "Checking for common issues..."
    kubectl get events -n "$NAMESPACE" --field-selector type=Warning || true
    
    echo "Both normal and forced upgrade attempts failed"
    exit 1
  else
    echo "::notice::Upgrade succeeded with --force flag"
    echo "Final verification..."
    kubectl get pods -n "$NAMESPACE" -o wide
    echo "Upgrade completed successfully using --force flag"
  fi
else
  echo "::notice::Upgrade succeeded without force"
  echo "Final verification..."
  kubectl get pods -n "$NAMESPACE" -o wide
  echo "Upgrade completed successfully without --force flag"
fi