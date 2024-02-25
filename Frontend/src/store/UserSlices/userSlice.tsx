import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

type UserState = {
  isAuthenticated: boolean;
  user: any;
};

const initialUserState: UserState = {
  isAuthenticated: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    getUser(state) {
      try {
        const token = Cookies.get("_auth");
        if (token) {
          const user = jwtDecode(token);
          state.user = user;
          state.isAuthenticated = !!user;
        }
      } catch (err) {
        Cookies.remove("_auth");
        state.user = null;
        state.isAuthenticated = false;
      }
    },

    clearUser(state) {
      Cookies.remove("_auth"); // Remove auth cookie
      state.isAuthenticated = false;
      state.user = null;
      window.location.reload();
    },
  },
});

export const { getUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
