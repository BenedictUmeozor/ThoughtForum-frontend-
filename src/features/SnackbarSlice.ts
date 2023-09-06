import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SnackbarInterface } from "../helpers/interfaces";

interface Payload {
  show: boolean;
  message: string;
}

const initialState: SnackbarInterface = {
  success: false,
  successMessage: "",
  error: false,
  errorMessage: "",
  info: false,
  infoMessage: "",
  warning: false,
  warningMessage: "",
};

const snackbarSlice = createSlice({
  name: "Snackbar",
  initialState,
  reducers: {
    setSuccess(state, action: PayloadAction<Payload>) {
      return {
        ...state,
        success: action.payload.show,
        successMessage: action.payload.message,
      };
    },
    setInfo(state, action: PayloadAction<Payload>) {
      return {
        ...state,
        info: action.payload.show,
        infoMessage: action.payload.message,
      };
    },
    setError(state, action: PayloadAction<Payload>) {
      return {
        ...state,
        error: action.payload.show,
        errorMessage: action.payload.message,
      };
    },
    setWarning(state, action: PayloadAction<Payload>) {
      return {
        ...state,
        warning: action.payload.show,
        warningMessage: action.payload.message,
      };
    },
  },
});

export const { setSuccess, setInfo, setError, setWarning } =
  snackbarSlice.actions;
export default snackbarSlice.reducer;
