[❮ Overview](../../README.md)

<div align="center">
  <h1>
    Next App
  </h1>
</div>

Next.js web app with integrated REST API.

# 🧬 Structure

## Code

- `📁 pages/`: Contains [pages](https://nextjs.org/docs/basic-features/pages).
  - `📄 _app.tsx`: The root component for the whole [application](https://nextjs.org/docs/advanced-features/custom-app). It integrates [context providers](https://reactjs.org/docs/context.html#contextprovider).
  - `📄 _app.css`: Application wide [CSS styling](https://nextjs.org/docs/basic-features/built-in-css-support).
  - `📄 _document.tsx`: Customizations of the [HTML document](https://nextjs.org/docs/advanced-features/custom-document) that contains the app.
  - `📁 api/`: Contains [API routes](https://nextjs.org/docs/api-routes/introduction).
    - `📄 [...index].ts`: A catch all API router handler that forwards all request to the Express middleware from [`express-api`](libs/express-api/).
- `📁 components/`: Components used by pages. Components use [Component-level CSS](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css) for styling.
- `📁 public/`: Contains [assets](https://nextjs.org/docs/basic-features/static-file-serving) (images, fonts, ...)
  - `📄 robots.txt`: Influences [search engine crawler behavior](https://developers.google.com/search/docs/advanced/robots/intro).
- `📄 next.config.js`: Next.js build [config](https://nextjs.org/docs/api-reference/next.config.js/introduction). Adjusted to include source files from `libs/` into the build process.

## Interactions

- `$PUBLIC_URL/`: Serves the web application.
- `$PUBLIC_URL/api/`: Provides the REST API used by the web application.
