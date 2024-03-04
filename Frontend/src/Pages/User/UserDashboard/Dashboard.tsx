import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddItem from "./addItem";
import { useDispatch } from "react-redux";
import { clearLoading } from "@/store/generalSlice";
import DashboardSidebar from "../../../components/user/dashboard/subComponents/DashboardSideBar";
import DashboardNavigation from "@/components/user/dashboard/navs/DashboardNavigation";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearLoading());
  }, []);
  return (
    <div className="relative max-w-[1440px] m-auto">
      <div>
        <div className=" relative flex">
          <DashboardSidebar />
          <div className="w-full">
            <DashboardNavigation />
            <div className="p-10">
            <Routes>
              <Route path="/settings" element={<AddItem />} />
            </Routes>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
