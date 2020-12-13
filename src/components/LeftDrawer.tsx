import React from "react";

import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";

const drawerWidth = 240;

type LeftDrawerProps = {
  handleDrawerToggle: Function;
  mobileOpen: boolean;
};

export function LeftDrawer(props: LeftDrawerProps) {
  const { handleDrawerToggle, mobileOpen } = props;
  const classes = useStyles();

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          "Inbox",
          "Starred",
          "Send email",
          "Drafts",
          "Inbox1",
          "Starred1",
          "Send email1",
          "Drafts2",
          "Inbox2",
          "Starred2",
          "Send email2",
          "Drafts3",
          "Inbox3",
          "Starred3",
          "Send email3",
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={(e) => handleDrawerToggle(e)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
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
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

const useStyles = makeStyles((theme: any) => {
  return {
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      left: "unset",
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  };
});
