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
