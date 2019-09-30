import React from "react";
import { Link } from "gatsby";
import { useIntl } from "react-intl";

import Layout from "../components/layout";
import SEO from "../components/seo";

const SecondPage = () => {
  const intl = useIntl();
  return (
    <Layout>
      <SEO title={intl.formatMessage({ id: "page-2.title" })} />
      <h1>{intl.formatMessage({ id: "page-2.heading" })}</h1>
      <p>{intl.formatMessage({ id: "page-2.text" })}</p>
      <Link to={intl.formatMessage({ id: "path" }, { originalPath: "/" })}>
        {intl.formatMessage({ id: "page-2.link-back" })}
      </Link>
    </Layout>
  );
};

export default SecondPage;
