# Helm chart for Central Keycloak Instance

![Version: 3.0.0](https://img.shields.io/badge/Version-3.0.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 23.0.7](https://img.shields.io/badge/AppVersion-23.0.7-informational?style=flat-square)

This helm chart installs the Helm chart for Central Keycloak Instance.

For further information please refer to the [technical documentation](../../docs/technical%20documentation).

The referenced container images are for demonstration purposes only.

## Installation

To install the chart with the release name `centralidp`:

```shell
$ helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
$ helm install centralidp tractusx-dev/centralidp
```

To install the helm chart into your cluster with your values:

```shell
$ helm install -f your-values.yaml centralidp tractusx-dev/centralidp
```

To use the helm chart as a dependency:

```yaml
dependencies:
  - name: centralidp
    repository: https://eclipse-tractusx.github.io/charts/dev
    version: 3.0.0
```

## Requirements

| Repository | Name | Version |
|------------|------|---------|
| https://raw.githubusercontent.com/bitnami/charts/archive-full-index/bitnami | keycloak | 19.3.0 |

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| keycloak.auth.adminUser | string | `"admin"` |  |
| keycloak.auth.existingSecret | string | `"centralidp-keycloak"` | Secret containing the passwords for admin username 'admin' and management username 'manager'. |
| keycloak.production | bool | `false` | Run Keycloak in production mode. TLS configuration is required except when using proxy=edge. |
| keycloak.proxy | string | `"passthrough"` | reverse Proxy mode edge, reencrypt, passthrough or none; ref: https://www.keycloak.org/server/reverseproxy; If your ingress controller has the SSL Termination, you should set proxy to edge. |
| keycloak.httpRelativePath | string | `"/auth/"` | Setting the path relative to '/' for serving resources: as we're migrating from 16.1.1 version which was using the trailing 'auth', we're setting it to '/auth/'. ref: https://www.keycloak.org/migration/migrating-to-quarkus#_default_context_path_changed |
| keycloak.extraEnvVars[0].name | string | `"KEYCLOAK_EXTRA_ARGS"` |  |
| keycloak.extraEnvVars[0].value | string | `"-Dkeycloak.migration.action=import -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=/realms/CX-Central-realm.json -Dkeycloak.migration.strategy=IGNORE_EXISTING"` |  |
| keycloak.replicaCount | int | `3` |  |
| keycloak.extraVolumes[0].name | string | `"themes"` |  |
| keycloak.extraVolumes[0].emptyDir | object | `{}` |  |
| keycloak.extraVolumes[1].name | string | `"realms"` |  |
| keycloak.extraVolumes[1].emptyDir | object | `{}` |  |
| keycloak.extraVolumeMounts[0].name | string | `"themes"` |  |
| keycloak.extraVolumeMounts[0].mountPath | string | `"/opt/bitnami/keycloak/themes/catenax-central"` |  |
| keycloak.extraVolumeMounts[1].name | string | `"realms"` |  |
| keycloak.extraVolumeMounts[1].mountPath | string | `"/realms"` |  |
| keycloak.initContainers[0].name | string | `"import"` |  |
| keycloak.initContainers[0].image | string | `"docker.io/tractusx/portal-iam:v3.0.0"` |  |
| keycloak.initContainers[0].imagePullPolicy | string | `"IfNotPresent"` |  |
| keycloak.initContainers[0].command[0] | string | `"sh"` |  |
| keycloak.initContainers[0].args[0] | string | `"-c"` |  |
| keycloak.initContainers[0].args[1] | string | `"echo \"Copying themes...\"\ncp -R /import/themes/catenax-central/* /themes\necho \"Copying realms...\"\ncp -R /import/catenax-central/realms/* /realms\n"` |  |
| keycloak.initContainers[0].volumeMounts[0].name | string | `"themes"` |  |
| keycloak.initContainers[0].volumeMounts[0].mountPath | string | `"/themes"` |  |
| keycloak.initContainers[0].volumeMounts[1].name | string | `"realms"` |  |
| keycloak.initContainers[0].volumeMounts[1].mountPath | string | `"/realms"` |  |
| keycloak.service.sessionAffinity | string | `"ClientIP"` |  |
| keycloak.ingress.enabled | bool | `false` |  |
| keycloak.ingress.ingressClassName | string | `"nginx"` |  |
| keycloak.ingress.hostname | string | `"centralidp.example.org"` | Provide default path for the ingress record. |
| keycloak.ingress.annotations."cert-manager.io/cluster-issuer" | string | `""` | Enable TLS configuration for the host defined at `ingress.hostname` parameter; TLS certificates will be retrieved from a TLS secret with name: `{{- printf "%s-tls" .Values.ingress.hostname }}`; Provide the name of ClusterIssuer to acquire the certificate required for this Ingress |
| keycloak.ingress.annotations."nginx.ingress.kubernetes.io/cors-allow-credentials" | string | `"true"` |  |
| keycloak.ingress.annotations."nginx.ingress.kubernetes.io/cors-allow-methods" | string | `"PUT, GET, POST, OPTIONS"` |  |
| keycloak.ingress.annotations."nginx.ingress.kubernetes.io/cors-allow-origin" | string | `"https://centralidp.example.org"` |  |
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
| keycloak.postgresql.enabled | bool | `true` | PostgreSQL chart configuration (recommended for demonstration purposes only); default configurations: host: "centralidp-postgresql-primary", port: 5432; Switch to enable or disable the PostgreSQL helm chart. |
| keycloak.postgresql.image | object | `{"tag":"15-debian-11"}` | Setting to Postgres version 15 as that is the aligned version, https://eclipse-tractusx.github.io/docs/release/trg-5/trg-5-07/#aligning-dependency-versions). Keycloak helm-chart from Bitnami has moved on to version 16. |
| keycloak.postgresql.commonLabels."app.kubernetes.io/version" | string | `"15"` |  |
| keycloak.postgresql.auth.username | string | `"kccentral"` | Non-root username. |
| keycloak.postgresql.auth.database | string | `"iamcentralidp"` | Database name. |
| keycloak.postgresql.auth.existingSecret | string | `"centralidp-postgres"` | Secret containing the passwords for root usernames postgres and non-root username kccentral. |
| keycloak.postgresql.architecture | string | `"replication"` |  |
| keycloak.externalDatabase.host | string | `"centralidp-postgresql-external-db"` | External PostgreSQL configuration IMPORTANT: non-root db user needs needs to be created beforehand on external database. Database host ('-primary' is added as postfix). |
| keycloak.externalDatabase.port | int | `5432` | Database port number. |
| keycloak.externalDatabase.user | string | `"kccentral"` | Non-root username for centralidp. |
| keycloak.externalDatabase.database | string | `"iamcentralidp"` | Database name. |
| keycloak.externalDatabase.password | string | `""` | Password for the non-root username (default 'kccentral'). Secret-key 'password'. |
| keycloak.externalDatabase.existingSecret | string | `"centralidp-keycloak-external-db"` | Secret containing the password non-root username, (default 'kccentral'). |
| keycloak.externalDatabase.existingSecretPasswordKey | string | `"password"` | Name of an existing secret key containing the database credentials. |
| secrets.auth.existingSecret.adminpassword | string | `""` | Password for the admin username 'admin'. Secret-key 'admin-password'. |
| secrets.postgresql.auth.existingSecret.postgrespassword | string | `""` | Password for the root username 'postgres'. Secret-key 'postgres-password'. |
| secrets.postgresql.auth.existingSecret.password | string | `""` | Password for the non-root username 'kccentral'. Secret-key 'password'. |
| secrets.postgresql.auth.existingSecret.replicationPassword | string | `""` | Password for the non-root username 'repl_user'. Secret-key 'replication-password'. |
| seeding.enabled | bool | `false` | Seeding job to upgrade CX_Central realm: enable to upgrade the configuration of the CX-Central realm from previous version; Please also refer to the 'Post-Upgrade Configuration' section in the README.md for configuration possibly not covered by the seeding job |
| seeding.image | string | `"docker.io/tractusx/portal-iam-seeding:v3.0.0-iam"` |  |
| seeding.imagePullPolicy | string | `"IfNotPresent"` |  |
| seeding.portContainer | int | `8080` |  |
| seeding.authRealm | string | `"master"` |  |
| seeding.useAuthTrail | string | `"true"` |  |
| seeding.dataPaths.dataPath0 | string | `"realms/CX-Central-realm.json"` |  |
| seeding.instanceName | string | `"central"` |  |
| seeding.excludedUserAttributes.attribute0 | string | `"bpn"` |  |
| seeding.excludedUserAttributes.attribute1 | string | `"organisation"` |  |
| seeding.resources | object | `{"limits":{"cpu":"225m","memory":"200M"},"requests":{"cpu":"75m","memory":"200M"}}` | We recommend to review the default resource limits as this should a conscious choice. |
| seeding.extraVolumes[0].name | string | `"realms"` |  |
| seeding.extraVolumes[0].emptyDir | object | `{}` |  |
| seeding.extraVolumeMounts[0].name | string | `"realms"` |  |
| seeding.extraVolumeMounts[0].mountPath | string | `"app/realms"` |  |
| seeding.initContainers[0].name | string | `"init-cx-central"` |  |
| seeding.initContainers[0].image | string | `"docker.io/tractusx/portal-iam:v3.0.0"` |  |
| seeding.initContainers[0].imagePullPolicy | string | `"IfNotPresent"` |  |
| seeding.initContainers[0].command[0] | string | `"sh"` |  |
| seeding.initContainers[0].args[0] | string | `"-c"` |  |
| seeding.initContainers[0].args[1] | string | `"echo \"Copying CX Central realm...\"\ncp -R /import/catenax-central/realms/* /app/realms\n"` |  |
| seeding.initContainers[0].volumeMounts[0].name | string | `"realms"` |  |
| seeding.initContainers[0].volumeMounts[0].mountPath | string | `"app/realms"` |  |

Autogenerated with [helm docs](https://github.com/norwoodj/helm-docs)

## Post-Install Configuration

Once the installation is completed, the following steps need to be executed in the Keycloak admin console within the CX-Central realm:

1. Generate client-secrets for confidential clients and service accounts with access type 'confidential'.

2. Establish connection to the sharedidp instance

In order to enable the login of the initial user (see CX-Operator realm in sharedidp instance for username), the connection between the 'CX-Operator' identity provider of the centralidp instance and the according realm in the sharedidp instance needs to be established.
This is done by setting the 'example.org' placeholder in the CX-Operator' Identity Provider to the address of the sharedidp instance.

3. Setup SMTP configuration (Realm Settings --> Email)

## Upgrade

Please see notes at [Values.seeding](values.yaml#L146) for upgrading the configuration of the CX-Central realm.

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

Please also refer to [Upgrade Details](../../docs/technical%20documentation/12.%20Upgrade%20Details.md#v200).

#### Upgrade approach

For the overall process of migrating from version 16.1.1 to version 22.0.3., we recommend to follow a blue-green deployment approach. In the following, you find a rough outline of the necessary steps:

1. Scale down current the Keycloak services (blue deployment)
2. Backup the current data
3. Deploy the new Keycloak instance (green deployment e.g: `-green`, `-kc22`, ...) in another namespace than the blue instance
4. Restore the data of the blue instance to the green instance
5. Start the new Keycloak services
6. Make sure that the configuration of the CX-Central realm is upgraded by the seeding job defined as post-upgrade hook (Values.seeding.enabled)
7. Once the new/green instance is validated, switch the user traffic to it

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

## Post-Upgrade Configuration

### Upgrading from version 1.0.0 or 1.0.1 to 1.1.0

This section describes the necessary changes to the CX-Central realm when upgrading from version 1.0.0 or 1.0.1 to 1.1.0

Create the following new client:

* Client ID: Cl20-CX-IRS
* Description: Decentral IRS Component for Traceability and CE Apps
* Access Type: bearer-only

  Add the following role to the new client:

  * Role Name: view_irs
  * Description: view_irs

Changes to composite roles of the Cl2-CX-Portal client:

* CX Admin:
  * assign the update_service_offering role of the Cl2-CX-Portal client
  * assign the view_company_data and delete_company_data roles of the Cl7-CX-BPDM client

* assign the view_company_data role of the Cl7-CX-BPDM client to the following composite roles:
  * Service Manager
  * App Developer
  * Business Admin
  * IT Admin
  * Sales Manager
  * Company Admin
  * CX User
  * App Manager
  * Purchaser

* IT Admin: assign the add_connectors role of the Cl2-CX-Portal client

* Company Admin: remove the add_service_offering, activate_subscription and app management roles of the Cl2-CX-Portal client

Changes to composite roles of the technical_roles_management client:

* App Tech User:
  * assign the view_membership role of the Cl2-CX-Portal client
  * assign the view_irs of the 'Cl20-CX-IRS' client

* Service Management:
  * assign the add_connectors role of the Cl2-CX-Portal client

### Upgrading from version 1.1.0 to 1.2.0

This section describes the configuration changes to the CX-Central realm when upgrading from version 1.1.0 to 1.2.0:

As part of the 1.2.0 version, a job for the seeding of the CX-Central realm configuration changes was implemented.
By enabling the seeding (Values.seeding.enabled), the CX-Central realm is upgraded by a job defined as a post-upgrade hook.

Currently the automatic upgrade of the configuration still has some limitations and the following **post-upgrade activities** should be executed:

1. Change client_id in portal db to the ID of the client of centralidp

Within the portal database (schema portal), change the field 'client_id' of the table 'company_service_accounts' to the ID of the client from the centralidp instance (field 'id' of the 'client' table) for the following newly added service accounts:

* sa-cl2-03
* sa-cl21-01
* sa-cl22-01

If this step isn't executed the details of the service accounts can't be viewed in User Management of the Portal but the service accounts can still be managed in the Keycloak admin console.

2. Deletion of obsolete clients and service accounts for housekeeping (optional)

The following clients and service accounts are obsolete in version 1.2.0 and can be deleted:

* Cl4-CX-DigitalTwin
* sa-cl6-cx-01

### Upgrading from version 1.2.0 to 2.0.0

By enabling the seeding (Values.seeding.enabled), the CX-Central realm is upgraded by a job defined as a post-upgrade hook.

As part of an optional housekeeping, the following clients are obsolete in version 2.0.0 and can be deleted:

* Cl6-CX-DAPS (was already obsolete with v1.2.0)
* Cl20-CX-IRS
* Cl16-CX-BPDMGate-Portal

### Upgrading from version 2.0.0 to 2.1.0

By enabling the seeding (Values.seeding.enabled), the CX-Central realm is upgraded by a job defined as a post-upgrade hook.

### Upgrading from version 2.1.0 to 3.0.0

By enabling the seeding (Values.seeding.enabled), the CX-Central realm is upgraded by a job defined as a post-upgrade hook.

As the seeding job is configured to not update the bpn user attribute, make sure that the bpn user attribute of the service account "sa-cl3-cx-1" is changed to CX-Operator BPN.

As part of an optional housekeeping, the following obsolete service accounts composite roles and can be deleted:

* remove service account `sa-cl5-custodian-1`
* remove the following composite roles Inside the `technical_roles_management` client
  * "BPDM Gate Read"
  * "BPDM Gate Read & Write"
  * "BPDM Partner Gate"
  * "BPDM Management"
  * "BPDM Pool"
