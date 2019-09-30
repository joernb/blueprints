#

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

Production build:

```sh
yarn build
```

Serve the production build:

```sh
yarn serve
```

## Features

### [Gatsby Pages](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/)

- React components under `src/pages`
- Each page corresponds to a publicly accessible URL

### Gatsby Components

- React components under `src/components`
- Reusable building blocks for pages and other components

### [Gatsby Content Mesh](https://www.gatsbyjs.org/docs/graphql/)

- Pages/components access all kinds of data by using GraphQL queries during build time
- [Blog post about the architecture](https://www.gatsbyjs.org/blog/2018-10-04-journey-to-the-content-mesh/)

Images:

- Powered by [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/)
- Image data is queried via GraphQL and processed with the `<Img/>`
- Images are stored in `src/images/`

Static JSON data:

- Powered by [gatsby-transformer-json](https://www.gatsbyjs.org/packages/gatsby-transformer-json/)
- JSON files are stored in `src/data/`

### Content Management

Powered by [Contentful](https://contentful.com).

Setup:

- Create an empty Contentful space
- Add locales

<!-- TODO create and configure Contentful space 0.5h -->

Environment:

- CONTENTFUL_HOST: Defaults to `cdn.contentful.com` but is `preview.contentful.com` if you want to use the Content Preview API.
- CONTENTFUL_SPACE_ID: Can be obtained from the url when logged in.
- CONTENTFUL_ENVIRONMENT: Specify the environment of the space. Defaults to `master`.
- CONTENTFUL_ACCESS_TOKEN: Create this in the backend UI under "Settings > API keys".

## Acknowledgments
