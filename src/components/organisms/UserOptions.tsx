import React, { useState } from "react";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import { LoginForm } from "../atoms/LoginForm";
import { Modal } from "../atoms/Modal";
import { RegisterForm } from "../atoms/RegisterForm";
import { TabPanel } from "../atoms/TabPanel";

type UserOptionsProps = any;

function a11yProps(index: any) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

export function UserOptions(props: UserOptionsProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [value, setValue] = React.useState("signin");

  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const loggedIn = false;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const handleModalOpen = (tabIndex: string) => {
    setModalOpen(true);
    setValue(tabIndex);
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
                <Button
                  color="inherit"
                  onClick={() => handleModalOpen("signin")}
                >
                  SignIn
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleModalOpen("signup")}
                >
                  SignUp
                </Button>
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
            <Button color="inherit" onClick={() => handleModalOpen("signin")}>
              SignIn
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleModalOpen("signup")}
            >
              SignUp
            </Button>
          </>
        )}
      </Hidden>

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Tabs value={value} onChange={handleTabChange} aria-label="useroptions">
          <Tab value="signin" label="Login" {...a11yProps("signin")} />
          <Tab value="signup" label="Register" {...a11yProps("signup")} />
        </Tabs>
        <TabPanel value={value} index="signin">
          <LoginForm />
        </TabPanel>
        <TabPanel value={value} index="signup">
          <RegisterForm />
        </TabPanel>
      </Modal>
    </div>
  );
}
