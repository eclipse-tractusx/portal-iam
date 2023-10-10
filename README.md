# Catena-X IAM: Keycloak instances

![Tag](https://img.shields.io/static/v1?label=&message=LeadingRepository&color=green&style=flat)

This repository contains the reference configuration to deploy the Catena-X (CX) specific Keycloak instances.

The instances depend on the [helm chart from Bitnami](https://artifacthub.io/packages/helm/bitnami/keycloak) (chart version 16.1.6, app version 22.0.3).

The repository is split up in:

* The helm charts to deploy the CX Keycloak instances
* The CX specific configuration (e.g. keycloak-themes and initial realm-config)
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

## Notice for Docker images

This application provides container images (init containers only) for demonstration purposes.

DockerHub:

* https://hub.docker.com/r/tractusx/portal-iam
* https://hub.docker.com/r/tractusx/portal-iam-consortia

Base image: alpinelinux/docker-alpine:3.17

* Dockerfile: [alpinelinux/docker-alpine:3.17](https://github.com/alpinelinux/docker-alpine/blob/681b8c677aaed66e48a5ce721509647bd4dcd017/x86_64/Dockerfile)
* GitHub project: [https://github.com/alpinelinux/docker-alpine](https://github.com/alpinelinux/docker-alpine))
* DockerHub: [https://hub.docker.com/_/alpine](https://hub.docker.com/_/alpine)

DockerHub:

* https://hub.docker.com/r/tractusx/portal-iam-seeding

Base image: mcr.microsoft.com/dotnet/runtime:6.0-alpine

* Dockerfile: [mcr.microsoft.com/dotnet/runtime:6.0-alpine](https://github.com/dotnet/dotnet-docker/blob/main/src/runtime/6.0/alpine3.17/amd64/Dockerfile)
* GitHub project: [https://github.com/dotnet/dotnet-docker](https://github.com/dotnet/dotnet-docker)
* DockerHub: [https://hub.docker.com/_/microsoft-dotnet-runtime](https://hub.docker.com/_/microsoft-dotnet-runtime)

## License

Distributed under the Apache 2.0 License.
See [LICENSE](./LICENSE) for more information.
