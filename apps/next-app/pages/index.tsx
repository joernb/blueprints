import Head from "next/head";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";

interface Props {}

const IndexPage = ({}: Props) => {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <Section></Section>
    </Layout>
  );
};

export default IndexPage;
