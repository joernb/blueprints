import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Grid } from "@material-ui/core";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Home" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={6} md={8} lg={10} xl={11}>
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
          <Link to="/page-2/">Go to page 2</Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} xl={1}>
          <Img fluid={data.placeholderImage.childImageSharp.fluid} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default IndexPage;
