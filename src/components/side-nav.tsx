import {
  Box,
  Checkbox,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Switch,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FileCopy from "@material-ui/icons/FileCopy";
import Folder from "@material-ui/icons/Folder";
import StarBorder from "@material-ui/icons/StarBorder";
import { Link, navigate } from "gatsby";
import React, { useCallback, useState } from "react";
import { useLocation } from "../../plugins/gatsby-plugin-use-location";

interface Props {
  closeDrawer: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SideNav = ({ closeDrawer }: Props) => {
  const classes = useStyles();
  const { location } = useLocation();
  const [expanded, setExpanded] = useState("");
  // TOOD integrate i18n label translation
  const transformLabel = useCallback((label: string) => label, []);
  // TOOD integrate i18n path transformation
  const transformPath = useCallback((path: string) => path, []);

  const [checked, setChecked] = useState<{ [key: string]: boolean }>({
    check1: false,
    check2: false,
    check3: false,
  });

  return (
    <>
      <Toolbar />
      <Grid item>
        <Divider />
        <List
          subheader={<ListSubheader component="div">Navigation</ListSubheader>}
        >
          <ListItem
            button
            component={Link}
            selected={location.pathname === transformPath("/")}
            onClick={closeDrawer}
            to={transformPath("/")}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText>{transformLabel("Home")}</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            selected={location.pathname.startsWith(transformPath("/page-2"))}
            onClick={closeDrawer}
            to={transformPath("/page-2")}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText>{transformLabel("Page2")}</ListItemText>
          </ListItem>
          <ListItem
            button
            selected={false}
            onClick={() => {
              closeDrawer();
              navigate(transformPath("/page-2"));
            }}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText>{transformLabel("Page2")}</ListItemText>
          </ListItem>
        </List>

        <Divider />

        <List
          subheader={
            <ListSubheader component="div">
              Expandable items, checkboxes, switches
            </ListSubheader>
          }
        >
          <ListItem
            button
            onClick={() => setExpanded(expanded === "parent1" ? "" : "parent1")}
          >
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText>Parent1</ListItemText>
            {expanded === "parent1" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expanded === "parent1"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <FileCopy />
                </ListItemIcon>
                <ListItemText primary="Child item1" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <FileCopy />
                </ListItemIcon>
                <ListItemText primary="Child item2" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            onClick={() => setExpanded(expanded === "parent2" ? "" : "parent2")}
          >
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText>Parent2</ListItemText>
            {expanded === "parent2" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expanded === "parent2"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <FileCopy />
                </ListItemIcon>
                <ListItemText primary="Child item1" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <FileCopy />
                </ListItemIcon>
                <ListItemText primary="Child item2" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            onClick={() => setChecked({ ...checked, check1: !checked.check1 })}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText>Check1</ListItemText>
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={() =>
                  setChecked({ ...checked, check1: !checked.check1 })
                }
                checked={checked.check1}
                inputProps={{ "aria-labelledby": "123" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem
            button
            onClick={() => setChecked({ ...checked, check2: !checked.check2 })}
          >
            <ListItemIcon>
              <Checkbox
                edge="end"
                onChange={() =>
                  setChecked({ ...checked, check2: !checked.check2 })
                }
                checked={checked.check2}
                inputProps={{ "aria-labelledby": "124" }}
              />
            </ListItemIcon>
            <ListItemText>Check2</ListItemText>
            <ListItemSecondaryAction>
              <StarBorder />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem
            button
            onClick={() => setChecked({ ...checked, check3: !checked.check3 })}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText>Check2</ListItemText>
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={() =>
                  setChecked({ ...checked, check3: !checked.check3 })
                }
                checked={checked.check3}
                inputProps={{ "aria-labelledby": "3" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Divider />
      </Grid>

      <Grid item xs={12}>
        <List></List>
      </Grid>
      <Grid item>
        <Divider />
        <Box p={2}>
          <Typography align="center"></Typography>
        </Box>
      </Grid>
    </>
  );
};

export default SideNav;
