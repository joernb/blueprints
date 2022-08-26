import Head from "next/head";
import Layout from "../components/layout";
import Section from "../components/section";

const ErrorPage = () => {
  return (
    <Layout>
      <Head>
        <title>Error</title>
      </Head>
      <Section
        style={{
          justifyContent: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Not Found</h1>
      </Section>
    </Layout>
  );
};

export default ErrorPage;
