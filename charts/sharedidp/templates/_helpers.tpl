{{/*
* Copyright (c) 2024 Contributors to the Eclipse Foundation
*
* See the NOTICE file(s) distributed with this work for additional
* information regarding copyright ownership.
*
* This program and the accompanying materials are made available under the
* terms of the Apache License, Version 2.0 which is available at
* https://www.apache.org/licenses/LICENSE-2.0.
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations
* under the License.
*
* SPDX-License-Identifier: Apache-2.0
*/}}

{{/*
Define "sharedidp.fullname" like ""common.names.fullname" in the bitnami common chart but setting ".Chart.Name" to "keycloak".
This is necessary to retrieve the keycloak service name for the execution of the seeding job.
*/}}
{{- define "sharedidp.fullname" -}}
{{- if .Values.keycloak.fullnameOverride -}}
{{- .Values.keycloak.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default "keycloak" .Values.keycloak.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Define secret name for clients secrets of clients (realm seeding).
*/}}
{{- define "sharedidp.secret.realmSeeding.cxOperator" -}}
{{- if .Values.realmSeeding.realms.cxOperator.existingSecret -}}
{{- .Values.realmSeeding.realms.cxOperator.existingSecret }}
{{- else -}}
{{- include "sharedidp.fullname" . -}}-cx-operator-realm-seeding
{{- end -}}
{{- end -}}

{{/*
Define secret name for clients secrets of clients (realm seeding).
*/}}
{{- define "sharedidp.secret.realmSeeding.master" -}}
{{- if .Values.realmSeeding.realms.master.existingSecret -}}
{{- .Values.realmSeeding.realms.master.existingSecret }}
{{- else -}}
{{- include "sharedidp.fullname" . -}}-master-realm-seeding
{{- end -}}
{{- end -}}
