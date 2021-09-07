import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const CreatePost = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.createPostContainer} spacing={2}>
      <Grid item lg={8}>
        <Grid container direction="column">
          <Grid item lg={12}>
            <TextField
              id="standard-adornment-amount"
              fullWidth
              placeholder="Paste URL"
              size={"small"}
              value={""}
              variant="outlined"
            />
          </Grid>
          <Grid item lg={12}>
            Grid 1-2
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4}>
        Grid 2
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    createPostContainer: {
      backgroundColor: "white",
      height: "100vh",
    },
  };
});

export const CreatePostWithRouter = withRouter(CreatePost);
