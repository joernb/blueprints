# gatsby-plugin-react-intl

## Getting started

gatsby-config:

```json
{
  resolve: `gatsby-plugin-react-intl`,
  options: {
    messagesDir: `${__dirname}/src/i18n`,
  },
},
```

## How it works

- Inspired by [gatsby-plugin-intl](https://www.gatsbyjs.org/packages/gatsby-plugin-intl/)
- Integrates [`react-intl`](https://github.com/formatjs/react-intl) into Gatsby

### Message files

`messagesDir` should contain a json file for each supported locale (e.g. `en.json`, `en-us.json`, `en-gb.json`) with translated messages.

`react-intl` expects a flat key value map, but this plugin allows a nested json structure by taking care of the flattening.

A json file like

```json
{ "foo": { "bar": "value" } }
```

can be accessed like this:

```js
const intl = useIntl();
intl.formatMessage({ id: "foo.bar" });
```

### Site generation

Each page is rendered for each locale. The page's path is contructed by using the special translation message called `path` with a `{originalPath}` placeholder.

For the default locale, the message json file should look like:

```json
{
  "path": "{originalPath}",
  ...
}
```

Other locales should prefix the path:

```json
{
  "path": "/de{originalPath}",
  ...
}
```

### Linking between pages

```js
const intl = useIntl();
<Link to={intl.formatMessage({ id: "path" }, { originalPath: "/foo" })}>
  Foo
</Link>;
// Depending on the current locale, path will be /foo, /de/foo, /en-gb/foo, ...
```

### Browser support

`react-intl` v3 relies on polyfills for [better browser support](https://github.com/formatjs/react-intl/blob/master/docs/Getting-Started.md#runtime-requirements):

- Included in this plugin: [intl-pluralrules](https://www.npmjs.com/package/intl-pluralrules)
- Not included: [intl-relativetimeformat](https://www.npmjs.com/package/@formatjs/intl-relativetimeformat)
  <!-- TODO install intl-relativetimeformat with data for all locales if necessary -->
