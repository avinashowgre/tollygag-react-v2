import React, { ReactNode } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@material-ui/core";

type ModalProps = DialogProps & {
  children: ReactNode;
  modalActions?: ReactNode;
  title: string;
};

export function Modal(props: ModalProps) {
  const { children, title, modalActions, ...otherProps } = props;
  return (
    <Dialog {...otherProps}>
      <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{modalActions}</DialogActions>
    </Dialog>
  );
}
