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
yarn start
```

Build:

```sh
yarn build
```

Serve a build locally:

```sh
yarn serve
```

Run tests:

```sh
yarn test
```

Deploy:

```sh
yarn deploy
```

## GraphQL Server

Powered by [Apollo Server](https://github.com/apollographql/apollo-server).

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

## Acknowledgments
