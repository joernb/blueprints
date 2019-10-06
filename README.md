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

## S3 Deployment

Deployment is powered by [gatsby-plugin-s3](https://github.com/jariz/gatsby-plugin-s3).

To trigger a deployment, run:

```sh
yarn deploy
```

Setup:

- A programatic IAM user with `S3FullAccess` is needed. Take note of `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` during registration.
- Bucket names are not scoped to an AWS account. They are mapped to an AWS subdomain and therefore have to be scoped with some form of company prefix.
- One bucket for each environment (stage, prod)

<!-- TODO create IAM user, create and name stage and prod S3 buckets 0.5h -->

Bucket creation:

- Disable blocking public access
- Continue with default settings
- Enable "Properties - Static Hosting"
- Take note of the endpoint url as PUBLIC_URL

## Acknowledgments
