# Helm chart for Catena-X Central Keycloak Instance

![Version: 2.0.0-alpha](https://img.shields.io/badge/Version-2.0.0--alpha-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 22.0.3](https://img.shields.io/badge/AppVersion-22.0.3-informational?style=flat-square)

This helm chart installs the Helm chart for Catena-X Central Keycloak Instance.

For further information please refer to the [technical documentation](https://github.com/eclipse-tractusx/portal-assets/tree/v1.6.0/developer/Technical%20Documentation).

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
    version: 2.0.0-alpha
```

## Requirements

| Repository | Name | Version |
|------------|------|---------|
| https://raw.githubusercontent.com/bitnami/charts/archive-full-index/bitnami | keycloak | 16.1.6 |

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
| keycloak.initContainers[0].image | string | `"tractusx/portal-iam:v2.0.0-alpha"` |  |
| keycloak.initContainers[0].imagePullPolicy | string | `"Always"` |  |
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
| keycloak.postgresql.enabled | bool | `true` | PostgreSQL chart configuration; default configurations: host: "centralidp-postgresql-primary", port: 5432; Switch to enable or disable the PostgreSQL helm chart. |
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
| seeding.name | string | `"cx-central-realm-upgrade"` |  |
| seeding.image | string | `"tractusx/portal-iam-seeding:v1.2.0-iam"` |  |
| seeding.portContainer | int | `8080` |  |
| seeding.authRealm | string | `"master"` |  |
| seeding.dataPaths.dataPath0 | string | `"realms/CX-Central-realm.json"` |  |
| seeding.instanceName | string | `"central"` |  |
| seeding.resources | object | `{}` | We recommend not to specify default resources and to leave this as a conscious choice for the user. If you do want to specify resources, uncomment the following lines, adjust them as necessary, and remove the curly braces after 'resources:'. |
| seeding.extraVolumes[0].name | string | `"realms"` |  |
| seeding.extraVolumes[0].emptyDir | object | `{}` |  |
| seeding.extraVolumeMounts[0].name | string | `"realms"` |  |
| seeding.extraVolumeMounts[0].mountPath | string | `"app/realms"` |  |
| seeding.initContainers[0].name | string | `"init-cx-central"` |  |
| seeding.initContainers[0].image | string | `"tractusx/portal-iam:v2.0.0-alpha"` |  |
| seeding.initContainers[0].imagePullPolicy | string | `"Always"` |  |
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

Please see notes at [Values.seeding](values.yaml#L148).

### To 2.0.0

WIP as currently still in alpha phase.

This major changes from Keycloak version 16.1.1 to version 22.0.3.

Please have a look into changelog for a more detailed description.

We also recommend checking out the [Keycloak Upgrading Guide](https://www.keycloak.org/docs/latest/upgrading/index.html)

To be explicitly mentioned: this major adds the production mode with default value false and the reverse proxy mode with default value passthrough.
Please check the description of those parameters and decide if they're suitable for you.

Please be aware that this major changes the version of the PostgreSQL dependency by Bitnami from 14.2.0 to 15.4.0 (subchart updated from version 11.1.22 to 12.12.9).
The database upgrade for the subchart by Bitnami isn't supported.

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

WIP as currently still in alpha phase.
