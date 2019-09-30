import React from "react";
import { useIntl } from "react-intl";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => {
  const intl = useIntl();
  return (
    <Layout>
      <SEO title={intl.formatMessage({ id: "404.title" })} />
      <h1>{intl.formatMessage({ id: "404.heading" })}</h1>
      <p>{intl.formatMessage({ id: "404.text" })}</p>
    </Layout>
  );
};

export default NotFoundPage;
