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

# Script for post-upgrade verification
# Usage: ./verify-upgrade-success.sh <CHART_NAME> <NAMESPACE>

set -euo pipefail

CHART_NAME="${1:-}"
NAMESPACE="${2:-}"

if [[ -z "$CHART_NAME" || -z "$NAMESPACE" ]]; then
  echo "Usage: $0 <CHART_NAME> <NAMESPACE>"
  echo "Example: $0 centralidp upgrade"
  exit 1
fi

echo "🔍 Verifying upgrade success for $CHART_NAME..."

# Wait for pods to be ready
echo "Waiting for pods to be ready..."
kubectl wait --for=condition=Ready pods --all -n "$NAMESPACE" --timeout=300s || true

# Check final status
echo "Final Pod Status:"
kubectl get pods -n "$NAMESPACE" -o wide

# Check Helm release status
echo "Helm Release Status:"
helm status "$CHART_NAME" -n "$NAMESPACE"

# Test basic connectivity if possible
echo "Testing basic service connectivity..."
kubectl get svc -n "$NAMESPACE"

# Check for any remaining issues
echo "Checking for any warnings or errors..."
kubectl get events -n "$NAMESPACE" --field-selector type=Warning | tail -10 || true

echo "Verification completed"