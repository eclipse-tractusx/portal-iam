# Helm chart for Central Keycloak Instance

![Version: 4.2.0](https://img.shields.io/badge/Version-4.2.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 25.0.6](https://img.shields.io/badge/AppVersion-25.0.6-informational?style=flat-square)

This helm chart installs the Helm chart for Central Keycloak Instance.

For further information please refer to the [technical documentation](/docs/admin/technical-documentation).

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
    version: 4.2.0
```

## Requirements

| Repository | Name | Version |
|------------|------|---------|
| https://raw.githubusercontent.com/bitnami/charts/archive-full-index/bitnami | keycloak | 23.0.0 |

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| keycloak.auth.adminUser | string | `"admin"` |  |
| keycloak.auth.adminPassword | string | `""` | centralidp Keycloak administrator password. |
| keycloak.auth.existingSecret | string | `""` | Secret containing the password for admin username 'admin'. |
| keycloak.production | bool | `false` | Run Keycloak in production mode. TLS configuration is required except when using proxy=edge. |
| keycloak.httpRelativePath | string | `"/auth/"` | Setting the path relative to '/' for serving resources: as we're migrating from 16.1.1 version which was using the trailing 'auth', we're setting it to '/auth/'. ref: https://www.keycloak.org/migration/migrating-to-quarkus#_default_context_path_changed |
| keycloak.replicaCount | int | `1` |  |
| keycloak.extraVolumes[0].name | string | `"themes"` |  |
| keycloak.extraVolumes[0].emptyDir | object | `{}` |  |
| keycloak.extraVolumeMounts[0].name | string | `"themes"` |  |
| keycloak.extraVolumeMounts[0].mountPath | string | `"/opt/bitnami/keycloak/themes/catenax-central"` |  |
| keycloak.initContainers[0].name | string | `"import"` |  |
| keycloak.initContainers[0].image | string | `"docker.io/tractusx/portal-iam:v4.2.0"` |  |
| keycloak.initContainers[0].imagePullPolicy | string | `"IfNotPresent"` |  |
| keycloak.initContainers[0].command[0] | string | `"sh"` |  |
| keycloak.initContainers[0].args[0] | string | `"-c"` |  |
| keycloak.initContainers[0].args[1] | string | `"echo \"Copying themes...\"\ncp -R /import/themes/catenax-central/* /themes\n"` |  |
| keycloak.initContainers[0].volumeMounts[0].name | string | `"themes"` |  |
| keycloak.initContainers[0].volumeMounts[0].mountPath | string | `"/themes"` |  |
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
| keycloak.postgresql.enabled | bool | `true` | PostgreSQL chart configuration (recommended for demonstration purposes only); default configurations: host: "centralidp-postgresql", port: 5432; Switch to enable or disable the PostgreSQL helm chart. |
| keycloak.postgresql.image | object | `{"tag":"15-debian-11"}` | Setting to Postgres version 15 as that is the aligned version, https://eclipse-tractusx.github.io/docs/release/trg-5/trg-5-07/#aligning-dependency-versions). Keycloak helm-chart from Bitnami has moved on to version 16. |
| keycloak.postgresql.commonLabels."app.kubernetes.io/version" | string | `"15"` |  |
| keycloak.postgresql.auth.username | string | `"kccentral"` | Non-root username. |
| keycloak.postgresql.auth.password | string | `""` | Non-root user password. |
| keycloak.postgresql.auth.postgresPassword | string | `""` | Root user password. |
| keycloak.postgresql.auth.database | string | `"iamcentralidp"` | Database name. |
| keycloak.postgresql.auth.existingSecret | string | `""` | Secret containing the passwords for root usernames postgres and non-root username kccentral. |
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
| realmSeeding | object | `{"bpn":"BPNL00000003CRHK","clients":{"bpdm":{"clientSecret":"","redirects":["https://partners-pool.example.org/*"]},"bpdmGate":{"clientSecret":"","redirects":["https://partners-gate.example.org/*"]},"bpdmOrchestrator":{"clientSecret":""},"existingSecret":"","miw":{"clientSecret":"","redirects":["https://managed-identity-wallets.example.org/*"]},"portal":{"redirects":["https://portal.example.org/*"],"rootUrl":"https://portal.example.org/home"},"registration":{"redirects":["https://portal.example.org/*"]},"semantics":{"redirects":["https://portal.example.org/*"]}},"enabled":true,"extraServiceAccounts":{"clientSecretsAndBpn":[],"existingSecret":""},"image":{"name":"docker.io/tractusx/portal-iam-seeding:v4.2.0-iam","pullPolicy":"IfNotPresent"},"initContainer":{"image":{"name":"docker.io/tractusx/portal-iam:v4.2.0","pullPolicy":"IfNotPresent"}},"keycloakServicePort":80,"keycloakServiceTls":false,"portContainer":8080,"resources":{"limits":{"cpu":"750m","ephemeral-storage":"1024Mi","memory":"850M"},"requests":{"cpu":"250m","ephemeral-storage":"50Mi","memory":"850M"}},"serviceAccounts":{"clientSecrets":[{"clientId":"sa-cl1-reg-2","clientSecret":""},{"clientId":"sa-cl2-01","clientSecret":""},{"clientId":"sa-cl2-02","clientSecret":""},{"clientId":"sa-cl2-03","clientSecret":""},{"clientId":"sa-cl2-04","clientSecret":""},{"clientId":"sa-cl2-05","clientSecret":""},{"clientId":"sa-cl2-06","clientSecret":""},{"clientId":"sa-cl3-cx-1","clientSecret":""},{"clientId":"sa-cl5-custodian-2","clientSecret":""},{"clientId":"sa-cl7-cx-1","clientSecret":""},{"clientId":"sa-cl7-cx-5","clientSecret":""},{"clientId":"sa-cl7-cx-7","clientSecret":""},{"clientId":"sa-cl8-cx-1","clientSecret":""},{"clientId":"sa-cl21-01","clientSecret":""},{"clientId":"sa-cl22-01","clientSecret":""},{"clientId":"sa-cl24-01","clientSecret":""},{"clientId":"sa-cl25-cx-1","clientSecret":""},{"clientId":"sa-cl25-cx-2","clientSecret":""},{"clientId":"sa-cl25-cx-3","clientSecret":""}],"existingSecret":""},"sharedidp":"https://sharedidp.example.org","sslRequired":"external"}` | Seeding job to create and update the CX-Central realm: besides creating the CX-Central realm, the job can be used to update the configuration of the realm when upgrading to a new version; Please refer to /docs/admin/technical-documentation/14. Realm Seeding.md for more details. Please also refer to the 'Post-Upgrade Configuration' section in the README.md for configuration possibly not covered by the seeding job. |
| realmSeeding.clients | object | `{"bpdm":{"clientSecret":"","redirects":["https://partners-pool.example.org/*"]},"bpdmGate":{"clientSecret":"","redirects":["https://partners-gate.example.org/*"]},"bpdmOrchestrator":{"clientSecret":""},"existingSecret":"","miw":{"clientSecret":"","redirects":["https://managed-identity-wallets.example.org/*"]},"portal":{"redirects":["https://portal.example.org/*"],"rootUrl":"https://portal.example.org/home"},"registration":{"redirects":["https://portal.example.org/*"]},"semantics":{"redirects":["https://portal.example.org/*"]}}` | Set redirect addresses and - in the case of confidential clients - clients secrets for clients which are part of the basic CX-Central realm setup; SET client secrets for all non-testing and non-local purposes, default value is autogenerated. |
| realmSeeding.clients.existingSecret | string | `""` | Option to provide an existingSecret for the clients with clientId as key and clientSecret as value. |
| realmSeeding.serviceAccounts | object | `{"clientSecrets":[{"clientId":"sa-cl1-reg-2","clientSecret":""},{"clientId":"sa-cl2-01","clientSecret":""},{"clientId":"sa-cl2-02","clientSecret":""},{"clientId":"sa-cl2-03","clientSecret":""},{"clientId":"sa-cl2-04","clientSecret":""},{"clientId":"sa-cl2-05","clientSecret":""},{"clientId":"sa-cl2-06","clientSecret":""},{"clientId":"sa-cl3-cx-1","clientSecret":""},{"clientId":"sa-cl5-custodian-2","clientSecret":""},{"clientId":"sa-cl7-cx-1","clientSecret":""},{"clientId":"sa-cl7-cx-5","clientSecret":""},{"clientId":"sa-cl7-cx-7","clientSecret":""},{"clientId":"sa-cl8-cx-1","clientSecret":""},{"clientId":"sa-cl21-01","clientSecret":""},{"clientId":"sa-cl22-01","clientSecret":""},{"clientId":"sa-cl24-01","clientSecret":""},{"clientId":"sa-cl25-cx-1","clientSecret":""},{"clientId":"sa-cl25-cx-2","clientSecret":""},{"clientId":"sa-cl25-cx-3","clientSecret":""}],"existingSecret":""}` | Client secrets for service accounts which are part of the basic CX-Central realm setup; SET client secrets for all non-testing and non-local purposes, default value is autogenerated. |
| realmSeeding.serviceAccounts.existingSecret | string | `""` | Option to provide an existingSecret for the base service accounts with clientId as key and clientSecret as value. |
| realmSeeding.bpn | string | `"BPNL00000003CRHK"` | Set value for the 'bpn' user attribute for the initial user and the base service account users. |
| realmSeeding.sharedidp | string | `"https://sharedidp.example.org"` | Set sharedidp address to enable the identity provider connection to CX-Operator realm. |
| realmSeeding.extraServiceAccounts | object | `{"clientSecretsAndBpn":[],"existingSecret":""}` | Set client secrets and bpn user attribute for additional service accounts; meant to enable possible test data, default value for client secrets is autogenerated. |
| realmSeeding.extraServiceAccounts.existingSecret | string | `""` | Option to provide an existingSecret for additional service accounts with clientId as key and clientSecret as value. |
| realmSeeding.resources | object | `{"limits":{"cpu":"750m","ephemeral-storage":"1024Mi","memory":"850M"},"requests":{"cpu":"250m","ephemeral-storage":"50Mi","memory":"850M"}}` | We recommend to review the default resource limits as this should a conscious choice. |

Autogenerated with [helm docs](https://github.com/norwoodj/helm-docs)

## Upgrade

Please see notes at [Values.seeding](values.yaml#L132) for upgrading the configuration of the CX-Central realm.

### To 4.0.1

No issues are expected during the upgrade.

### To 4.0.0

This major changes from the Keycloak version from  23.0.7 to 25.0.6.

Please be aware that proxy parameter was deprecated and therefore removed. When enabling the production mode, it is to be expected to encounter the following error at install if none of the conditions listed [here](https://github.com/bitnami/charts/blob/eb2b3bdd8612a754c1b7e28237e9a32f6661eaab/bitnami/keycloak/templates/_helpers.tpl#L343) are met:

`
Error: INSTALLATION FAILED: execution error at (centralidp/charts/keycloak/templates/NOTES.txt:100:4):
VALUES VALIDATION:
keycloak: production
    In order to enable Production mode, you also need to enable HTTPS/TLS
    using the value 'tls.enabled' and providing an existing secret containing the Keystore and Trustore.
`

No major issues are expected during the upgrade. Nonetheless, a blue-green deployment approach - [as outlined for previous major version upgrades](#upgrade-approach) -  is recommended.

### To 3.0.1

The name of the default role was corrected with [#157](https://github.com/eclipse-tractusx/portal-iam/pull/157).
If you want to use the seeding job (Values.seeding.enabled) to upgrade the CX-Central realm configuration, make sure to rename the default role on the running instance beforehand.

By executing the following sql query:

```sql
UPDATE public.keycloak_role
	SET name = 'default-roles-cx-central'
	WHERE name = 'default-roles-catena-x realm';
```

And restarting the Keycloak services afterwards once.

Otherwise you will encounter an error 400 at the seeding job, see [portal-backend/pull/800#issuecomment-2188207713](https://github.com/eclipse-tractusx/portal-backend/pull/800#issuecomment-2188207713) for more information.

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

Please also refer to [Upgrade Details](/docs/admin/technical-documentation/12.%20Upgrade%20Details.md#v200).

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
