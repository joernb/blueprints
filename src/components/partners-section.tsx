import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FixedObject } from "gatsby-image";
import Img from "gatsby-image/withIEPolyfill";
import React from "react";
import Section, { SectionProps } from "./section";

const useStyles = makeStyles(() => ({
  logo: {
    minWidth: 140,
    minHeight: 140,
    backgroundColor: "white",
  },
}));

export interface Partner {
  title: string;
  image: FixedObject;
}

interface Props {
  heading: string;
  body: string;
  partners: Partner[];
  color: SectionProps["color"];
  backgroundColor: SectionProps["bgcolor"];
}

const PartnersSection = ({
  heading,
  body,
  partners,
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
      {partners.map((partner, index) => (
        <Grid key={index} item>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.logo}
          >
            <Img
              alt={partner.title}
              fixed={partner.image}
              objectFit="cover"
              objectPosition="50% 50%"
            />
          </Grid>
        </Grid>
      ))}
    </Section>
  );
};

export default PartnersSection;
