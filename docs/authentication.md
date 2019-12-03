# Authentication

Powered by [Auth0](https://auth0.com/) and a custom local plugin called [`gatsby-plugin-auth0-universal`](../plugins/gatsby-plugin-auth0-universal/README.md).

Authentication Flow:

- User logs in
  - The user clicks login.
  - The web app jumps off to the external login page provided by Auth0.
  - The user authenticates on the external login page.
  - The external login page redirects back to the web app's special callback page with an access token and an id token.
  - The callback page takes care of finishing the login.
    - Tokens are parsed and stored in runtime state. Tokens are not persisted at all.
    - The userinfo endpoint is called to get the full user metadata.
    - If anything went wrong, the callback page displays an error message.
    - If there were no error, the user is redirected to the previous web app location.
- User revisits
  - The web app tries a silent authentication to obtain tokens.
    - If no Auth0 custom domain is configured, this will fail if the browser has blocked third party cookies
  - Tokens are parsed and stored in runtime state. Tokens are not persisted at all.
  - The userinfo endpoint is called to get the full user metadata.
- User signs up
  - Signup can happen on the external login page by
    - Signing up with email and password
    - Logging in via social login

Metadata:

- user_metadata

  - Can be changed by the user
  - Should contain user-specific settings, personal details, etc
  - Expect this to be empty after signup. Users with missing metadata might be redirected to some input form.

- app_metadata

  - Cannot be changed by the user
  - Should contain things like current plan
  - Other services might use the REST API to change this

## Account setup:

- Create a tenant for each environment (stage, prod)

  - EU location
  - Create a Single Page Application
    - Allowed Callback URLs
      - For non-production tenant: `http://localhost:8000/callback`
      - Same as `${OAUTH2_REDIRECT_URI}`
    - Allowed Web Origins
      - For non-production tenant: `http://localhost:8000`
      - Same as `${PUBLIC_URL}`
    - Allowed Logout URLs - For non-production tenant: `http://localhost:8000/` - Same as `${OAUTH2_LOGOUT_URL}`

<!-- TODO register Auth0 account 0.5h -->
<!-- TODO create Auth0 tenant for staging environment 0.5h -->
<!-- TODO create Auth0 tenant for production environment 0.5h -->
<!-- TODO enable social login providers -->
<!-- TODO customize universal login page company logo url and colors 1h -->

## Emails

Custom Email Provider:

- Requires an SMTP user account
  - From: Default from address for emails
  - Host: Hostname or IP address of your SMTP server.
  - Port: Port used by your SMTP server. Common ports include 25, 465, and 587. Please avoid using port 25 if you can, since many providers have limitations on this port.
  - Username: SMTP username
  - Password: SMTP password

<!-- TODO configure custom email provider and test it 1h -->

[Email verification](https://auth0.com/rules/email-verified) can be enforced by adding a new rule:

```js
function (user, context, callback) {
  if (!user.email_verified) {
    return callback(new UnauthorizedError('Please verify your email before logging in.'));
  } else {
    return callback(null, user, context);
  }
}
```

<!-- TODO set up email verification rule 0.5h -->
