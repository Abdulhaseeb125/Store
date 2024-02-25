import { createSlice } from "@reduxjs/toolkit";

type GENERAL = {
  isLoading: boolean;
};

const initialState: GENERAL = {
  isLoading: true,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    clearLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoading, clearLoading } = generalSlice.actions;
export default generalSlice.reducer;
