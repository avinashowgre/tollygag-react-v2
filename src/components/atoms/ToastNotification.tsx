import React, { ReactNode } from "react";

import Snackbar from "@material-ui/core/Snackbar";

import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

export type ToastProps = Pick<AlertProps, "severity"> & {
  onCloseToast: () => void;
  open: boolean;
  toastMessage: ReactNode;
};

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ToastNotification(props: ToastProps) {
  const { onCloseToast, open, severity, toastMessage } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={onCloseToast}
    >
      <Alert onClose={onCloseToast} severity={severity}>
        {toastMessage}
      </Alert>
    </Snackbar>
  );
}
