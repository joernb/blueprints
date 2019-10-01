import { Grid } from "@material-ui/core";
import { graphql } from "gatsby";
import { FixedObject, FluidObject } from "gatsby-image";
import React, { useMemo } from "react";
import ArticlesSection, { Article } from "../components/articles-section";
import ContactSection from "../components/contact-section";
import HeroSection from "../components/hero-section";
import ImpressionsSection, {
  Impression,
} from "../components/impressions-section";
import IntroSection from "../components/intro-section";
import Layout from "../components/layout";
import PartnersSection, { Partner } from "../components/partners-section";
import PlansSection, { Feature, Plan } from "../components/plans-section";
import SEO from "../components/seo";
import TestimonialsSection, {
  Testimonial,
} from "../components/testimonials-section";

export const query = graphql`
  query {
    backgroundImages: allFile(
      filter: { relativePath: { glob: "backgrounds/**" } }
    ) {
      nodes {
        childImageSharp {
          fluid(maxWidth: 1280) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    logoImages: allFile(filter: { relativePath: { glob: "logos/**" } }) {
      nodes {
        childImageSharp {
          fixed(height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    thumbnailImages: allFile(
      filter: { relativePath: { glob: "thumbnails/**" } }
    ) {
      nodes {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    photoImages: allFile(filter: { relativePath: { glob: "photos/**" } }) {
      nodes {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
            originalName
          }
        }
      }
    }
    dataJson {
      staticText {
        heroHeading
        heroBody
        heroButton
        introHeading
        introBody
        introButton
        articleHeading
        articleBody
        articleButton
        impressionsHeading
        impressionsBody
        testimonialHeading
        testimonialBody
        partnersHeading
        partnersBody
        pricingHeading
        pricingBody
        contactHeading
        contactBody
        contactButton
      }
      articles {
        slug
        title
        body
      }
      features {
        label
        plan
        tooltip
      }
      impressions {
        title
        body
      }
      plans {
        slug
        description
        title
      }
      partners {
        title
      }
      testimonials {
        title
        body
      }
    }
  }
`;

interface Data {
  backgroundImages: {
    nodes: Array<{
      childImageSharp: {
        fluid: FluidObject;
      };
    }>;
  };
  logoImages: {
    nodes: Array<{
      childImageSharp: {
        fixed: FixedObject;
      };
    }>;
  };
  thumbnailImages: {
    nodes: Array<{
      childImageSharp: {
        fixed: FixedObject;
      };
    }>;
  };
  photoImages: {
    nodes: Array<{
      childImageSharp: {
        fluid: FluidObject;
      };
    }>;
  };
  dataJson: {
    staticText: {
      heroHeading: string;
      heroBody: string;
      heroButton: string;
      introHeading: string;
      introBody: string;
      introButton: string;
      articleHeading: string;
      articleBody: string;
      articleButton: string;
      impressionsHeading: string;
      impressionsBody: string;
      testimonialHeading: string;
      testimonialBody: string;
      partnersHeading: string;
      partnersBody: string;
      pricingHeading: string;
      pricingBody: string;
      contactHeading: string;
      contactBody: string;
      contactButton: string;
    };
    articles: Array<{
      slug: string;
      title: string;
      body: string;
    }>;
    features: Array<{
      label: string;
      plan: string[];
      tooltip: string;
    }>;
    impressions: Array<{
      title: string;
      body: string;
    }>;
    plans: Array<{
      slug: string;
      description: string;
      title: string;
    }>;
    partners: Array<{
      title: string;
    }>;
    testimonials: Array<{
      title: string;
      body: string;
      rating: number;
    }>;
  };
}

interface Props {
  data: Data;
}

const IndexPage = ({ data }: Props) => {
  const {
    backgroundImages,
    logoImages,
    thumbnailImages,
    photoImages,
    dataJson,
  } = data;

  const heroImage = useMemo(
    () => backgroundImages.nodes[0].childImageSharp.fluid,
    [backgroundImages]
  );
  const staticText = dataJson.staticText;
  const articles: Article[] = useMemo(
    () =>
      dataJson.articles.map((article, index) => ({
        ...article,
        image:
          thumbnailImages.nodes[index % thumbnailImages.nodes.length]
            .childImageSharp.fixed,
      })),
    [dataJson.articles, thumbnailImages]
  );

  const features: Feature[] = useMemo(() => dataJson.features, [
    dataJson.features,
  ]);
  const impressions: Impression[] = useMemo(
    () =>
      dataJson.impressions.map((impression, index) => ({
        ...impression,
        image:
          backgroundImages.nodes[index % backgroundImages.nodes.length]
            .childImageSharp.fluid,
      })),
    [dataJson.impressions, backgroundImages]
  );
  const partners: Partner[] = useMemo(
    () =>
      dataJson.partners.map((partner, index) => ({
        ...partner,
        image:
          logoImages.nodes[index % logoImages.nodes.length].childImageSharp
            .fixed,
      })),
    [dataJson.partners, logoImages]
  );
  const testimonials: Testimonial[] = useMemo(
    () =>
      dataJson.testimonials.map((testimonial, index) => ({
        ...testimonial,
        image:
          photoImages.nodes[index % photoImages.nodes.length].childImageSharp
            .fluid,
      })),
    [dataJson.testimonials, photoImages]
  );
  const plans: Plan[] = useMemo(
    () =>
      dataJson.plans.map((plan, index) => ({
        ...plan,
        image:
          backgroundImages.nodes[index % backgroundImages.nodes.length]
            .childImageSharp.fluid,
      })),
    [dataJson.plans, backgroundImages]
  );
  const contactImage = useMemo(
    () => backgroundImages.nodes[1].childImageSharp.fluid,
    [backgroundImages]
  );

  return (
    <Layout>
      <SEO title="Home" />
      <Grid container direction="row" justify="center" alignItems="stretch">
        <HeroSection
          heading={staticText.heroHeading}
          body={staticText.heroBody}
          buttonLabel={staticText.heroButton}
          buttonPath="/"
          color="primary.contrastText"
          backgroundImage={heroImage}
          buttonColor="primary"
        />

        <IntroSection
          heading={staticText.introHeading}
          body={staticText.introBody}
          color="primary.contrastText"
          backgroundColor="primary.dark"
        />
        <ArticlesSection
          articles={articles}
          buttonLabel={staticText.articleButton}
          color="primary.contrastText"
          backgroundColor="primary.light"
          buttonColor="primary"
        />
        <ImpressionsSection
          heading="Impressions"
          body="Lorem ipsum dolor sit amet."
          impressions={impressions}
          color="primary.contrastText"
          backgroundColor="primary.dark"
        />
        <TestimonialsSection
          heading="Testimonials"
          body={staticText.testimonialBody}
          testimonials={testimonials}
          color="primary.contrastText"
          backgroundColor="primary.light"
          starColor="primary"
        />
        <PartnersSection
          heading={staticText.partnersHeading}
          body={staticText.partnersBody}
          partners={partners}
          color="primary.contrastText"
          backgroundColor="primary.dark"
        />
        <PlansSection
          plans={plans}
          features={features}
          heading={staticText.pricingHeading}
          body={staticText.pricingBody}
          color="primary.contrastText"
          backgroundColor="primary.light"
          buttonColor="primary"
        />
        <ContactSection
          color="primary.contrastText"
          backgroundImage={contactImage}
          heading={staticText.contactHeading}
          body={staticText.contactBody}
          buttonLabel={staticText.contactButton}
          buttonColor="primary"
        />
      </Grid>
    </Layout>
  );
};

export default IndexPage;
