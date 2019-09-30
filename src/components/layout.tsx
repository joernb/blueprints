import React, { ReactNode } from "react";
import { AppBar, Box, CssBaseline, Grid } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import theme from "../theme";
import Header from "./header";

const useStyles = makeStyles(() => ({
  appBar: {},
}));

const Layout = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* TODO adjust AppBar positioning, consider top margin of content, https://material-ui.com/api/app-bar/ */}
      <AppBar position="sticky" className={classes.appBar}>
        <Header />
      </AppBar>
      <Grid container wrap="nowrap">
        <Grid item xs={12}>
          <Box>{children}</Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Layout;
