import React from "react";
import { Link, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { UserOptions } from "../atoms/UserOptions";

const drawerWidth = 240;

type HeaderProps = {
  handleDrawerToggle: Function;
};

export const Header = (props: HeaderProps) => {
  const { handleDrawerToggle } = props;
  const classes = useStyles();
  const loggedIn = true;
  const location = useLocation();
  let hideBtn = true;

  if (location.pathname.indexOf("/create/post") !== -1) {
    hideBtn = false;
  }

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Hidden smUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={(e) => handleDrawerToggle(e)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography
          variant="h6"
          className={classes.headerTypography}
          component={Link}
          to="/"
          noWrap
        >
          TGAG
        </Typography>
        <div className={classes.grow} />
        {loggedIn && hideBtn && (
          <Button
            color={"primary"}
            component={Link}
            to="/create/post"
            variant={"contained"}
          >
            Create MEME
          </Button>
        )}
        <UserOptions />
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "black",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
  headerTypography: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
  menuButton: {
    marginRight: 36,
  },
}));
