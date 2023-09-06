import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch } from "../hooks/hooks";
import { setError, setInfo, setSuccess } from "../features/SnackbarSlice";

type PropTypes = {
  message: string;
};

export const SnackbarWarning = ({ message }: PropTypes) => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert
        severity="warning"
        onClose={() => setOpen(false)}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export const SnackbarSuccess = ({ message }: PropTypes) => {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
    dispatch(setSuccess({ show: false, message: "" }));
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert severity="success" onClose={handleClose} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export const SnackbarError = ({ message }: PropTypes) => {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
    dispatch(setError({ show: false, message: "" }));
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        severity="error"
        onClose={() => setOpen(false)}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export const SnackbarInfo = ({ message }: PropTypes) => {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
    dispatch(setInfo({ show: false, message: "" }));
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert severity="info" onClose={handleClose} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
