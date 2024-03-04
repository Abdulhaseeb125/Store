import {
  Drawer,
  DrawerClose,
  DrawerContent,
  // DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Menu, User, X } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function NavSideMenu() {
  return (
    <div className="flex items-center">
      <Drawer direction="left">
        <DrawerTrigger className="block md:hidden ">
          <Menu />
        </DrawerTrigger>
        <DrawerContent className="w-60 h-full">
          <DrawerHeader className="flex justify-between items-center">
            <DrawerTitle>Header</DrawerTitle>
            <DrawerClose>
              <X />
            </DrawerClose>
          </DrawerHeader>
          <DrawerFooter >
            <div className="flex items-center justify-center gap-2">
              <Button className="md:hidden flex" size={"sm"} variant={'secondary'}>
                <User size={20} className="mr-1" />
                Log in
              </Button>
              <Separator
                orientation="vertical"
                className="h-5 md:hidden flex "
              />
              <Button className="flex md:hidden" size={"sm"} variant={"secondary"}>
                Sign up
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
