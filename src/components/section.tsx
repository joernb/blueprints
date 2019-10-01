import { Box, Grid, Theme } from "@material-ui/core";
import {
  GridDirection,
  GridItemsAlignment,
  GridJustification,
  GridSpacing,
  GridWrap,
} from "@material-ui/core/Grid";
import { SpacingArgument } from "@material-ui/core/styles/createSpacing";
import { makeStyles } from "@material-ui/styles";
import { PaletteProps } from "@material-ui/system";
import React, { ReactNode } from "react";

interface StyleProps {
  spacing?: SpacingArgument;
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {},
  wrapper: ({ spacing = 0 }: StyleProps) => ({
    position: "relative",
    width: "100%",
    padding: theme.spacing(spacing),
    zIndex: 0,
  }),
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
}));

export interface SectionProps {
  color?: PaletteProps["color"];
  bgcolor?: PaletteProps["bgcolor"];
  alignItems?: GridItemsAlignment;
  direction?: GridDirection;
  justify?: GridJustification;
  spacing?: GridSpacing;
  wrap?: GridWrap;
  children?: ReactNode;
  background?: ReactNode;
  className?: any;
}

const Section = ({
  color,
  bgcolor,
  alignItems,
  direction,
  justify,
  wrap,
  spacing,
  children,
  background,
  className,
}: SectionProps) => {
  const classes = useStyles({
    spacing,
  });

  return (
    <Box color={color} bgcolor={bgcolor} className={classes.wrapper}>
      <Grid
        container
        direction={direction}
        justify={justify}
        alignItems={alignItems}
        wrap={wrap}
        className={classes.background}
      >
        {background}
      </Grid>
      <Grid
        container
        direction={direction}
        justify={justify}
        alignItems={alignItems}
        wrap={wrap}
        spacing={spacing}
        className={className}
      >
        {children}
      </Grid>
    </Box>
  );
};

export default Section;
