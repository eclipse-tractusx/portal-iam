![LeadingRepository](https://img.shields.io/badge/Leading_Repository-blue)

# IAM: Keycloak instances

This repository contains the reference configuration to deploy the Catena-X (CX) specific Keycloak instances.

The instances depend on the [helm chart from Bitnami](https://artifacthub.io/packages/helm/bitnami/keycloak) (chart version 19.3.0, app version 23.0.7).

The repository is split up in:

* The helm charts to deploy the CX Keycloak instances
* The CX specific configuration (e.g. Keycloak themes and initial realm-config)
* The dockerfile (Dockerfile.import) to build an image containing the CX specific configuration which is used as init container at Keycloak startup
* The CX consortia specific configuration

For further information please refer to the chart specific README files, available under the following directories:

* charts/centralidp
  * [Installation](./charts/centralidp/README.md#installation)
  * [Post-Install Configuration](./charts/centralidp/README.md#post-install-configuration)
  * [Upgrade](./charts/centralidp/README.md#upgrade)
  * [Post-Upgrade Configuration](./charts/centralidp/README.md#post-upgrade-configuration)
* charts/sharedidp
  * [Installation](./charts/sharedidp/README.md#installation)
  * [Post-Install Configuration](./charts/sharedidp/README.md#post-install-configuration)
  * [Upgrade](./charts/sharedidp/README.md#upgrade)

## Known Issues and Limitations

See [Known Knowns](/docs/technical%20documentation/16.%20Known-Knowns.md).

## Notice for Docker images

This application provides container images for demonstration purposes.

See Docker notice files for more information:

* [portal-iam](./docker/notice-iam.md)
* [portal-iam-seeding](https://github.com/eclipse-tractusx/portal-backend/blob/main/docker/notice-iam-seeding.md)

## License

Distributed under the Apache 2.0 License.
See [LICENSE](./LICENSE) for more information.
