import React from "react";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import { DropZone } from "./DropZone";

type Props = any;

export function MemeLayout(props: Props) {
  const classes = useStyles();
  return (
    <>
      <Grid item className={classes.flexItem}>
        <DropZone {...props} orderIndex={"1"} />
      </Grid>
    </>
  );
}

const useStyles = makeStyles(() => {
  return {
    flexItem: {
      minWidth: "80%",
      margin: 1,
    },
  };
});
