import { createSlice } from "@reduxjs/toolkit";

type GENERAL = {
  isLoading: boolean;
  sidebarOpen: boolean;
};

const initialState: GENERAL = {
  isLoading: true,
  sidebarOpen: false,
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
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { setLoading, clearLoading, setSidebarOpen } =
  generalSlice.actions;
export default generalSlice.reducer;
