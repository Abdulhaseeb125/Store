import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./UserSlices/signUpSlice";
import loginReducer from "./UserSlices/loginSlice";
import UserReducer from "../store/UserSlices/userSlice";
import generalReducer from "./generalSlice";
import errorReducer from "./UserSlices/errorSlice";

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    login: loginReducer,
    user: UserReducer,
    general: generalReducer,
    errors: errorReducer,
  },
});

export default store;
