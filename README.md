# Catena-X IAM: Keycloak instances

![Version: 1.0.0](https://img.shields.io/badge/Version-1.0.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 1.0.0](https://img.shields.io/badge/AppVersion-1.0.0-informational?style=flat-square) ![Tag](https://img.shields.io/static/v1?label=&message=LeadingRepository&color=green&style=flat)

This repository contains the reference configuration to deploy the Catena-X (CX) specific Keycloak instances.

The instances depend on the [helm chart from Bitnami](https://artifacthub.io/packages/helm/bitnami/keycloak) (chart version 7.1.18, app version 16.1.1).

The repository is split up in:

* The helm charts to deploy the CX Keycloak instances
* The CX specific configuration (e.g. keycloak-themes and initial realm-config)
* The dockerfile (Dockerfile.import) to build an image containing the CX specific configuration which is used as init container at Keycloak startup

For information regarding the **installation** of the helm chart please refer to the chart specific README files, available under the following directories:

* charts/centralidp
* charts/sharedidp

For further information please refer to the [technical documentation](https://github.com/eclipse-tractusx/portal-assets/tree/1.0.0/developer/Technical%20Documentation).

The referenced container images are for demonstration purposes only.
