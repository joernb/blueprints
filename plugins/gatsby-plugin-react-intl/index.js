import React from "react";
import { IntlProvider } from "react-intl";

export const wrapPageElement = ({ element, props: { pageContext } }) => {
  const { locale, messages } = pageContext;

  return (
    <IntlProvider locale={locale} messages={messages}>
      {element}
    </IntlProvider>
  );
};
