// import React from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import Index from "./Pages/Index";
import Layout from "./Pages/User/Auth/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/UserSlices/userSlice";
import Error404 from "./Pages/Errors/Error404";
import Dashboard from "./Pages/User/UserDashboard/Dashboard";
import Loading from "./components/common/subComponents/loading";

export default function App() {
  const navigate = useNavigate();
  let isLoading = useSelector((state: any) => state.general.isLoading);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const user = useSelector((state: any) => state.user);

  return (
    <div>
      {isLoading && <Loading />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Auth/*" element={<Layout />} />
        {user && user.isAuthenticated ? (
          <Route path="/dashboard/*" element={<Dashboard />} />
        ) : null}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}
