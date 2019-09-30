import React from "react";
import { Grid, Toolbar } from "@material-ui/core";

interface Props {}

const Header = ({  }: Props) => {
  return (
    <Toolbar>
      <Grid container wrap="nowrap" alignItems="center"></Grid>
    </Toolbar>
  );
};

export default Header;
