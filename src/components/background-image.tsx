import { makeStyles } from "@material-ui/styles";
import Img, {
  GatsbyImageWithIEPolyfillProps,
} from "gatsby-image/withIEPolyfill";
import React from "react";

const useStyles = makeStyles(() => ({
  background: {
    width: "100%",
    height: "100%",
  },
}));

const BackgroundImage = (props: GatsbyImageWithIEPolyfillProps) => {
  const classes = useStyles({});
  return <Img {...props} className={classes.background} />;
};

export default BackgroundImage;
