import { Grid, Typography } from "@material-ui/core";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { FluidObject } from "gatsby-image";
import React from "react";
import BackgroundImage from "./background-image";
import Section, { SectionProps } from "./section";

interface Props {
  heading: string;
  body: string;
  buttonLabel: string;
  color: SectionProps["color"];
  backgroundImage: FluidObject;
  buttonColor: ButtonProps["color"];
}

const ContactSection = ({
  heading,
  body,
  buttonLabel,
  color,
  backgroundImage,
  buttonColor,
}: Props) => {
  return (
    <Section
      spacing={5}
      justify="center"
      alignItems="center"
      color={color}
      background={
        <BackgroundImage
          fluid={backgroundImage}
          objectFit="cover"
          objectPosition="50% 50%"
        />
      }
    >
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
          {heading}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center">{body}</Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color={buttonColor}
          component="a"
          href="mailto:foo@example.com"
        >
          {buttonLabel}
        </Button>
      </Grid>
    </Section>
  );
};

export default ContactSection;
