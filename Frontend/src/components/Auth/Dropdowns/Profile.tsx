import { ModeToggle } from "@/components/themeControls/modeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearUser } from "@/store/UserSlices/userSlice";
import { DashboardIcon } from "@radix-ui/react-icons";
import { LogOut, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfileDropdown({ user }: any) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-1 items-center mx-3">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="flex justify-between items-center">
            {user.name}
            <ModeToggle />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to={"user/dashboard"}>
            <DropdownMenuItem className="flex gap-3">
              <DashboardIcon />
              Dashboard
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="flex gap-3">
            <ShoppingCart size={20} />
            Cart
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-3"
            onClick={() => dispatch(clearUser())}
          >
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
