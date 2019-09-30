# gatsby-plugin-auth0-universal

## Getting started

```js
{
  resolve: `gatsby-plugin-auth0-universal`,
  options: {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENTID,
    redirectUri: process.env.AUTH0_CALLBACK_URL,
    silentAuthFlag: "silentAuthFlag",
    logoutUrl: process.env.AUTH0_LOGOUT_URL,
    scope: [
      "openid",
      "profile",
      "email",
      "read:current_user",
      "create:current_user_metadata",
      "update:current_user_metadata",
      "delete:current_user_metadata",
    ].join(" "),
  },
},
```

## How it works

<!-- TODO add documentation -->
