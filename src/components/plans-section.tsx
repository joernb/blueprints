import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Check, Lock } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { Link as GatsbyLink } from "gatsby";
import { FluidObject } from "gatsby-image";
import Img from "gatsby-image/withIEPolyfill";
import React from "react";
import Section, { SectionProps } from "../components/section";
import { ButtonProps } from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  image: {
    height: 300,
  },
}));

export interface Plan {
  slug: string;
  description: string;
  title: string;
  image: FluidObject;
}

export interface Feature {
  label: string;
  plan: string[];
  tooltip: string;
}

interface Props {
  heading: string;
  body: string;
  plans: Plan[];
  features: Feature[];
  color: SectionProps["color"];
  backgroundColor: SectionProps["bgcolor"];
  buttonColor: ButtonProps["color"];
}

const PlansSection = ({
  heading,
  body,
  plans,
  features,
  color,
  backgroundColor,
  buttonColor,
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
      {plans.map(plan => (
        <Grid key={plan.slug} item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader title={plan.title} />
            <CardMedia>
              <Img
                fluid={plan.image}
                objectFit="cover"
                objectPosition="50% 50%"
                className={classes.image}
              />
            </CardMedia>
            <CardContent>
              <Typography>{plan.description}</Typography>
              <List>
                {features.map(feature => {
                  const disabled = !feature.plan.includes(plan.slug);
                  return (
                    <Tooltip
                      key={feature.label}
                      disableHoverListener={disabled}
                      disableFocusListener
                      disableTouchListener
                      title={feature.tooltip}
                    >
                      <ListItem button disabled={disabled}>
                        <ListItemIcon>
                          {disabled ? <Lock /> : <Check />}
                        </ListItemIcon>
                        <ListItemText>{feature.label}</ListItemText>
                      </ListItem>
                    </Tooltip>
                  );
                })}
              </List>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color={buttonColor}
                component={GatsbyLink}
                to={`/order?plan=${plan.slug}`}
              >
                Order
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Section>
  );
};

export default PlansSection;
