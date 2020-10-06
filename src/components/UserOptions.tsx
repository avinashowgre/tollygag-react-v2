import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import AccountCircle from "@material-ui/icons/AccountCircle";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Login } from "./Login";

type UserOptionsProps = any;

export function UserOptions(props: UserOptionsProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const loggedIn = false;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.sectionDesktop}>
      {loggedIn ? (
        <Fragment>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Fragment>
      ) : (
        <Fragment>
          <Login />
          <Button color="primary" variant="contained" className={classes.btn}>
            Register
          </Button>
        </Fragment>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: any) => {
  return {
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    btn: {
      marginRight: theme.spacing(1),
    },
  };
});
