import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type DATA = {
  data: {
    name: string;
    email: string;
    password: string;
    confirm: string;
  };
};

const initialState: DATA = {
  data: {
    name: "",
    email: "",
    password: "",
    confirm: "",
  },
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setState: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.data[action.payload.name] = action.payload.value;
    },
  },
});

export const { setState } = signUpSlice.actions;
export default signUpSlice.reducer;
