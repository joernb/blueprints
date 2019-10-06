#

<!-- TODO Set project name as heading -->

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

## Getting started

Install dependencies:

```sh
yarn
```

Set up environment variables in `.env`:

```sh
cp .env.example .env
```

Start a development server:

```sh
yarn develop
```

Run tests:

```sh
yarn test
```

Production build:

```sh
yarn build
```

Serve the production build:

```sh
yarn serve
```

Deploy:

```sh
yarn deploy
```

## Continuous Integration / Continuous Delivery

Inspired by [Trunk Based Development](https://trunkbaseddevelopment.com).

Principles:

- The `master` branch contains a stable version of the code and is the base for other branches.
- Changes to `master` will be automatically deployed to the **staging environment**.
- Short-lived branches based on `master` can be used to develop features.
- To merge something back into `master`, open a merge request / pull request and ask for approval.
- Deploying a new release is done by creating a `release` branch or tag (matched by regex `/^release.*$/`).
- Release branches or tags are automatically deployed to the **production environment**.

<!-- TODO protect master branch from pushing -->
<!-- TODO protect release tags/branches -->

## [Gatsby Pages](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/)

- React components under `src/pages`
- Each page corresponds to a publicly accessible URL

## Gatsby Components

- React components under `src/components`
- Reusable building blocks for pages and other components

## [Gatsby Content Mesh](https://www.gatsbyjs.org/docs/graphql/)

- Pages/components access all kinds of data by using GraphQL queries during build time
- [Blog post about the architecture](https://www.gatsbyjs.org/blog/2018-10-04-journey-to-the-content-mesh/)

Images:

- Powered by [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/)
- Image data is queried via GraphQL and processed with the `<Img/>`
- Images are stored in `src/images/`

Static JSON data:

- Powered by [gatsby-transformer-json](https://www.gatsbyjs.org/packages/gatsby-transformer-json/)
- JSON files are stored in `src/data/`

## Authentication

Powered by [Auth0](https://auth0.com/) and a custom local plugin called [`gatsby-plugin-auth0-universal`](./plugins/gatsby-plugin-auth0-universal/README.md).

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

### Account setup:

- Create a tenant for each environment (stage, prod)

  - EU location
  - Create a Single Page Application
    - Allowed Callback URLs
      - For non-production tenant: `http://localhost:8000/callback`
      - Same as `${AUTH0_CALLBACK_URL}`
    - Allowed Web Origins
      - For non-production tenant: `http://localhost:8000`
      - Same as `${PUBLIC_URL}`
    - Allowed Logout URLs - For non-production tenant: `http://localhost:8000/${AUTH0_LOGOUT_PATH}` - Same as `${AUTH0_LOGOUT_URL}`

<!-- TODO register Auth0 account 0.5h -->
<!-- TODO create Auth0 tenant for staging environment 0.5h -->
<!-- TODO create Auth0 tenant for production environment 0.5h -->
<!-- TODO enable social login providers -->
<!-- TODO customize universal login page company logo url and colors 1h -->

### Emails

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

## Acknowledgments
