// import React from 'react'

import { Navigate, Route, Routes } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import { useSelector } from "react-redux";

export default function ProtectedRoutes() {
  let user = useSelector((state: any) => state.user);

  if (user.isAuthenticated) {
    return (
      <Routes>
        <Route path="dashboard"  element={<UserDashboard />} />
      </Routes>
    );
  } else {
    return <Navigate to={"/auth/login"} />;
  }
}
