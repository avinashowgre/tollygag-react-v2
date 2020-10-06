import React, { Fragment, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { Modal } from "./Modal";
import Button from "@material-ui/core/Button";

export function Login() {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Fragment>
      <Button color="inherit" className={classes.btn} onClick={handleOpen}>
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        title={"Login"}
        modalActions={
          <Fragment>
            <Button onClick={handleClose} color="secondary" variant="contained">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" variant="contained">
              Login
            </Button>
          </Fragment>
        }
      >
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="username" label="Username" name="username" />
          <TextField id="password" label="Password" name="password" />
        </form>
      </Modal>
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  btn: {
    marginRight: theme.spacing(1),
  },
}));
