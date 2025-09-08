# Helm chart for Shared Keycloak Instance

![Version: 4.2.1-rc.2](https://img.shields.io/badge/Version-4.2.1--rc.2-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 25.0.6](https://img.shields.io/badge/AppVersion-25.0.6-informational?style=flat-square)

This helm chart installs the Helm chart for Shared Keycloak Instance.

For further information please refer to the [technical documentation](/docs/admin/technical-documentation).

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
    version: 4.2.1-rc.2
```

## Requirements

| Repository | Name | Version |
|------------|------|---------|
| https://raw.githubusercontent.com/bitnami/charts/archive-full-index/bitnami | keycloak | 23.0.0 |

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| keycloak.image.registry | string | `"docker.io"` |  |
| keycloak.image.repository | string | `"bitnamilegacy/keycloak"` |  |
| keycloak.image.tag | string | `"25.0.6-debian-12-r0"` |  |
| keycloak.auth.adminUser | string | `"admin"` |  |
| keycloak.auth.adminPassword | string | `""` | sharedidp Keycloak administrator password. |
| keycloak.auth.existingSecret | string | `""` | Secret containing the password for admin username 'admin'. |
| keycloak.production | bool | `false` | Run Keycloak in production mode. TLS configuration is required except when using proxy=edge. |
| keycloak.httpRelativePath | string | `"/auth/"` | Setting the path relative to '/' for serving resources: as we're migrating from 16.1.1 version which was using the trailing 'auth', we're setting it to '/auth/'. ref: https://www.keycloak.org/migration/migrating-to-quarkus#_default_context_path_changed |
| keycloak.replicaCount | int | `1` |  |
| keycloak.extraVolumes[0].name | string | `"themes-catenax-shared"` |  |
| keycloak.extraVolumes[0].emptyDir | object | `{}` |  |
| keycloak.extraVolumes[1].name | string | `"themes-catenax-shared-portal"` |  |
| keycloak.extraVolumes[1].emptyDir | object | `{}` |  |
| keycloak.extraVolumeMounts[0].name | string | `"themes-catenax-shared"` |  |
| keycloak.extraVolumeMounts[0].mountPath | string | `"/opt/bitnami/keycloak/themes/catenax-shared"` |  |
| keycloak.extraVolumeMounts[1].name | string | `"themes-catenax-shared-portal"` |  |
| keycloak.extraVolumeMounts[1].mountPath | string | `"/opt/bitnami/keycloak/themes/catenax-shared-portal"` |  |
| keycloak.initContainers[0].name | string | `"import"` |  |
| keycloak.initContainers[0].image | string | `"docker.io/tractusx/portal-iam:v4.2.0"` |  |
| keycloak.initContainers[0].imagePullPolicy | string | `"IfNotPresent"` |  |
| keycloak.initContainers[0].command[0] | string | `"sh"` |  |
| keycloak.initContainers[0].args[0] | string | `"-c"` |  |
| keycloak.initContainers[0].args[1] | string | `"echo \"Copying themes-catenax-shared...\"\ncp -R /import/themes/catenax-shared/* /themes-catenax-shared\necho \"Copying themes-catenax-shared-portal...\"\ncp -R /import/themes/catenax-shared-portal/* /themes-catenax-shared-portal\n"` |  |
| keycloak.initContainers[0].volumeMounts[0].name | string | `"themes-catenax-shared"` |  |
| keycloak.initContainers[0].volumeMounts[0].mountPath | string | `"/themes-catenax-shared"` |  |
| keycloak.initContainers[0].volumeMounts[1].name | string | `"themes-catenax-shared-portal"` |  |
| keycloak.initContainers[0].volumeMounts[1].mountPath | string | `"/themes-catenax-shared-portal"` |  |
| keycloak.service.sessionAffinity | string | `"ClientIP"` |  |
| keycloak.ingress.enabled | bool | `false` | Enable ingress record generation |
| keycloak.ingress.ingressClassName | string | `""` |  |
| keycloak.ingress.hostname | string | `""` | Provide default path for the ingress record. |
| keycloak.ingress.annotations | object | `{}` | Optional annotations when using the nginx ingress class; Enable TLS configuration for the host defined at `ingress.hostname` parameter; TLS certificates will be retrieved from a TLS secret with name: `{{- printf "%s-tls" .Values.ingress.hostname }}`; Provide the name of ClusterIssuer to acquire the certificate required for this Ingress. |
| keycloak.ingress.tls | bool | `false` |  |
| keycloak.rbac.create | bool | `true` |  |
| keycloak.rbac.rules[0].apiGroups[0] | string | `""` |  |
| keycloak.rbac.rules[0].resources[0] | string | `"pods"` |  |
| keycloak.rbac.rules[0].verbs[0] | string | `"get"` |  |
| keycloak.rbac.rules[0].verbs[1] | string | `"list"` |  |
| keycloak.postgresql.enabled | bool | `true` | PostgreSQL chart configuration (recommended for demonstration purposes only); default configurations: host: "sharedidp-postgresql", port: 5432; Switch to enable or disable the PostgreSQL helm chart. |
| keycloak.postgresql.image | object | `{"registry":"docker.io","repository":"bitnamilegacy/postgresql","tag":"15-debian-11"}` | Setting to Postgres version 15 as that is the aligned version, https://eclipse-tractusx.github.io/docs/release/trg-5/trg-5-07/#aligning-dependency-versions). Keycloak helm-chart from Bitnami has moved on to version 16. |
| keycloak.postgresql.commonLabels."app.kubernetes.io/version" | string | `"15"` |  |
| keycloak.postgresql.auth.username | string | `"kcshared"` | Non-root username. |
| keycloak.postgresql.auth.password | string | `""` | Non-root user password. |
| keycloak.postgresql.auth.postgresPassword | string | `""` | Root user password. |
| keycloak.postgresql.auth.database | string | `"iamsharedidp"` | Database name. |
| keycloak.postgresql.auth.existingSecret | string | `""` | Secret containing the passwords for root usernames postgres and non-root username kcshared. |
| keycloak.postgresql.architecture | string | `"standalone"` |  |
| keycloak.externalDatabase.host | string | `""` | External PostgreSQL configuration IMPORTANT: non-root db user needs needs to be created beforehand on external database. |
| keycloak.externalDatabase.port | int | `5432` | Database port number. |
| keycloak.externalDatabase.user | string | `""` | Non-root username. |
| keycloak.externalDatabase.database | string | `""` | Database name. |
| keycloak.externalDatabase.password | string | `""` | Password for the non-root username. |
| keycloak.externalDatabase.existingSecret | string | `""` | Secret containing the database credentials. |
| keycloak.externalDatabase.existingSecretHostKey | string | `""` |  |
| keycloak.externalDatabase.existingSecretPortKey | string | `""` |  |
| keycloak.externalDatabase.existingSecretUserKey | string | `""` |  |
| keycloak.externalDatabase.existingSecretDatabaseKey | string | `""` |  |
| keycloak.externalDatabase.existingSecretPasswordKey | string | `""` |  |
| realmSeeding | object | `{"enabled":true,"image":{"name":"docker.io/tractusx/portal-iam-seeding:v4.2.0-iam","pullPolicy":"IfNotPresent"},"initContainer":{"image":{"name":"docker.io/tractusx/portal-iam:v4.2.0","pullPolicy":"IfNotPresent"}},"keycloakServicePort":80,"keycloakServiceTls":false,"portContainer":8080,"realms":{"cxOperator":{"centralidp":"https://centralidp.example.org","existingSecret":"","initialUser":{"eMail":"cx-operator@tx.org","firstName":"Operator","lastName":"CX Admin","password":"","username":"cx-operator@tx.org"},"mailing":{"from":"email@example.org","host":"smtp.example.org","password":"","port":"123","replyTo":"email@example.org","username":"smtp-user"},"sslRequired":"external"},"master":{"existingSecret":"","serviceAccounts":{"provisioning":{"clientSecret":""},"saCxOperator":{"clientSecret":""}}}},"resources":{"limits":{"cpu":"750m","ephemeral-storage":"1024Mi","memory":"700M"},"requests":{"cpu":"250m","ephemeral-storage":"50Mi","memory":"700M"}}}` | Seeding job to create and update the CX-Operator and master realms: besides creating those realm, the job can be used to update the configuration of the realms when upgrading to a new version; Please refer to /docs/admin/technical-documentation/14. Realm Seeding.md for more details. Please also refer to the 'Post-Upgrade Configuration' section in the README.md for configuration possibly not covered by the seeding job. |
| realmSeeding.realms.cxOperator.sslRequired | string | `"external"` | Possible ssl required options defined by Keycloak: all, external and none; 'none' should only be set in non-productive scenarios. |
| realmSeeding.realms.cxOperator.centralidp | string | `"https://centralidp.example.org"` | Set centralidp address for the connection to the CX-Central realm. |
| realmSeeding.realms.cxOperator.initialUser | object | `{"eMail":"cx-operator@tx.org","firstName":"Operator","lastName":"CX Admin","password":"","username":"cx-operator@tx.org"}` | Configure initial user in CX-Operator realm. |
| realmSeeding.realms.cxOperator.initialUser.username | string | `"cx-operator@tx.org"` | SET username for all non-testing and non-local purposes. |
| realmSeeding.realms.cxOperator.initialUser.password | string | `""` | SET password for all non-testing and non-local purposes, default value is "!3changemeTractus-X". |
| realmSeeding.realms.cxOperator.mailing | object | `{"from":"email@example.org","host":"smtp.example.org","password":"","port":"123","replyTo":"email@example.org","username":"smtp-user"}` | Set mailing configuration for CX-Operator realm. |
| realmSeeding.realms.cxOperator.existingSecret | string | `""` | Option to provide an existingSecret for initial user and mailing configuration. |
| realmSeeding.realms.master.serviceAccounts.provisioning | object | `{"clientSecret":""}` | Set clients secret for the service account which enables the portal to provision new realms. |
| realmSeeding.realms.master.serviceAccounts.provisioning.clientSecret | string | `""` | SET client secret for all non-testing and non-local purposes, default value is autogenerated. |
| realmSeeding.realms.master.serviceAccounts.saCxOperator | object | `{"clientSecret":""}` | Set clients secret for the service account which enables the portal to manage the CX-Operator realm. |
| realmSeeding.realms.master.serviceAccounts.saCxOperator.clientSecret | string | `""` | SET client secret for all non-testing and non-local purposes, default value is autogenerated. |
| realmSeeding.realms.master.existingSecret | string | `""` | Option to provide an existingSecret for clients secrets with clientId as key and clientSecret as value. |
| realmSeeding.resources | object | `{"limits":{"cpu":"750m","ephemeral-storage":"1024Mi","memory":"700M"},"requests":{"cpu":"250m","ephemeral-storage":"50Mi","memory":"700M"}}` | We recommend to review the default resource limits as this should a conscious choice. |

Autogenerated with [helm docs](https://github.com/norwoodj/helm-docs)

## Upgrade

Please see notes at [Values.seeding](values.yaml#L140) for upgrading the configuration of the CX-Operator and master realm.

### To 4.0.1

No issues are expected during the upgrade.

### To 4.0.0

This major changes from the Keycloak version from  23.0.7 to 25.0.6.

Please be aware that proxy parameter was deprecated and therefore removed. When enabling the production mode, it is to be expected to encounter the following error at install if none of the conditions listed [here](https://github.com/bitnami/charts/blob/eb2b3bdd8612a754c1b7e28237e9a32f6661eaab/bitnami/keycloak/templates/_helpers.tpl#L343) are met:

`
Error: INSTALLATION FAILED: execution error at (sharedidp/charts/keycloak/templates/NOTES.txt:100:4):
VALUES VALIDATION:
keycloak: production
    In order to enable Production mode, you also need to enable HTTPS/TLS
    using the value 'tls.enabled' and providing an existing secret containing the Keystore and Trustore.
`

No major issues are expected during the upgrade. Nonetheless, a blue-green deployment approach - [as outlined for previous major version upgrades](#upgrade-approach) -  is recommended.

### To 3.0.1

No major issues are expected during the upgrade.

### To 3.0.0

This major changes from the Keycloak version from  22.0.3 to 23.0.7 and bumps the PostgresSQL version of the subchart from 15.4.0 to the latest available version of 15.

No major issues are expected during the upgrade.

### To 2.1.0

No specific upgrade notes.

### To 2.0.0

This major changes from the Keycloak version from 16.1.1 to version 22.0.3.

Please have a look at the [CHANGELOG](../../CHANGELOG.md#200) for a more detailed description.

We also recommend checking out the [Keycloak Upgrading Guide](https://www.keycloak.org/docs/latest/upgrading/index.html).

To be explicitly mentioned: this major adds the production mode with default value false and the reverse proxy mode with default value passthrough.
Please check the description of those parameters and decide if they're suitable for you.

#### Upgrade approach

For the overall process of migrating from version 16.1.1 to version 22.0.3., we recommend to follow a blue-green deployment approach. In the following, you find a rough outline of the necessary steps:

1. Scale down current the Keycloak services (blue deployment)
2. Backup the current data
3. Deploy the new Keycloak instance (green deployment e.g: `-green`, `-kc22`, ...) in another namespace than the blue instance
4. Restore the data of the blue instance to the green instance
5. Start the new Keycloak services
6. Once the new/green instance is validated, switch the user traffic to it

#### Upgrade PostgreSQL

Please be aware that this major changes the version of the PostgreSQL subchart by Bitnami from 14.x.x to 15.x.x (subchart updated from version 11.x.x to 12.x.x).

In case you are using an external PostgreSQL instance and would like to upgrade to 15.x, please follow the [official instructions](https://www.postgresql.org/docs/15/upgrading.html).

In case you would like to upgrade the PostgreSQL subchart from Bitnami, we recommend blue-green deployment approach, like described [above](#upgrade-approach).
For restoring the data of the blue instance to the green instance (step 4), execute the following statement using [pg-dumpall](https://www.postgresql.org/docs/current/app-pg-dumpall.html):

On the cluster:

```shell
 kubectl exec -it green-postgresql-primary-0 -n green-namespace -- /opt/bitnami/scripts/postgresql/entrypoint.sh /bin/bash -c 'export PGPASSWORD=""; echo "local all postgres trust" > /opt/bitnami/postgresql/conf/pg_hba.conf; pg_ctl reload; time pg_dumpall -c -h 10-123-45-67.blue-namespace.pod.cluster.local -U postgres | psql -U postgres'
 ```

Or on the primary pod of the new/green PostgreSQL instance:

```shell
/opt/bitnami/scripts/postgresql/entrypoint.sh /bin/bash -c 'export PGPASSWORD=""; echo "local all postgres trust" > /opt/bitnami/postgresql/conf/pg_hba.conf; pg_ctl reload; time pg_dumpall -c -h 10-123-45-67.blue-namespace.pod.cluster.local -U postgres | psql -U postgres'
```

Where '10-123-45-67' is the cluster IP of the old/blue PostgreSQL instance.
