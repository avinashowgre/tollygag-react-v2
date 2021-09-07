import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { UserOptions } from "../atoms/UserOptions";
import Hidden from "@material-ui/core/Hidden";

const drawerWidth = 240;

type HeaderProps = {
  handleDrawerToggle: Function;
};

export const Header = (props: HeaderProps) => {
  const { handleDrawerToggle } = props;
  const classes = useStyles();

  function redirectToHome() {
    window.location.href = "/";
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
          noWrap
          onClick={redirectToHome}
        >
          TGAG
        </Typography>
        <div className={classes.grow} />
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
    "&:hover": {
      cursor: "pointer",
    },
  },
  menuButton: {
    marginRight: 36,
  },
}));
