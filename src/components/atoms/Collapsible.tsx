import React, { ReactNode, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(() => {
  return {
    collapsibleElem: {
      padding: 5,
    },
    root: {
      border: "1px solid black",
      borderRadius: 5,
      marginBottom: 10,
      width: "100%",
    },
  };
});

type Props = {
  children: ReactNode;
  onClick?: () => void;
  title: string;
};

export function Collapsible(props: Props) {
  const { title, children, onClick } = props;
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={classes.root}>
      <ListItem button onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}

        <Typography>{title}</Typography>
      </ListItem>
      <Collapse
        className={classes.collapsibleElem}
        in={open}
        timeout="auto"
        unmountOnExit
      >
        {children}
      </Collapse>
    </div>
  );
}
