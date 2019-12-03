require("dotenv").config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-use-location`,
    {
      resolve: `gatsby-plugin-auth0-universal`,
      options: {
        domain: process.env.OAUTH2_DOMAIN,
        clientID: process.env.OAUTH2_CLIENTID,
        redirectUri: process.env.OAUTH2_REDIRECT_URI,
        silentAuthLocalStorageKey: "silentAuth",
        redirectPathLocalStorageKey: "redirect",
        logoutUrl: process.env.OAUTH2_LOGOUT_URL,
        scope: process.env.OAUTH2_SCOPE,
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: {
        // TODO add client-side page prefix patterns (e.g. /profile/*)
        prefixes: [],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
