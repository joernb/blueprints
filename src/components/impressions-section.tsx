import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FluidObject } from "gatsby-image";
import React from "react";
import BackgroundImage from "./background-image";
import Section, { SectionProps } from "./section";

const useStyles = makeStyles(() => ({
  image: {
    height: 400,
  },
}));

export interface Impression {
  title: string;
  body: string;
  image: FluidObject;
}

interface Props {
  heading: string;
  body: string;
  impressions: Impression[];
  color: SectionProps["color"];
  backgroundColor: SectionProps["bgcolor"];
}

const ImpressionsSection = ({
  heading,
  body,
  impressions,
  color,
  backgroundColor,
}: Props) => {
  const classes = useStyles();
  return (
    <Section
      spacing={5}
      color={color}
      bgcolor={backgroundColor}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h2" align="center">
            {heading}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center">{body}</Typography>
        </Grid>
      </Grid>
      {impressions.map((impression, index) => (
        <Grid key={index} item xs={12} sm={12} md={6} lg={6}>
          <Section
            justify="center"
            alignItems="center"
            background={
              <BackgroundImage
                fluid={impression.image}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            }
            className={classes.image}
          >
            <Grid item xs={12}>
              <Typography variant="h2" align="center">
                {impression.title}
              </Typography>
              <Typography align="center">{impression.body}</Typography>
            </Grid>
          </Section>
        </Grid>
      ))}
    </Section>
  );
};

export default ImpressionsSection;
