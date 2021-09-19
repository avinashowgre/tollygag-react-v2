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
        <DropZone orderIndex={"1"} />
      </Grid>
      <Grid item className={classes.flexItem}>
        <DropZone orderIndex={"2"} />
      </Grid>
      {/* <Grid item className={classes.flexItem}>
        <DropZone orderIndex={"3"} />
      </Grid>
      <Grid item className={classes.flexItem}>
        <DropZone orderIndex={"4"} />
      </Grid>
      <Grid item className={classes.flexItem}>
        <DropZone orderIndex={"5"} />
      </Grid>  */}
    </>
  );
}

const useStyles = makeStyles(() => {
  return {
    flexItem: {
      flex: "1 0 auto",
      minWidth: "30%",
      margin: 1,
    },
  };
});
