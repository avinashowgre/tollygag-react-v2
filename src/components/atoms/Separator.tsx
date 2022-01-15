import { makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";

type Props = {
  text: ReactNode;
};

export function Separator(props: Props) {
  const { text } = props;
  const classes = useStyles();
  return <div className={classes.root}>{text}</div>;
}

const useStyles = makeStyles(() => {
  return {
    root: {
      alignItems: "center",
      color: "gray",
      display: "flex",
      justifyContent: "center",
      margin: 10,
      "&::after": {
        borderBottom: "1px solid lightgray",
        content: "''",
        flex: 1,
      },
      "&::before": {
        borderBottom: "1px solid lightgray",
        content: "''",
        flex: 1,
      },
      "&:not(:empty)::before": {
        marginRight: ".25em",
      },
      "&:not(:empty)::after": {
        marginLeft: ".25em",
      },
    },
  };
});
