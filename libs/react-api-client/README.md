[❮ Overview](../../README.md)

<div align="center">
  <h1>
    React API Client
  </h1>
</div>

Client library that provides React Hooks to access the [REST API](../express-api/README.md).

# 🧬 Structure

## Code

- `📄 context.ts`: Exports a [React Context](https://reactjs.org/docs/context.html) that can be used to store global state or configuration accessible to React hooks.
- `📄 provider.ts`: Exports a [React Context Provider](https://reactjs.org/docs/context.html#contextprovider) that wraps other context providers that are used internally.
- `📁 .../`: Provides React hooks and functions.
- `📁 util/`: Provides shared utilities.
