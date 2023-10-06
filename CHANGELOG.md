# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X IAM * Keycloak instances.

## 2.0.0-alpha

### Change

* changed to v22.0.3 ([bitnami chart version: 16.1.6](https://artifacthub.io/packages/helm/bitnami/keycloak/16.1.6))
  * bumped chart version to to major 2.0.0 (alpha)
  * changed appVersion from 1.2.0 to 22.0.3 to align with Keycloak version as that's more intuitive
  * added production mode with default false
  * added reverse proxy mode with default passthrough
  * removed service type: default value is ClusterIP in new bitnami chart version
  * removed proxyAddressForwarding
  * removed serviceDiscovery
  * set httpRelativePath to '/auth/', as we're migrating from 16.1.1 version which was using the trailing 'auth'
  * updated retrieval of service name for seeding job
  * removed management-password from secrets as key isn't part of default secret anymore

 Please be aware that **this version is still in alpha phase**: especially the upgrade documentation WIP.
### Bugfix

* fixed escaping of secret values: quotes added

### Technical Support

* updated k8s version and version to upgrade from for helm test workflows
* updated SECURITY.md

## 1.2.0

### Change

* realm configuration (centralidp): updated CX-Central realm
* added post-upgrade documentation for v1.2.0, see [Post-Upgrade Configuration](./charts/centralidp/README.md#post-upgrade-configuration)
* login theme (sharedidp):
  * enabled hints about password policy
  * align registration theme with portal theme
* changed container registry for init containers to Docker Hub
* changed license notice for images

### Feature

* added seeding job to upgrade the configuration of the CX-Central realm (centralidp)

### Bugfix

* login theme (centralidp * cx-central): fixed browser 64k limit for single node text
* login theme (sharedidp * registration): fixed screen layout for wide displays

## 1.1.0

### Change

* realm init (centralidp * cx-central): see [Post-Upgrade Configuration](./charts/centralidp/README.md#post-upgrade-configuration)
* changed to secret name to be retrieved from values file

### Bugfix

* login theme (centralidp * cx-central): allowed to search for numbers only at idp-selection
* enabled usage of existing secret values if secret exists: stops regeneration of random secret values at 'helm upgrade'
* stopped creation of the corresponding secret if database dependency is disabled
* realm init (centralidp): switched to singleFile import

### Technical Support

* added documentation for post-upgrade configuration
* trg: added repo metafile
* upgraded workflow actions

## 1.0.1

### Technical Support

* added license files on chart level
* added information about home and sources to charts

## 1.0.0

### Change

* moved centralidp login theme into iam repository, removed link to portal-assets.
* updated init realms.
* moved to bitnami-full-index as dependency repository.

### Feature

* added option for external database.

### Technical Support

* added chart test workflow for lint and install.
* added documentation for installation and changelog.

### Bugfix

* fixed sharedidp login theme.
* added temporary fix for cve-2023-0286.

## 0.6.0

### Change

* moved repository to eclipse-tractusx.
