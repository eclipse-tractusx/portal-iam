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

# Script for Helm chart installation with comprehensive diagnostics
# Usage: ./helm-install-with-diagnostics.sh <CHART_NAME> <CHART_PATH> <VALUES_FILE> <NAMESPACE>

set -euo pipefail

CHART_NAME="${1:-}"
CHART_PATH="${2:-}"
VALUES_FILE="${3:-}"
NAMESPACE="${4:-}"

if [[ -z "$CHART_NAME" || -z "$CHART_PATH" || -z "$VALUES_FILE" || -z "$NAMESPACE" ]]; then
  echo "Usage: $0 <CHART_NAME> <CHART_PATH> <VALUES_FILE> <NAMESPACE>"
  echo "Example: $0 centralidp charts/centralidp charts/values-test-centralidp.yaml install"
  exit 1
fi

echo "Installing $CHART_NAME chart..."
if ! helm install "$CHART_NAME" "$CHART_PATH" -f "$VALUES_FILE" --namespace "$NAMESPACE" --create-namespace --debug --wait --timeout=10m; then
  echo "::error::Chart installation failed"
  echo "Gathering diagnostic information..."
  
  # Check pod status
  echo "Pod Status:"
  kubectl get pods -n "$NAMESPACE" -o wide || true
  
  # Check events
  echo "Namespace Events:"
  kubectl get events -n "$NAMESPACE" --sort-by='.lastTimestamp' || true
  
  # Get logs from failed pods
  echo "Pod Logs:"
  for pod in $(kubectl get pods -n "$NAMESPACE" --no-headers -o custom-columns=":metadata.name" | grep -v Running || true); do
    echo "=== Logs for pod: $pod ==="
    kubectl logs "$pod" -n "$NAMESPACE" --all-containers=true --previous=true || true
    kubectl logs "$pod" -n "$NAMESPACE" --all-containers=true || true
    echo "=== Describe pod: $pod ==="
    kubectl describe pod "$pod" -n "$NAMESPACE" || true
  done
  
  exit 1
fi

echo "Chart installation successful"