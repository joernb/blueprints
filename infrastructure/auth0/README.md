[❮ Overview](../../README.md)

<div align="center">
  <h1>
    Auth0
  </h1>
</div>

Provides authentication and user management.

# 🧬 Structure

## Cloud Resources

- Account
  - [Tenants](https://auth0.com/docs/get-started/auth0-overview/create-tenants) `my-org-staging` / `my-org-production`: Isolated environments that are managed through the dashboard or the Management API.
    - [Users](https://auth0.com/docs/authenticate/database-connections/auth0-user-store): Auth0 stores and manages user accounts.
      - [user_metadata](https://auth0.com/docs/manage-users/user-accounts/metadata): Stores metadata that users can edit themselves (e.g. preferences).
      - [app_metadata](https://auth0.com/docs/manage-users/user-accounts/metadata): Stores metadata that users cannot edit themselves (e.g. permissions).
    - [Applications](https://auth0.com/docs/get-started/applications): Applications represent clients that want to access an API.
      - `next-app` (Single Page Application): Allows user logins from app
        - Client ID: `NEXT_PUBLIC_AUTH0_CLIENT_ID`
        - Allowed Callback URLs / Web Origins / Logout URLs: Public url of the web app, for staging also `http://localhost:3000`
      - `next-app` (Machine to Machine): Allows server-side code to use the management API
        - Client ID: `AUTH0_MANAGEMENT_CLIENT_ID`
        - Client Secret: `AUTH0_MANAGEMENT_CLIENT_SECRET`
        - APIs
          - `Auth0 Management API` with permissions used by [express-api](./libs/express-api/util/auth0-management-client.ts)
    - [APIs](https://auth0.com/docs/get-started/apis): APIs represent protected server interfaces. They are identified by an id called "audience". APIs define permissions (a.k.a. scopes) to allow a fine-grained configuration of access control.
      - `api`:
        - Audience: `NEXT_PUBLIC_JWT_AUDIENCE` / `JWT_AUDIENCE`
        - Permissions: All permissions implemented in and checked by [express-api](./libs/express-api).
        - [Role-Based Access Control](https://auth0.com/docs/manage-users/access-control/rbac): Enabled
    - [Roles](https://auth0.com/docs/manage-users/access-control/rbac): Roles define sets of permissions for APIs and can be assigned to users.

## Interactions

- [Dashboard](https://manage.auth0.com): Administrative UI.
- [Universal Login](https://auth0.com/docs/authenticate/login/auth0-universal-login): A login page hosted by Auth0. Apps typically redirect the user to the login page while passing a number of parameters via URL. After a successful authentication, the login page redirects back to the app and passes tokens via URL.
- [Management API](https://auth0.com/docs/api/management/v2): REST API that allows backend applications to manage an Auth0 tenant. To access the management API it needs to be added as an API in the tenant. An accessing backend application need to be registered as a machine to machine application. The accessing client is configured via `AUTH0_MANAGEMENT_CLIENT_ID` and `AUTH0_MANAGEMENT_CLIENT_SECRET`. The Management API endpoint is tenant-specific and configured via `AUTH0_MANAGEMENT_DOMAIN`.
- [JWKS Endpoint](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets): Auth0 provides a tenant-specific JSON Web Key Set (JWKS) endpoint. It can be used to verify any JSON Web Token (JWT). Server-side code needs to fetch these keys (using `JWKS_URI`) to implement [token verification](https://github.com/auth0/node-jwks-rsa) in the backend.

# 🛰️ Operations

## Monitoring

- [Monitoring -> Logs](https://auth0.com/docs/deploy-monitor/logs): Storage of log data of both actions taken in the dashboard by the administrators, as well as authentications made by users.
- [Activity](https://auth0.com/docs/get-started/auth0-overview/dashboard/activity):
  - Total Users
  - Active Users
  - User Retention
  - Signups
  - Failed Logins
