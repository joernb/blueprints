import { AppBar, Grid, Hidden, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import TopNav from "./top-nav";

interface Props {
  openDrawer: () => void;
}

const Header = ({ openDrawer }: Props) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid
          container
          wrap="nowrap"
          alignItems="center"
          justify="space-between"
        >
          <Hidden smUp>
            <Grid item>
              <IconButton color="inherit" edge="start" onClick={openDrawer}>
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <TopNav />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
