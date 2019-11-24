## Internationalization (i18n)

Based on [`react-intl`](https://github.com/formatjs/react-intl/tree/master/docs) and a custom local plugin called [gatsby-plugin-react-intl](plugins/gatsby-plugin-react-intl/README.md).

  <!-- TODO install intl-relativetimeformat with data for all locales if necessary for browser support -->

Pages may want to infer the `<html lang>` attribute from the current locale:

```jsx
const intl = useIntl();
<SEO lang={intl.locale} />;
```
