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

## Internationalization (i18n)

Based on [`react-intl`](https://github.com/formatjs/react-intl/tree/master/docs) and a custom local plugin called [gatsby-plugin-react-intl](plugins/gatsby-plugin-react-intl/README.md).

  <!-- TODO install intl-relativetimeformat with data for all locales if necessary for browser support -->

Pages may want to infer the `<html lang>` attribute from the current locale:

```jsx
const intl = useIntl();
<SEO lang={intl.locale} />;
```

## Acknowledgments
