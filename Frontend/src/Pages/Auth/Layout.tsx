// import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import SignUp from "./Signup";
import UserIndex from "./UserIndex";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearLoading } from "@/store/generalSlice";

export default function Layout() {
  let states = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearLoading());
  }, []);

  if (states.isAuthenticated) {
    return <Navigate to={"/"} />;
  } else {
    return (
      <div className="grid max-w-2xl m-auto sm:grid-cols-2 sm:place-content-center h-screen">
        <div className="hidden sm:flex sm:flex-col justify-center  ">
          <h1 className="text-3xl font-semibold">
            <span className="text-primary font-bold"> Store </span>
            where every click
            <span className="text-primary font-bold"> opens </span>
            doors to
            <span className="text-primary font-bold"> extraordinary </span>
            finds
          </h1>
        </div>
        <Routes>
          <Route path="/" element={<UserIndex />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    );
  }
}
