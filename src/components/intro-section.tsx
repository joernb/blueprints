import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Section, { SectionProps } from "./section";

interface Props {
  heading: string;
  body: string;
  color: SectionProps["color"];
  backgroundColor: SectionProps["bgcolor"];
}

const IntroSection = ({ heading, body, color, backgroundColor }: Props) => {
  return (
    <Section spacing={5} color={color} bgcolor={backgroundColor}>
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
    </Section>
  );
};

export default IntroSection;
