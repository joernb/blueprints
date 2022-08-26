[◀️ Overview](../../README.md)

# Express API

This library implements an [Express](https://expressjs.com/)-based REST API for backend apps.

- `📄 middleware.ts`: Exports an Express middleware that implements the API.
- `📄 context.ts`: Defines a shared global context that is accessible to all API modules. It can contain configuration settings or client instances to interact with other systems.
- `📁 ...`: Separates the API into logical modules:
  - `📄 model.ts`: Defines the data model for this API module.
  - `📄 middleware.ts`: Creates a middleware that implements request handlers for all API module endpoints and wires them up with the business functions.
  - `📄 ....ts`: Typically implements an async business function (e.g. `updateItem(...)`) that is parametrized with input data and the global context.
- `📁 util`: Provides shared utilities.
