import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Popover,
  Theme,
} from "@material-ui/core";
import StarBorder from "@material-ui/icons/StarBorder";
import { Link as GatsbyLink } from "gatsby";
import React, { useCallback, useState } from "react";
import { useLocation } from "../../plugins/gatsby-plugin-use-location";

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    pointerEvents: "none",
  },
  popoverGrid1: {
    padding: theme.spacing(2),
    minWidth: 700,
  },
  menu1Grid: {
    // padding: theme.spacing(2),
    minWidth: theme.breakpoints.width("xs"),
  },
  menu2Grid: {
    padding: theme.spacing(2),
    minWidth: theme.breakpoints.width("sm"),
  },
  menu3Grid: {
    padding: theme.spacing(2),
    minWidth: theme.breakpoints.width("sm"),
  },
  popoverGrid: {
    pointerEvents: "auto",
    padding: theme.spacing(2),
    minWidth: theme.breakpoints.width("sm"),
  },
  popoverFooter: {
    padding: theme.spacing(2),
  },
  xsGrid: {
    minWidth: theme.breakpoints.width("sm") / 2,
  },
  smGrid: {
    padding: theme.spacing(2),
    minWidth: theme.breakpoints.width("sm"),
  },
  fullGrid: {
    minWidth: "100%",
  },
  dividerLeft: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));

const TopNav = ({}: {}) => {
  const classes = useStyles();
  const { location } = useLocation();
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  // TOOD integrate i18n label translation
  const transformLabel = useCallback((label: string) => label, []);
  // TOOD integrate i18n path transformation
  const transformPath = useCallback((path: string) => path, []);

  const openMenu = useCallback(
    event => setMenuAnchorEl(event.currentTarget),
    []
  );
  const closeMenu = useCallback(() => setMenuAnchorEl(null), []);

  return (
    <Grid item container justify="flex-end">
      <Button
        id="home"
        component={GatsbyLink}
        to="/"
        color={
          location.pathname === transformPath("/") ? "secondary" : "inherit"
        }
      >
        Home
      </Button>
      <Button
        id="home"
        component={GatsbyLink}
        to="/page-2"
        color={
          location.pathname === transformPath("/page-2")
            ? "secondary"
            : "inherit"
        }
      >
        Page-2
      </Button>
      <Button id="menu1" onClick={openMenu} color="inherit">
        Menu1
      </Button>
      <Button id="menu2" onClick={openMenu} color="inherit">
        Menu2
      </Button>
      <Button id="menu3" onClick={openMenu} color="inherit">
        Menu3
      </Button>
      <Popover
        disableRestoreFocus
        anchorEl={menuAnchorEl}
        keepMounted
        open={menuAnchorEl !== null && menuAnchorEl.id === "menu1"}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid item container className={classes.xsGrid}>
          <Grid item xs={12}>
            <List>
              <ListItem
                button
                component={GatsbyLink}
                onClick={closeMenu}
                to={"/"}
              >
                <ListItemText>Item</ListItemText>
              </ListItem>
              <ListItem
                button
                component={GatsbyLink}
                onClick={closeMenu}
                to={"/"}
              >
                <ListItemText>Item</ListItemText>
              </ListItem>
              <ListItem
                button
                component={GatsbyLink}
                onClick={closeMenu}
                to={"/"}
              >
                <ListItemText>Item</ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Popover>
      <Popover
        disableRestoreFocus
        anchorEl={menuAnchorEl}
        keepMounted
        open={menuAnchorEl !== null && menuAnchorEl.id === "menu2"}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid item container className={classes.smGrid}>
          <Grid item xs={12}>
            <List
              subheader={
                <ListSubheader component="div">List subheader</ListSubheader>
              }
            >
              <ListItem
                button
                component={GatsbyLink}
                onClick={closeMenu}
                to={"/"}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText>Item</ListItemText>
              </ListItem>
              <ListItem
                button
                component={GatsbyLink}
                onClick={closeMenu}
                to={"/"}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText>Item</ListItemText>
              </ListItem>
              <ListItem
                button
                component={GatsbyLink}
                onClick={closeMenu}
                to={"/"}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText>Item</ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Divider />
        <Grid item container className={classes.smGrid}>
          <Grid item xs={12}>
            <Button component={GatsbyLink} to={"/"}>
              Item
            </Button>
            <Button component={GatsbyLink} to={"/"}>
              Item
            </Button>
          </Grid>
        </Grid>
      </Popover>
      <Popover
        disableRestoreFocus
        open={menuAnchorEl !== null && menuAnchorEl.id === "menu3"}
        onClose={closeMenu}
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid item container className={classes.smGrid}>
          <Grid item xs={6}>
            <List
              subheader={
                <ListSubheader component="div">List subheader</ListSubheader>
              }
            >
              <ListItem
                button
                component={GatsbyLink}
                onClick={closeMenu}
                to={"/"}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText>Item</ListItemText>
              </ListItem>
              <ListItem
                button
                component={GatsbyLink}
                onClick={closeMenu}
                to={"/"}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText>Item</ListItemText>
              </ListItem>
              <ListItem
                button
                component={GatsbyLink}
                onClick={closeMenu}
                to={"/"}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText>Item</ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6} className={classes.dividerLeft}>
            <List
              subheader={
                <ListSubheader component="div">List subheader</ListSubheader>
              }
            >
              <ListItem
                button
                component={GatsbyLink}
                onClick={closeMenu}
                to={"/"}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText>Item</ListItemText>
              </ListItem>
              <ListItem
                button
                component={GatsbyLink}
                onClick={closeMenu}
                to={"/"}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText>Item</ListItemText>
              </ListItem>
              <ListItem
                button
                component={GatsbyLink}
                onClick={closeMenu}
                to={"/"}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText>Item</ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Divider />
        <Grid item container className={classes.smGrid}>
          <Grid item xs={12}>
            <Button component={GatsbyLink} to={"/"}>
              Item
            </Button>
            <Button component={GatsbyLink} to={"/"}>
              Item
            </Button>
          </Grid>
        </Grid>
      </Popover>
    </Grid>
  );
};

export default TopNav;
