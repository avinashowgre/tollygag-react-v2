import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export function LoginForm() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            id="password"
            label="Password"
            name="password"
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        Sign In
      </Button>
      <Button type="submit" variant="outlined" color="primary">
        Cancel
      </Button>
    </form>
  );
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  btn: {
    marginRight: theme.spacing(1),
  },
}));
