// import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropdown from "../subComponents/Profile";
import { Menu } from "lucide-react";
import { setSidebarOpen } from "@/store/generalSlice";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DashboardNavigation() {
  const dispatch = useDispatch();
  let user = useSelector((state: any) => state.user);
  return (
    <div>
      <div
        className={`flex items-center h-14 shadow-sm  gap-2 p-2 justify-between`}
      >
        <div className={` items-center gap- flex  lg:hidden `}>
          <button
            onClick={() => {
              dispatch(setSidebarOpen(true));
            }}
          >
            <Menu />
          </button>
        </div>
        <div className={`flex items-center `}>
          <ProfileDropdown user={user.user} />
        </div>
      </div>
    </div>
  );
}
