# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X IAM * Keycloak instances.

## 2.1.0

### Change

* realm configuration (centralidp) - updates to CX-Central realm:
  * changed the username of initial CX Operator user to align with CX portal company_users ID
  * created the composite role "BPDM Gate Read" in client technical_roles_management and associated client role "view_company_data" from Cl16-CX-BPDMGate
  * created the composite role "BPDM Gate Read" in client technical_roles_management and associated client roles "view_company_data", "update_company_data" and "view_shared_data" from Cl16-CX-BPDMGate
  * assigned the roles "view_wallet" and "view_certificates" from the Cl5-CX-Custodian client to all the composite role of the client Cl2-CX-Portal
  * created the roles "upload_certificates" and "delete_certificates" inside the Cl2-CX-Portal client and assigned them to the composite roles "Business Admin", "IT Admin" and "Company Admin" and "Purchaser"
  * removed tenant-mapper from the "catena" client scope
  * added Policy Hub client
  * changed client protocol mapper "Client ID": changed user.session.note and claim.name value from clientId to client_id
  * assigned the roles "view_tech_user_management" and "app_management" from the Cl2-CX-Portal client to the composite role "Offer Management" of the client technical_roles_management
  * assigned the role "configure_partner_registration" from the Cl2-CX-Portal client to the composite role "Registration External" of the client technical_roles_management
  * assigned the role "view_managed_idp" from the Cl2-CX-Portal client to the composite role "CX Admin" of the client Cl2-CX-Portal

### Bugfix

* fixed upgrade documentation for previous version 2.0.0, pointing to upgrade details for centralidp
* realm configuration (centralidp) - fixes to CX-Central realm:
  * assigned the following roles from the Cl2-CX-Portal from the composite role "IT Admin":
    * delete_user_account
    * delete_own_user_account
    * view_service_marketplace
    * view_service_offering
    * subscribe_service
    * view_service_subscriptions
    * view_membership
    * delete_notifications
  * assigned the following roles from the Cl2-CX-Portal from the composite role "Business Admin":
    * delete_own_user_account
    * view_user_management
    * view_connectors
    * view_apps
    * view_subscription
    * view_app_subscription
    * view_autosetup_status
    * view_service_marketplace
    * view_service_offering
    * view_service_subscriptions
    * view_company_data
    * view_use_case_participation
    * view_certificates
  * removed username mapper from CX-Operator identity provider

### Technical Support

* build of init containers
  * enabled build of images for arm64, in addition to amd64
  * added additional image tags of type semver
* updated base image versions for init container in README
* updated generic-security documentation
* adjusted source url in license files for static content

### Known Knowns

The following issues were recently discovered:

* Refresh token rotation causes page reload in frontend apps when using multiple tabs, see [User Token Lifespan](docs/consultation/workshop-20231005.md#user-token-lifespan)
* Custom login themes break when inserting HTML/CSS/JavaScript code in the IdP display name

Please be aware that **this version is still in Release Candidate phase**: especially documentation is still WIP.

## 2.0.0

### Change

* changed to v22.0.3 ([Bitnami chart version: 16.1.6](https://artifacthub.io/packages/helm/bitnami/keycloak/16.1.6))
  * bumped chart version to to major 2.0.0 (alpha)
  * changed appVersion from 1.2.0 to 22.0.3 to align with Keycloak version as that's more intuitive
  * added production mode with default false
  * added reverse proxy mode with default passthrough
  * removed service type: default value is ClusterIP in new Bitnami chart version
  * removed proxyAddressForwarding
  * removed serviceDiscovery
  * set httpRelativePath to '/auth/', as we're migrating from 16.1.1 version which was using the trailing 'auth'
  * updated retrieval of service name for seeding job
  * enabled seeding for trailing 'auth'
  * removed management-password from secrets as key isn't part of default secret anymore
  * changed file structure of the initially imported realms to the one of the new version
* realm configuration (centralidp) - updates to CX-Central realm:
  * reviewed client scopes of all service accounts and limited it to the assigned roles, if the client scope and the service account roles were not aligned yet
  * created role "view_managed_idp" inside the Cl2-CX-Portal client and assigned it to the composite roles "IT Admin" and "Company Admin"
  * assigned role "view_semantic_models" from the Cl3-CX-Semantic client to the composite role "Semantic Model Management" from the technical_roles_management client
  * assigned role "view_membership" from the Cl2-CX-Portal client to the composite role "CX Membership Info" from the technical_roles_management client
  * assigned roles "view_bpn_discovery", "add_bpn_discovery" and "delete_bpn_discovery" from of the Cl22-CX-BPND client, the role "view_discovery_endpoint" from of the Cl21-CX-DF client to the composite role "Dataspace Discovery" from the technical_roles_management client
  * created roles "configure_partner_registration" and "create_partner_registration" inside the Cl2-CX-Portal client
  * assigned role "create_partner_registration" to the composite role "Registration External" from the technical_roles_management client
  * assigned role "configure_partner_registration" to the composite roles "Company Admin" and "IT Admin"
  * assigned composite roles Semantic Model Management", "Dataspace Discovery" and "Identity Wallet Management" from the technical_roles_management client to service account sa-cl3-cx-1
  * created composite role "Offer Management" in client technical_roles_management and associated client roles "add_service_offering", "add_connectors" and "activate_subscription" from Cl2-CX-Portal
  * created the client "Cl16-CX-BPDMGate" with the client roles "view_company_data", "update_company_data" and "view_shared_data" and assigned those to service account sa-cl7-cx-5
  * deleted the composite roles "App Tech User", "Connector User" and "Service Management" from client technical_roles_management
  * deleted clients "Cl6-CX-DAPS", "Cl20-CX-IRS" and "Cl16-CX-BPDMGate-Portal"
  * deleted all redirects from Cl2-CX-Portal client other than portal itself
* updated seeding job to upgrade the configuration of the CX-Central realm (centralidp)
  * adjusted seeding to exclude the following properties if already existing
    * firstname, lastname, email and configurable attributes for users
    * idp config urls
    * client urls
    * smtp server settings
  * added configuration to exclude bpn and organisation from user attributes while seeding
  * extended seeding to seed ClientScopeMappers
* moved IAM specific documentation from [portal-assets](https://github.com/eclipse-tractusx/portal-assets) to [portal-iam](https://github.com/eclipse-tractusx/portal-iam)

### Bugfix

* fixed escaping of secret values: quotes added
* realm configuration (centralidp) - fixes to CX-Central realm:
  * created role "unsubscribe_apps" inside the Cl2-CX-Portal client and assigned it to the composite roles "Sales Manager", "Purchaser", "CX Admin", "Company Admin" and "Business Admin"
  * created role "unsubscribe_services" inside the Cl2-CX-Portal client and assigned it to the composite roles "Sales Manager", "Purchaser", "CX Admin", "Company Admin" and "Business Admin"
  * unassigned role "manage-users" and "view-clients" (realm-management client) from the role default-roles-catena-x realm and assigned to the service account sa-cl1-reg-2 the role "manage-users" from the realm-management client
  * unassigned role "view_submitted_application" from the Cl2-CX-Portal from the composite role "Service Manager"
  * unassigned roles "add_semantic_model", "update_semantic_model" and "delete_semantic_model" from the Cl2-CX-Portal from the composite role "IT Admin"
  * assigned roles "view_semantic_model", "add_semantic_model", "update_semantic_model" and "delete_semantic_model" from the Cl2-CX-Portal from the composite roles "Business Admin", "App Manager" and "Service Manager"
  * assigned roles "add_semantic_model", "update_semantic_model" and "delete_semantic_model" from the Cl2-CX-Portal from the composite role "Company Admin"
  * assigned role "add_self_descriptions" from the Cl2-CX-Portal client to the client scope mapping of the service account sa-cl8-cx-1
  * assigned role "update_wallets" from the Cl5-CX-Custodian client to the roles of the service account sa-cl5-custodian-2
  * assigned role "view_company_data" from the Cl7-CX-BPDM client to the roles of the service account sa-cl7-cx-5 and to the composite role "Company Admin" from the Cl1-CX-Registration client

### Technical Support

* updated k8s version and version to upgrade from for helm test workflows
* updated SECURITY.md
* Trivy scan: changed to no failure on high findings, as it should only fail if there is an error/misconfiguration
* Trivy and KICS scan: excluded docs directory from scan
* added pull request linting

### Known Knowns

The following issues were recently discovered:

* Refresh token rotation causes page reload in frontend apps when using multiple tabs, see [User Token Lifespan](docs/consultation/workshop-20231005.md#user-token-lifespan)
* Custom login themes break when inserting HTML/CSS/JavaScript code in the IdP display name

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

* moved centralidp login theme into iam repository, removed link to Cl2-CX-Portal-assets.
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
