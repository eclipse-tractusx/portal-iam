# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X IAM - Keycloak instances.

## 1.1.0

### Change

* realm init (centralidp - cx-central): see [Post-Upgrade Configuration](./charts/centralidp/README.md#post-upgrade-configuration)

### Bugfix

* login theme (centralidp - cx-central): allowed to search for numbers only at idp-selection

### Technical Support

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
