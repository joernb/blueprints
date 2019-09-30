import React from "react";
import { Link } from "gatsby";
import { useIntl } from "react-intl";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => {
  const intl = useIntl();
  return (
    <Layout>
      <SEO
        lang={intl.locale}
        title={intl.formatMessage({ id: "index.title" })}
      />
      <h1>{intl.formatMessage({ id: "index.heading" })}</h1>
      <p>{intl.formatMessage({ id: "index.text1" })}</p>
      <p>{intl.formatMessage({ id: "index.text2" })}</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link
        to={intl.formatMessage({ id: "path" }, { originalPath: "/page-2" })}
      >
        {intl.formatMessage({ id: "index.link-to-page2" })}
      </Link>
    </Layout>
  );
};

export default IndexPage;
