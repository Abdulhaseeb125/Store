// import React from 'react'
import { Routes, Route } from "react-router-dom";
import Index from "./Pages/Index";
import Layout from "./Pages/Auth/Layout";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/loading";
import ProtectedRoutes from "./Pages/ProtectedRoutes/ProtectedRoutes";
import { useEffect } from "react";
import { getUser } from "./store/UserSlices/userSlice";
import Error404 from "./Pages/Error404";

export default function App() {
  let isLoading = useSelector((state: any) => state.general.isLoading);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Loading />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Auth/*" element={<Layout />} />
        <Route path="/user/*" element={<ProtectedRoutes />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}
