# Helm chart for Catena-X Shared Keycloak Instance

![Version: 1.0.1](https://img.shields.io/badge/Version-1.0.1-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 1.0.0](https://img.shields.io/badge/AppVersion-1.0.0-informational?style=flat-square)

This helm chart installs the Helm chart for Catena-X Shared Keycloak Instance.

For further information please refer to the [technical documentation](https://github.com/eclipse-tractusx/portal-assets/tree/1.0.0/developer/Technical%20Documentation).

The referenced container images are for demonstration purposes only.

## Installation

To install the chart with the release name `sharedidp`:

```shell
$ helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
$ helm install sharedidp tractusx-dev/sharedidp
```

To install the helm chart into your cluster with your values:

```shell
$ helm install -f your-values.yaml sharedidp tractusx-dev/sharedidp
```

To use the helm chart as a dependency:

```yaml
dependencies:
  - name: sharedidp
    repository: https://eclipse-tractusx.github.io/charts/dev
    version: 1.0.1
```

## Requirements

| Repository | Name | Version |
|------------|------|---------|
| https://raw.githubusercontent.com/bitnami/charts/archive-full-index/bitnami | keycloak | 7.1.18 |

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| keycloak.image.tag | string | `"16.1.1-debian-10-r103"` |  |
| keycloak.auth.adminUser | string | `"admin"` |  |
| keycloak.auth.existingSecret | string | `"sharedidp-keycloak"` | Secret containing the passwords for admin username 'admin' and management username 'manager'. |
| keycloak.proxyAddressForwarding | bool | `true` |  |
| keycloak.serviceDiscovery.enabled | bool | `true` |  |
| keycloak.extraEnvVars[0].name | string | `"KEYCLOAK_USER"` |  |
| keycloak.extraEnvVars[0].value | string | `"admin"` |  |
| keycloak.extraEnvVars[1].name | string | `"KEYCLOAK_PASSWORD"` |  |
| keycloak.extraEnvVars[1].valueFrom.secretKeyRef.name | string | `"sharedidp-keycloak"` |  |
| keycloak.extraEnvVars[1].valueFrom.secretKeyRef.key | string | `"admin-password"` |  |
| keycloak.extraEnvVars[2].name | string | `"CACHE_OWNERS_COUNT"` |  |
| keycloak.extraEnvVars[2].value | string | `"3"` |  |
| keycloak.extraEnvVars[3].name | string | `"CACHE_OWNERS_AUTH_SESSIONS_COUNT"` |  |
| keycloak.extraEnvVars[3].value | string | `"3"` |  |
| keycloak.extraEnvVars[4].name | string | `"KEYCLOAK_EXTRA_ARGS"` |  |
| keycloak.extraEnvVars[4].value | string | `"-Dkeycloak.migration.action=import -Dkeycloak.migration.provider=dir -Dkeycloak.migration.dir=/realms -Dkeycloak.migration.strategy=IGNORE_EXISTING"` |  |
| keycloak.replicaCount | int | `3` |  |
| keycloak.extraVolumes[0].name | string | `"themes-catenax-shared"` |  |
| keycloak.extraVolumes[0].emptyDir | object | `{}` |  |
| keycloak.extraVolumes[1].name | string | `"themes-catenax-shared-portal"` |  |
| keycloak.extraVolumes[1].emptyDir | object | `{}` |  |
| keycloak.extraVolumes[2].name | string | `"realms"` |  |
| keycloak.extraVolumes[2].emptyDir | object | `{}` |  |
| keycloak.extraVolumeMounts[0].name | string | `"themes-catenax-shared"` |  |
| keycloak.extraVolumeMounts[0].mountPath | string | `"/opt/bitnami/keycloak/themes/catenax-shared"` |  |
| keycloak.extraVolumeMounts[1].name | string | `"themes-catenax-shared-portal"` |  |
| keycloak.extraVolumeMounts[1].mountPath | string | `"/opt/bitnami/keycloak/themes/catenax-shared-portal"` |  |
| keycloak.extraVolumeMounts[2].name | string | `"realms"` |  |
| keycloak.extraVolumeMounts[2].mountPath | string | `"/realms"` |  |
| keycloak.initContainers[0].name | string | `"import"` |  |
| keycloak.initContainers[0].image | string | `"ghcr.io/catenax-ng/tx-portal-iam_iam-import:v1.0.0"` |  |
| keycloak.initContainers[0].imagePullPolicy | string | `"Always"` |  |
| keycloak.initContainers[0].command[0] | string | `"sh"` |  |
| keycloak.initContainers[0].args[0] | string | `"-c"` |  |
| keycloak.initContainers[0].args[1] | string | `"echo \"Copying themes-catenax-shared...\"\ncp -R /import/themes/catenax-shared/* /themes-catenax-shared\necho \"Copying themes-catenax-shared-portal...\"\ncp -R /import/themes/catenax-shared-portal/* /themes-catenax-shared-portal\necho \"Copying realms...\"\ncp -R /import/catenax-shared/realms/* /realms\n"` |  |
| keycloak.initContainers[0].volumeMounts[0].name | string | `"themes-catenax-shared"` |  |
| keycloak.initContainers[0].volumeMounts[0].mountPath | string | `"/themes-catenax-shared"` |  |
| keycloak.initContainers[0].volumeMounts[1].name | string | `"themes-catenax-shared-portal"` |  |
| keycloak.initContainers[0].volumeMounts[1].mountPath | string | `"/themes-catenax-shared-portal"` |  |
| keycloak.initContainers[0].volumeMounts[2].name | string | `"realms"` |  |
| keycloak.initContainers[0].volumeMounts[2].mountPath | string | `"/realms"` |  |
| keycloak.service.type | string | `"ClusterIP"` |  |
| keycloak.service.sessionAffinity | string | `"ClientIP"` |  |
| keycloak.ingress.enabled | bool | `false` |  |
| keycloak.ingress.ingressClassName | string | `"nginx"` |  |
| keycloak.ingress.hostname | string | `"sharedidp.example.org"` | Provide default path for the ingress record. |
| keycloak.ingress.annotations."cert-manager.io/cluster-issuer" | string | `""` | Enable TLS configuration for the host defined at `ingress.hostname` parameter; TLS certificates will be retrieved from a TLS secret with name: `{{- printf "%s-tls" .Values.ingress.hostname }}`; Provide the name of ClusterIssuer to acquire the certificate required for this Ingress |
| keycloak.ingress.annotations."nginx.ingress.kubernetes.io/cors-allow-credentials" | string | `"true"` |  |
| keycloak.ingress.annotations."nginx.ingress.kubernetes.io/cors-allow-methods" | string | `"PUT, GET, POST, OPTIONS"` |  |
| keycloak.ingress.annotations."nginx.ingress.kubernetes.io/cors-allow-origin" | string | `"https://sharedidp.example.org"` |  |
| keycloak.ingress.annotations."nginx.ingress.kubernetes.io/enable-cors" | string | `"true"` |  |
| keycloak.ingress.annotations."nginx.ingress.kubernetes.io/proxy-buffer-size" | string | `"128k"` |  |
| keycloak.ingress.annotations."nginx.ingress.kubernetes.io/proxy-buffering" | string | `"on"` |  |
| keycloak.ingress.annotations."nginx.ingress.kubernetes.io/proxy-buffers-number" | string | `"20"` |  |
| keycloak.ingress.annotations."nginx.ingress.kubernetes.io/use-regex" | string | `"true"` |  |
| keycloak.ingress.tls | bool | `true` |  |
| keycloak.rbac.create | bool | `true` |  |
| keycloak.rbac.rules[0].apiGroups[0] | string | `""` |  |
| keycloak.rbac.rules[0].resources[0] | string | `"pods"` |  |
| keycloak.rbac.rules[0].verbs[0] | string | `"get"` |  |
| keycloak.rbac.rules[0].verbs[1] | string | `"list"` |  |
| keycloak.postgresql.enabled | bool | `true` | PostgreSQL chart configuration; default configurations: host: "sharedidp-postgresql-primary", port: 5432; Switch to enable or disable the PostgreSQL helm chart. |
| keycloak.postgresql.auth.username | string | `"kcshared"` | Non-root username. |
| keycloak.postgresql.auth.database | string | `"iamsharedidp"` | Database name. |
| keycloak.postgresql.auth.existingSecret | string | `"sharedidp-postgres"` | Secret containing the passwords for root usernames postgres and non-root username kcshared. |
| keycloak.postgresql.architecture | string | `"replication"` |  |
| keycloak.externalDatabase.host | string | `"sharedidp-postgresql-external-db"` | External PostgreSQL configuration IMPORTANT: non-root db user needs needs to be created beforehand on external database. Database host ('-primary' is added as postfix). |
| keycloak.externalDatabase.port | int | `5432` | Database port number. |
| keycloak.externalDatabase.user | string | `"kcshared"` | Non-root username for sharedidp. |
| keycloak.externalDatabase.database | string | `"iamsharedidp"` | Database name. |
| keycloak.externalDatabase.password | string | `""` | Password for the non-root username (default 'kcshared'). Secret-key 'password'. |
| keycloak.externalDatabase.existingSecret | string | `"sharedidp-keycloak-external-db"` | Secret containing the password non-root username, (default 'kcshared'). |
| keycloak.externalDatabase.existingSecretPasswordKey | string | `"password"` | Name of an existing secret key containing the database credentials. |
| secrets.auth.existingSecret.adminpassword | string | `""` | Password for the admin username 'admin'. Secret-key 'admin-password'. |
| secrets.auth.existingSecret.managementpassword | string | `""` | Password Wildfly management username 'manager'. Secret-key 'management-password'. |
| secrets.postgresql.auth.existingSecret.postgrespassword | string | `""` | Password for the root username 'postgres'. Secret-key 'postgres-password'. |
| secrets.postgresql.auth.existingSecret.password | string | `""` | Password for the non-root username 'kcshared'. Secret-key 'password'. |
| secrets.postgresql.auth.existingSecret.replicationPassword | string | `""` | Password for the non-root username 'repl_user'. Secret-key 'replication-password'. |
| secrets.realmuser.enabled | bool | `false` |  |

Autogenerated with [helm docs](https://github.com/norwoodj/helm-docs)

## Post-Install Configuration

Once the installation is completed, the following steps need to be executed in the Keycloak admin console:

### Within the master realm:

Generate client-secrets for the service account with access type 'confidential'.

### Within the CX-Operator realm:

#### Establish connection to the centralidp instance:

1. Change the example.org placeholder in the central-idp client the to the address of the centralidp instance:

* Settings --> Valid Redirect URI
* Keys --> JWKS URL

2. Set password and user details for the initial user.

3. Setup SMTP configuration (Realm Settings --> Email)
