# Client-Side GraphQL

Gatsby provides a build time GraphQL layer, but does not support dynamic GraphQL operations on the client-side. This can be done with [Apollo Client](https://www.apollographql.com/docs/react/).

Integration of Apollo Client in Gatsby works like integrating it in other React-based projects:

- Create a client instance of Apollo Client and provide it for React components using the React Context API (Provider/Consumer). In Gatsby, this can be done in `gatsby-browser.js`.
- Use the React Apollo Hooks to trigger queries/mutations within a React component.

## Testing tools

[FakeQL](https://fakeql.com/) is a tool for quickly mocking a GraphQL endpoint.

A [list](https://github.com/APIs-guru/graphql-apis) of GraphQL APIS.
