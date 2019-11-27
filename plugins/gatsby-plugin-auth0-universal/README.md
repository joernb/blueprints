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
    logoutUrl: process.env.AUTH0_LOGOUT_URL
  },
},
```

## How it works

<!-- TODO add documentation -->
