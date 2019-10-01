import { Button, Grid, Typography } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { Link as GatsbyLink } from "gatsby";
import Img, { FixedObject } from "gatsby-image";
import React, { Fragment } from "react";
import Section, { SectionProps } from "./section";

export interface Article {
  slug: string;
  title: string;
  body: string;
  image: FixedObject;
}

interface Props {
  buttonLabel: string;
  articles: Article[];
  color: SectionProps["color"];
  backgroundColor: string;
  buttonColor: ButtonProps["color"];
}

const ArticlesSection = ({
  buttonLabel,
  articles,
  color,
  backgroundColor,
  buttonColor,
}: Props) => {
  return (
    <Section
      justify="center"
      spacing={5}
      color={color}
      bgcolor={backgroundColor}
    >
      {articles.map((article, index) => (
        <Fragment key={index}>
          <Grid item>
            <GatsbyLink to="/">
              <Img fixed={article.image} />
            </GatsbyLink>
          </Grid>
          <Grid
            item
            xs={12}
            sm={10}
            md={8}
            container
            direction="column"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h2">{article.title}</Typography>
            </Grid>
            <Grid item>
              <Typography>{article.body}</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color={buttonColor}
                component={GatsbyLink}
                to={`/articles/${article.slug}`}
              >
                {buttonLabel}
              </Button>
            </Grid>
          </Grid>
        </Fragment>
      ))}
    </Section>
  );
};

export default ArticlesSection;
