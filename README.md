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

## Continuous Integration / Continuous Delivery

Inspired by [Trunk Based Development](https://trunkbaseddevelopment.com).

Principles:

- The `master` branch contains a stable version of the code and is the base for other branches.
- Changes to `master` will be automatically deployed to the **staging environment**.
- Short-lived branches based on `master` can be used to develop features.
- To merge something back into `master`, open a merge request / pull request and ask for approval.
- Deploying a new release is done by creating a `release` branch or tag (matched by regex `/^release.*$/`).
- Release branches or tags are automatically deployed to the **production environment**.

<!-- TODO protect master branch from pushing -->
<!-- TODO protect release tags/branches -->

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
