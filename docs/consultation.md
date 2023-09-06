# Consultation

## Current setup with version 16.1.1

<https://github.com/eclipse-tractusx/portal-iam>

### Functional description within Catena-X

<https://github.com/eclipse-tractusx/portal-assets/blob/v1.6.0/developer/Technical%20Documentation/Architecture/Whitebox%20Overall%20System.md>

<https://user-images.githubusercontent.com/94133633/221981092-39f821ac-b98a-4a43-a1bd-9119fef9450a.png>

### Technical description within Catena-X

<https://github.com/eclipse-tractusx/portal-assets/tree/v1.6.0/developer/Technical%20Documentation/Identity%20%26%20Access>

### Technical Setup

Helm charts using the Bitnami chart as dependency:

* <https://github.com/eclipse-tractusx/portal-iam/blob/v1.2.0/charts/centralidp/Chart.yaml#L29>
* <https://github.com/eclipse-tractusx/portal-iam/blob/v1.2.0/charts/sharedidp/Chart.yaml#L29>

Realm import during startup:

* <https://github.com/eclipse-tractusx/portal-iam/blob/v1.2.0/charts/centralidp/values.yaml#L43>
* <https://github.com/eclipse-tractusx/portal-iam/blob/v1.2.0/charts/sharedidp/values.yaml#L43>
* <https://wjw465150.gitbooks.io/keycloak-documentation/content/server_admin/topics/export-import.html>

Seeding job:

* <https://github.com/eclipse-tractusx/portal-iam/blob/v1.2.0/charts/centralidp/values.yaml#L155>
* <https://github.com/eclipse-tractusx/portal-backend/tree/v1.2.0-iam/src/keycloak/Keycloak.Seeding>
* <https://github.com/eclipse-tractusx/portal-backend/blob/v1.2.0-iam/docker/Dockerfile-iam-seeding>

Init container for realm import and seeding job:

* <https://github.com/eclipse-tractusx/portal-iam/blob/v1.2.0/docker/Dockerfile.import>
* <https://github.com/eclipse-tractusx/portal-iam/blob/v1.2.0/docker/Dockerfile.consortia.import>
* <https://github.com/eclipse-tractusx/portal-iam/tree/v1.2.0/import>

## Roadmap

### Version Upgrade

### Get rid of initial realm import and replace it with our .Net seeding job

The seeding job needs to be enhanced for the management of config within the helm chart: variables (e.g. env specific redirects) and secrets (client secrets in k8s secrets)

### Provide solution for issue related to User Token Lifespan setting

Set revokeRefreshToken to false to prevent page reload on token refresh: <https://github.com/catenax-ng/product-portal-iam/pull/25>

### Sustainable sharedidp setup

* Keycloak is slow after many realms are created
* Admin console not even accessible anymore
* Concept for multiple shared instances should be defined

## Preliminary exploration regarding version upgrade

<https://github.com/eclipse-tractusx/portal-iam/pull/20>

Upgrade to v22.0.1: <https://artifacthub.io/packages/helm/bitnami/keycloak/16.1.0>

## Workshops

### 1rst workshop (Sep 27th, 2023)

* Feedback on current setup:
  * How sustainable is our setup?
  * Should we think about forking Keycloak / developing Keycloak on our own to gain more flexibility?
  * Within our current setup: do you have suggestions for improvements?
  * Possibly the topic of [sustainable sharedidp setup](#sustainable-sharedidp-setup) can already be covered to some extent to get some ideas how to approach it.

* [Version upgrade](#version-upgrade) [coming from v16.1.1]:
  * do you see reasons why not to upgrade to v22?
    * recommendation in regards of security <https://artifacthub.io/packages/helm/bitnami/keycloak/16.1.0?modal=security-report>
    * possible stability issues being such a new version <https://www.keycloak.org/docs/latest/upgrading/index.html>
  * dive into possible challenges, to list already the forseeable ones:
    * define deployment approach for upgrade (reusable also for future version upgrades)
    * clarify on major postgres upgrade (14 to 15)
  * explore new features
    * for instance and not limited to an introduction to Quarkus (optimized for containers)

## 2nd workshop (Oct 5th, 2023)

Tbd as part of the [1rst workshop](#1rst-workshop-sep-27th-2023).

Preliminary:

* [User Token Lifespan](#provide-solution-for-issue-related-to-user-token-lifespan-setting)