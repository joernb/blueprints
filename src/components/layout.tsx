import { CssBaseline } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import React, { ReactNode } from "react";
import theme from "../theme";

const useStyles = makeStyles(() => ({}));

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
