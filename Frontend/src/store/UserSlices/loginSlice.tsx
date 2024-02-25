import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoginState {
  data: {
    email: string;
    password: string;
  };
}

const initialState: LoginState = {
  data: {
    email: "",
    password: "",
  },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginState: (
      state,
      action: PayloadAction<{ name: keyof LoginState["data"]; value: string }>
    ) => {
      state.data[action.payload.name] = action.payload.value;
    },
  },
});

export const { setLoginState } = loginSlice.actions;

export default loginSlice.reducer;
