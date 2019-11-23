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

## Documentation

See the [docs](./docs) folder for more information.

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

## Acknowledgments
