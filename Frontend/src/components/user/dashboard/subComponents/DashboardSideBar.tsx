import "#/css/dashboardSidebar.css";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { PiStack } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "@/store/generalSlice";
import { FiChevronDown, FiPieChart, FiSettings } from "react-icons/fi";
import { GoTable } from "react-icons/go";
import { FaWpforms } from "react-icons/fa";
import { LuLayoutDashboard, LuUser2 } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const DashboardSidebar = () => {
  const { sidebarOpen } = useSelector((state: any) => state.general);
  const dispatch = useDispatch();

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebar.current &&
        !sidebar.current.contains(event.target) &&
        !trigger.current.contains(event.target)
      ) {
        dispatch(setSidebarOpen(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);
  
  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      dispatch(setSidebarOpen(false));
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={` absolute left-0 top-0 z-9999 flex h-screen w-72 flex-col overflow-y-hidden bg-white dark:bg-black transition  lg:static lg:translate-x-0 border  ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex justify-between gap-2 px-6 pt-5 lg:py-6.5">
        <NavLink to="/" className={"font-bold text-2xl"}>
          Store
        </NavLink>

        <button
          ref={trigger}
          onClick={() => dispatch(setSidebarOpen(false))}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <RxCross2 size={22} />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto ">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold ">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
 


              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to="/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium hover:dark:bg-neutral-800 hover:bg-neutral-200 ${
                    pathname.includes("calendar") &&
                    "bg-neutral-200 dark:bg-neutral-800"
                  }`}
                >
                  <LuLayoutDashboard size={22} />
                 Dashboard
                </NavLink>
              </li>
              {/* <!-- Menu Item Calendar --> */}
              {/* <!-- Menu Item Profile --> */}
        
              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium hover:dark:bg-neutral-800 hover:bg-neutral-200 ${
                    pathname.includes("calendar") &&
                    "bg-neutral-200 dark:bg-neutral-800"
                  }`}
                >
                  <IoCalendarOutline size={22} />
                  Calendar
                </NavLink>
              </li>
              {/* <!-- Menu Item Calendar --> */}
              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  hover:bg-neutral-200 dark:hover:bg-neutral-800 ${
                    pathname.includes("profile") && "bg-neutral-200 dark:bg-neutral-800"
                  }`}
                >
                  <LuUser2 size={22} />
                  Profile
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Forms --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/forms" || pathname.includes("forms")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium hover:dark:bg-neutral-800 hover:bg-neutral-200 ${
                          (pathname === "/forms" ||
                            pathname.includes("forms")) &&
                          "bg-neutral-200 dark:bg-neutral-800"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaWpforms size={22} />
                        Forms
                        <FiChevronDown
                          size={22}
                          className={`absolute right-4 top-1/2 -translate-y-1/2  ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/forms/form-elements"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium  " +                                                 (isActive && "!text-white")
                              }
                            >
                              Form Elements
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 " +
                                (isActive && "!text-white")
                              }
                            >
                              Form Layout
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Tables --> */}
              <li>
                <NavLink
                  to="/tables"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-neutral-200 hover:dark:bg-neutral-800 ${
                    pathname.includes("tables") && "bg-neutral-200 dark:bg-neutral-800"
                  }`}
                >
                  <GoTable size={22} />
                  Tables
                </NavLink>
              </li>
              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Settings --> */}
              <li>
                <NavLink
                  to="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium hover:dark:bg-neutral-800 hover:bg-neutral-200 ${
                    pathname.includes("settings") &&
                    "bg-neutral-200 dark:bg-neutral-800"
                  }`}
                >
                  <FiSettings size={22} />
                  Settings
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              <li>
                <NavLink
                  to="/chart"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium hover:dark:bg-neutral-800 hover:bg-neutral-200 ${
                    pathname.includes("chart") && "bg-neutral-200 dark:bg-neutral-800"
                  }`}
                >
                  <FiPieChart size={22} />
                  Chart
                </NavLink>
              </li>
              {/* <!-- Menu Item Chart --> */}

              {/* <!-- Menu Item Ui Elements --> */}
              <SidebarLinkGroup
                activeCondition={pathname === "/ui" || pathname.includes("ui")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium  hover:dark:bg-neutral-800 hover:bg-neutral-200  ${
                          (pathname === "/ui" || pathname.includes("ui")) && "bg-neutral-200 dark:bg-neutral-800"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <PiStack size={22} />
                        UI Elements
                        <FiChevronDown
                          size={22}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/ui/alerts"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out  " +
                                (isActive && "!text-white")
                              }
                            >
                              Alerts
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/ui/buttons"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium   " +
                                (isActive && "text-white")
                              }
                            >
                              Buttons
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Ui Elements --> */}

              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
