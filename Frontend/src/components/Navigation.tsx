import { Search, User } from "lucide-react";
// import { ModeToggle } from "./themeControls/modeToggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import NavSideMenu from "./subComponents/NavSideMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./Auth/Dropdowns/Profile";
import { getUser } from "@/store/UserSlices/userSlice";

export default function Navigation() {
  let user = useSelector((state: any) => state.user);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div>
      <div
        className={`flex items-center h-14 shadow-sm  justify-between gap-2 p-2`}
      >
        <div className={`flex items-center gap-2 `}>
          <NavSideMenu />
          <Label className="text-xl font-bold">Store</Label>
        </div>
        <div className={`flex items-center`}>
          <Label className={`relative flex items-center  max-w-72`}>
            <Input
              className=" placeholder:italic placeholder:text-neutral-400 block border border-neutral-400 py-2 pl-4 pr-14 shadow-sm focus:outline-none focus:border-neutral-900 focus-visible:ring-neutral-400 focus:ring-1 sm:text-sm rounded-full"
              placeholder="Search...."
              type="text"
              name="search"
            />
            <Button
              size={"sm"}
              variant={"ghost"}
              className="absolute right-1 rounded-full"
            >
              <Search />
            </Button>
          </Label>
          {user.isAuthenticated && user.user.email ? (
            <ProfileDropdown user={user.user} />
          ) : (
            <div className="flex mx-2">
              <Link to={"/auth/login"}>
                <Button
                  className="hidden md:flex"
                  size={"sm"}
                  variant={"ghost"}
                >
                  <User size={20} className="mr-1" />
                  Log in
                </Button>
              </Link>
              <Separator
                orientation="vertical"
                className="h-5 hidden md:block  "
              />
              <Button
                className="hidden md:block "
                size={"sm"}
                variant={"ghost"}
              >
                Sign up
              </Button>
            </div>
          )}
          {/* <Button size={"icon"} variant={"ghost"} className="rounded-full">
            <ShoppingCart size={20} />
          </Button> */}
        </div>
      </div>
    </div>
  );
}
