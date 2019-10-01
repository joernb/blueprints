import { Button, Grid, Typography } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { Link as GatsbyLink } from "gatsby";
import { FluidObject } from "gatsby-image";
import React from "react";
import BackgroundImage from "../components/background-image";
import Section, { SectionProps } from "../components/section";

interface Props {
  heading: string;
  body: string;
  buttonLabel: string;
  buttonPath: string;
  color: SectionProps["color"];
  backgroundImage: FluidObject;
  buttonColor: ButtonProps["color"];
}

const HeroSection = ({
  heading,
  body,
  buttonLabel,
  buttonPath,
  color,
  backgroundImage,
  buttonColor,
}: Props) => {
  return (
    <Section
      spacing={10}
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
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        container
        direction="column"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h2">{heading}</Typography>
        </Grid>
        <Grid item>
          <Typography>{body}</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color={buttonColor}
            component={GatsbyLink}
            to={buttonPath}
          >
            {buttonLabel}
          </Button>
        </Grid>
      </Grid>
    </Section>
  );
};

export default HeroSection;
