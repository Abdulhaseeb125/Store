import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  validationErrors: {
    email?: string;
    password?: string;
    name?: string;
    confirm?: string;
  };
  serverErrors: string; // Single string for server-side errors
}

const initialState: ErrorState = {
  validationErrors: {
    email: "",
    password: "",
    name: "",
    confirm: "",
  },
  serverErrors: "",
};

export const errorSlice = createSlice({
  name: "Errors",
  initialState,
  reducers: {
    setValidationError: (
      state,
      action: PayloadAction<{
        name: string;
        value: string;
      }>
    ) => {
      state.validationErrors[action.payload.name] = action.payload.value;
    },
    clearValidationErrors: (state) => {
      state.validationErrors = {
        email: "",
        password: "",
        name: "",
        confirm: "",
      };
    },
    setServerError: (state, action: PayloadAction<string>) => {
      state.serverErrors = action.payload;
    },
    clearServerError: (state) => {
      state.serverErrors = "";
    },
  },
});

export const {
  setValidationError,
  clearValidationErrors,
  setServerError,
  clearServerError,
} = errorSlice.actions;
export default errorSlice.reducer;
