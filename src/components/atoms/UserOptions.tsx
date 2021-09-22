import React, { useState } from "react";

import AccountCircle from "@material-ui/icons/AccountCircle";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Login } from "./Login";
import { SignUp } from "../organisms/SignUp";
import Hidden from "@material-ui/core/Hidden";
import MoreVertIcon from "@material-ui/icons/MoreVert";

type UserOptionsProps = any;

export function UserOptions(props: UserOptionsProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const loggedIn = true;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Hidden smUp implementation="css">
        <IconButton aria-label="settings" color="inherit" onClick={handleClick}>
          <MoreVertIcon />
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
          {loggedIn ? (
            <>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Login />
              </MenuItem>
              <MenuItem>
                <SignUp />
              </MenuItem>
            </>
          )}
        </Menu>
      </Hidden>
      <Hidden xsDown implementation="css">
        {loggedIn ? (
          <>
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
          </>
        ) : (
          <>
            <Login />
            <SignUp />
          </>
        )}
      </Hidden>
    </div>
  );
}
