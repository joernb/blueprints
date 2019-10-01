import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import { Star } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { Link as GatsbyLink } from "gatsby";
import { FluidObject } from "gatsby-image";
import Img from "gatsby-image/withIEPolyfill";
import React from "react";
import Section, { SectionProps } from "../components/section";

const useStyles = makeStyles(() => ({
  image: {
    height: 300,
  },
}));

export interface Testimonial {
  title: string;
  body: string;
  image: FluidObject;
}

interface Props {
  heading: string;
  body: string;
  testimonials: Testimonial[];
  color: SectionProps["color"];
  backgroundColor: SectionProps["bgcolor"];
  starColor: BoxProps["color"];
}

const TestimonialsSection = ({
  heading,
  body,
  testimonials,
  color,
  backgroundColor,
  starColor,
}: Props) => {
  const classes = useStyles();
  return (
    <Section
      spacing={5}
      justify="center"
      color={color}
      bgcolor={backgroundColor}
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
      {testimonials.map((testimonial, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea component={GatsbyLink} to="/">
              <CardMedia>
                <Img
                  fluid={testimonial.image}
                  objectFit="cover"
                  objectPosition="50% 50%"
                  className={classes.image}
                />
              </CardMedia>
              <CardContent>
                <Typography variant="h6">{testimonial.title}</Typography>
                <Typography>{testimonial.body}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Box color={starColor}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </Box>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Section>
  );
};

export default TestimonialsSection;
