# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X IAM * Keycloak instances.

## Unreleased

### Change

* created the following composite roles inside the `technical_roles_management` client:
  * `Registration Internal` [#189](https://github.com/eclipse-tractusx/portal-iam/pull/189)
     * With `Cl2-CX-Portal` roles:
       * invite_new_partner
       * view_submitted_applications 

## 3.0.1

### Change

* realm configuration (centralidp) - changes to CX-Central realm:
  * added service account for BPDM communication #[#146](https://github.com/eclipse-tractusx/portal-iam/pull/146)
* added documentation for seeded clients and service accounts [#158](https://github.com/eclipse-tractusx/portal-iam/pull/158)
* changed in roles and rights concept to markdown tables [#160](https://github.com/eclipse-tractusx/portal-iam/pull/160)
* changed licensing and legal docs [#144](https://github.com/eclipse-tractusx/portal-iam/pull/144)

 ### Bugfix

* realm configuration (centralidp) - fixes to CX-Central realm:
  * renamed default role [#157](https://github.com/eclipse-tractusx/portal-iam/pull/157), please see [upgrade note](/charts/centralidp/README.md#to-301) before using seeding job for upgrading the CX-Central configuration
  * assigned the role `request_ssicredential` from the `Cl24-CX-SSI-CredentialIssuer` client to the composites roles `CX Admin`, `Company Admin`, `IT Admin` and `Business Admin` from the `Cl2-CX-Portal` client [#136](https://github.com/eclipse-tractusx/portal-iam/pull/136)
  * assigned the role `decision_ssicredential` from the `Cl24-CX-SSI-CredentialIssuer` client to the composite role `CX Admin` from the `Cl2-CX-Portal` client [#143](https://github.com/eclipse-tractusx/portal-iam/pull/143)
  * assigned the role `technical_roles_management` from the `Cl2-CX-Portal` client to the service account `sa-cl2-05` [#151](https://github.com/eclipse-tractusx/portal-iam/pull/151)

### Technical Support

* grouped version update pull request for dependabot [#133](https://github.com/eclipse-tractusx/portal-iam/pull/133)
* upgraded GitHub actions and alpine version in dockerfiles [#153](https://github.com/eclipse-tractusx/portal-iam/pull/153), [#126](https://github.com/eclipse-tractusx/portal-iam/pull/126)

### Known Knowns

The following issues were discovered:

* 403 error when accessing the Partner Network in the Portal Frontend [#132](https://github.com/eclipse-tractusx/portal-iam/pull/132)
* Refresh token rotation causes page reload in frontend apps when using multiple tabs, see [User Token Lifespan](docs/workshops/workshop-20231005.md#user-token-lifespan)
* Custom login themes break when inserting HTML/CSS/JavaScript code in the IdP display name

## 3.0.0

### Change

* [upgraded to Keycloak v23.0.7](https://github.com/eclipse-tractusx/portal-iam/issues/62)
* set postgres version of chart dependency to 15 (changed to major tag for image to get latest minor updates)
* set resource limits and increased requests for seeding job (centralidp)
* changed imagePullPolicy for initContainers to IfNotPresent
* realm configuration (centralidp) * updated CX-Central realm ([#66](https://github.com/eclipse-tractusx/portal-iam/issues/66)),([#102](https://github.com/eclipse-tractusx/portal-iam/issues/102)):

#### SSI

* added new client for SSI Issuer Component: `Cl24-CX-SSI-CredentialIssuer`
* added the following roles to the new client
  * request_ssicredential
  * decision_ssicredential
  * view_use_case_participation
  * view_certificates (BTW: `view_certificates` refers to credential not certificates, it's poorly named role)
  * revoke_credentials_issuer
  * revoke_credential
* added thr service account `sa-cl2-04` which has role to access `Cl24-CX-SSI-CredentialIssuer` with all its roles
* added `Cl2-CX-Portal` roles
  * send_mail
  * update_application_bpn_credential
  * update_application_membership_credential
* store_didDocument
* service account `sa-cl24-01` added which has role to access `Cl2-CX-Portal` with the roles
  * send_mail
  * create_notifications
  * update_application_bpn_credential
  * update_application_membership_credential
* service account `sa-cl2-05` added which has role to access the portal with the role `store_didDocument`
* role changes to composite portal roles
  * CX Admin
    * added `view_use_case_participation`
    * added `revoke_credentials_issuer`
    * added `revoke_credential`
    * added `view_certificates`
    * added `view_credential_requests`
    * added `decision_ssicredential`
  * Company Admin
    * added `view_use_case_participation`
    * added `revoke_credential`
    * added `view_certificates`
    * added `view_credential_requests`
  * IT Admin
    * added `view_use_case_participation`
    * added `revoke_credential`
    * added `view_certificates`
    * added `view_credential_requests`
  * Business Admin
    * added `view_use_case_participation`
    * added `revoke_credential`
    * added `view_certificates`
    * added `view_credential_requests`
  * `view_credential_requests` was assigned to:
    * CX User
    * Purchaser
    * App Developer
    * App Manager
    * Sales Manager
    * Service Manager
    * Business Partner Data Manager
* removed `decision_ssicredential` role from `Cl2-CX-Portal`

#### BPDM

* cleaned up `Cl7-CX-BPDM` client:
  * description: BPDM Pool
  * roles:
    * read_partner
    * write_partner
    * read_partner_member
    * read_changelog
    * read_changelog_member
    * read_metadata
    * write_metadata
* cleaned up `Cl16-CX-BPDMGate` client:
  * description: Portal Gate
  * roles:
    * read_input_partner
    * write_input_partner
    * read_input_changelog
    * read_output_partner
    * write_output_partner
    * read_output_changelog
    * read_sharing_state
    * write_sharing_state
    * read_stats
* removed the following composite roles Inside the `technical_roles_management` client
  * `BPDM Gate Read`
  * `BPDM Gate Read & Write`
  * `BPDM Partner Gate`
  * `BPDM Management`
  * `BPDM Pool`
* created the following composite roles inside the `technical_roles_management` client:
  * BPDM Sharing Admin
     With roles:
     * read_input_partner
     * write_input_partner 
     * read_input_changelog
     * read_output_partner
     * write_output_partner 
     * read_output_changelog
     * read_sharing_state
     * write_sharing_state
     * read_stats
  * BPDM Sharing Input Manager
     * read_input_partner
     * write_input_partner 
     * read_input_changelog
     * read_sharing_state
     * write_sharing_state
     * read_stats
  * BPDM Sharing Input Consumer
     * read_input_partner
     * read_input_changelog
     * read_sharing_state
     * read_stats
  * BPDM Sharing Output Consumer
     * read_output_partner
     * read_output_changelog
     * read_sharing_state
     * read_stats
  * BPDM Pool Consumer
     * read_changelog
     * read_changelog_member
     * read_metadata 
  * BPDM Pool Admin
     * read_partner
     * write_partner
     * read_partner_member
     * read_changelog
     * read_changelog_member
     * read_metadata
     * write_metadata
* role `Company Admin` inside the client `Cl1-CX-Registration` got following roles added:
  * `read_partner_member` of client Cl7-CX-BPDM
  * `read_changelog_member` of client Cl7-CX-BPDM
  * `read_metadata` of client Cl7-CX-BPDM
  * `read_partner` of client Cl7-CX-BPDM
* role `Company Admin` inside the client `Cl2-CX-Portal` got the following roles added:
  * `read_partner_member` of client Cl7-CX-BPDM
  * `read_changelog_member` of client Cl7-CX-BPDM
  * `read_metadata` of client Cl7-CX-BPDM
* role `CX Admin` inside the client `Cl2-CX-Portal` got the following roles added:
  * all roles of Cl7-CX-BPDM
  * all roles of Cl16-CX-BPDMGate
* added the composite role `Business Partner Data Manager` inside the client `Cl2-CX-Portal`, with following roles
  * `read_partner_member` of client Cl7-CX-BPDM
  * `read_changelog_member` of client Cl7-CX-BPDM
  * `read_metadata` of client Cl7-CX-BPDM
  * and all `CX User` roles
* added the composite role `BPDM Pool Sharing Consumer` inside the client `technical_roles_management` and assign following roles
  * `read_partner_member` of client Cl7-CX-BPDM
  * `read_changelog_member` of client Cl7-CX-BPDM
  * `read_metadata` of client Cl7-CX-BPDM
  * `read_changelog` of client Cl7-CX-BPDM
* assigned the composite role `BPDM Pool Consumer`of the client `technical_user_management` to all Composite roles in the Portal Client.
  * CX Admin
  * Company Admin
  * Business Admin
  * IT Admin
  * CX User
  * Purchaser
  * App Developer
  * App Manager
  * Sales Manager
  * Service Manager
  * Business Partner Data Manager
* assigned to the `sa-cl7-cx-5` the composite roles `BPDM Pool Admin` and `BPDM Sharing Admin`

#### Clean up

* removed `sa-cl5-custodian-1` (obsolete)
* BPN mapper and user attribute `bpn` were added to the following service accounts:
  * sa-cl1-reg-2
  * sa-cl2-01
  * sa-cl2-02
  * sa-cl2-03
  * sa-cl2-04
  * sa-cl2-05
  * sa-cl24-01
  * sa-cl7-cx-5
  * sa-cl8-cx-1
* fixed `sa-cl3-cx-1`
  * remove composite roles `Identity Wallet Management` and `Dataspace Discovery`
  * change to bpn value in user attribute to CX-Operator BPN
* removed `upload_documents` role from `Cl2-CX-Portal`
* removed `my_user_account` role from `Cl2-CX-Portal`
* removed `view_tech_roles` role from `Cl2-CX-Portal`
* removed `setup_client` role from `Cl2-CX-Portal`
* removed `view_dataspaces` role from `Cl2-CX-Portal`
* removed `filter_apps` role from `Cl2-CX-Portal`
* removed `view_services` role from `Cl2-CX-Portal`
* removed `subscribe_service_offering` role from `Cl2-CX-Portal`
* created `service_management` for client `Cl2-CX-Portal`
* role changes to composite portal roles:
  * App Manager
    * removed `add_user_account`
    * added `view_connectors`
    * added `view_app_subscription`
    * added `view_service_subscriptions`
  * Business Admin
    * added `view_client_roles`
    * added `view_own_user_account**?**
    * added `update_own_user_account`
    * removed `view_connectors`
    * added `view_documents`
    * added `view_membership`
    * added `delete_notifications`
    * added `request_ssicredential` (Client: `Cl2-CX-Portal`)
  * IT Admin
    * added `view_documents`
    * added `request_ssicredential` (Client: `Cl2-CX-Portal`)
  * Service Manager
    * added `add_self_descriptions`
    * added `delete_documents`
    * added `service_management`
  * App Developer
    * added `view_license_types`
    * added `view_service_subscriptions`
  * Sales Manager
    * added `view_app_subscription`
    * added `app_management`
    * added view_service_subscriptions
    * added `service_management`
  * CX Admin
    * added `service_management`
    * added `request_ssicredential` (Client: `Cl2-CX-Portal`)
  * Purchaser
    * added `subscribe_service`
    * added `view_service_subscriptions`
  * CX User
    * added `view_service_subscriptions`
  * Company Admin
    * added `request_ssicredential` (Client: `Cl2-CX-Portal`)

### Bugfix

sharedidp:
  * fixed broken `Update your password` theme and removed password username check ([#109](https://github.com/eclipse-tractusx/portal-iam/issues/109)),([#100](https://github.com/eclipse-tractusx/portal-iam/issues/100))
  * removed empty buttons from password update theme for portal [(#110)](https://github.com/eclipse-tractusx/portal-iam/pull/110)
  * fix json syntax error in import realm [(#96)](https://github.com/eclipse-tractusx/portal-iam/pull/96)

### Technical Support

* [added dependabot.yml file](https://github.com/eclipse-tractusx/portal/issues/219)
* [upgraded gh-actions and changed to pinned commit sha](https://github.com/eclipse-tractusx/portal/issues/225)
* helm test: updated version to upgrade from and k8s version
* helm-test: build images for init containers within workflow [(#89)](https://github.com/eclipse-tractusx/portal-iam/pull/89)
* combined helm chart release and image build for init containers [(#89)](https://github.com/eclipse-tractusx/portal-iam/pull/89)
* changed image build workflows for init containers: refactor those workflows to be only relevant for development phase, no latest tag anymore

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
* added (docker.io) container registry to images
* seeding job for upgrade (centralidp):
  * set resource requests
  * changed to imagePullPolicy "IfNotPresent"
  * enabled unique resource name

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
* seeding job for upgrade (centralidp): fixed Keyclaok service name not being found in the case of nameOverride or fullnameOverride

### Technical Support

* build of init containers
  * TRG-7.05: added legal documentation
  * enabled build of images for arm64, in addition to amd64
  * added additional image tags of type semver
* updated base image versions for init container in README
* updated generic-security documentation
* adjusted source url in license files for static content
* introduceed CodeQL scan
* changed portal-cd references to portal due to repository renaming
* updated documentation

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

* Refresh token rotation causes page reload in frontend apps when using multiple tabs, see [User Token Lifespan](docs/workshops/workshop-20231005.md#user-token-lifespan)
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
