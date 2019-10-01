import { Box, CssBaseline, Drawer, Grid, Hidden } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import React, { ReactNode, useCallback, useState } from "react";
import theme from "../theme";
import Header from "./header";
import SideNav from "./side-nav";

// TODO customize SideNav drawer width
const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  wrapper: {
    position: "relative",
    width: "100%",
    zIndex: 0,
  },
  content: {
    // TODO adjust global page padding and max width
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    maxWidth: theme.breakpoints.width("lg"),
  },
  nav: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header openDrawer={openDrawer} />
      <Box bgcolor="background.default" className={classes.wrapper}>
        <Grid container alignItems="stretch" wrap="nowrap">
          <Grid item component="nav" className={classes.nav}>
            <Hidden smUp implementation="js">
              <Drawer
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={drawerOpen}
                onClose={closeDrawer}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better performance on mobile.
                }}
              >
                <SideNav closeDrawer={closeDrawer} />
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                <SideNav closeDrawer={closeDrawer} />
              </Drawer>
            </Hidden>
          </Grid>
          <Grid container justify="center" alignItems="stretch">
            <Grid container className={classes.content}>
              {children}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
