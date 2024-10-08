# User Management

We differentiate between.

- real users
- technical users (aka service accounts)

Both scenarios are completely automated / FE supported. There is no necessarily to setup/configure users in Keycloak directly.

Even more, **it should get prohibited to create users via the Keycloak admin console**

**reason:** those users would be missing in the portal db since there is no synchronization back to the portal db. This would result into an internal service issue.
When using the available services for real and technical user creation; the issue wont appear since portal will create first of all the relevant user accounts in the portal db and afterwards create the same in Keycloak.  
With help of the portal db table iam_users; the user id in Keycloak central IdP (user_entity_id) and the user id inside the portal (company_user_id) are linked.
For service accounts the mapper is the service account clientId.

## Technical User

For the type of technical (non-human) users, service accounts are to be used.
Service accounts differ from normal user accounts in multiple ways:

- They don't have a password and can't be used for browser-based sign-in.
- They're created and managed as a user that belongs to a client.
- How to setup technical user authentication
- The service account should have it's own client.

Each OIDC client has a built-in service account which allows it to obtain an access token. This is covered in the OAuth 2.0 specification under Client Credentials Grant. To use this feature the Access Type of your client is set to confidential.

### Role Management

The technical user relevant roles are managed within a shadow client called "technical-user-management".

All composite roles available for technical user creation inside the portal are configured in this area.

Additionally, the role need to be available inside the portal db - user_roles.

#### User Attributes

All users can get specific user attributes added - currently the following attributes are supported / implemented

- bpn-mapper
- username-mapper

#### bpn-mapper

The Business Partner Number (BPN) is a verified company credential which is getting added as attribute to each user inside the network.

The bpn provides an extended user authentication possibility.

How is the attribute added to the user

**Option1 - With the registration approval:**

With the registration, a user is invited without the company/bpn connection. The actual confirmation of user / BPN mapping will only take place with the registration approval => if the company registration is getting approved, a backend service is calling the function to add the company BPN to the respective user

**Option 2 - Automatically added with the user invite/creation:**

The IT Administrator is adding one or multiple users to the CX network. By doing so, the user accounts get created => as part of this flow, the newly created user(s) should get a user attribute added which is the same as the Company BPN from the table "company"

**Option 3 - Manually added, by permission (via the user management permission `add_user`):**

 By opening the user admin account inside the portal, the administrator can add another BPN to the user account. Currently without any limitations. However there is the plan to limit the functionality and to restrict the BPNs which can get selected / added by the admin

#### username-mapper

Is handling the username created for each user account inside the central IdP.
{idpalias}+uuid

### View Users in a realm

> **_NOTE:_**  
> In general users should not get created via the IdP admin console - it will result into a de-sync of the portal db and Keycloak db. Also necessary security validations and connections will be missing. We strongly suggest to use the build api(s) only as well as the UI supported by the portal.

To look up all users created in Keycloak under a specific realm or inside the central realm, click on **Users** in the left menu bar.

![UsersView](/docs/static/users-view.png)

To display the users; click on "View all users" or use the search box to find a specific user via full name, last name or email address.

### Create New User

> **_NOTE:_**  
> In general users and user connections should get viewed inside the portal db.

To create an user click on **Users** in the left menu bar.
As soon as the page is reached, select the **Add User** on the top right of the user table.

Required mandatory field is Username only.
However in Catena-X we also set:

- First name
- Last name
- Email

![CreateUser](/docs/static/create-user.png)

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-iam
