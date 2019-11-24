# Gatsby

[Gatsby Docs](https://www.gatsbyjs.org/docs/)

## [Pages](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/)

- Pages are just React components stored in `src/pages`
- A page can export a GraphQL query and get a `data` prop passed in containing the queried data
- Frontend routing is configured automatically based on folder and file names (e.g. `src/pages/foo/bar.jsx` is available at `/foo/bar`)

## [Content Mesh](https://www.gatsbyjs.org/docs/graphql/)

- Gatsby's plugins fetch data from various sources and stitch it together in a graph structure called the [content mesh](https://www.gatsbyjs.org/blog/2018-10-04-journey-to-the-content-mesh/)
- Gatsby's internal GraphQL layer allows pages and components to access the content data via queries
- Content data might come from external systems but can also contain files within the repository, e.g.
  - Images stored in `src/images/`
  - Static json data stored in `src/data/`

## Static site generation

Gatsby takes care of fetching data during build time and generating html pages based on it. Those generated pages can be deployed to any web server, that will serve static files. Having those pages generated at build time has several implications:

- The web server just needs to serve static files at runtime, no need for a Node.js server and much higher performance
- Search engines can access the prebuilt html pages and index them
- The pages need to be redeployed when the content changes, which can be solved by having a CI pipeline triggered by webhooks
- Static sites can be combined with [client-side dynamic data handling](https://www.gatsbyjs.org/docs/client-data-fetching/) (e.g. user login, storing a shopping cart)
