import Banner from "@/components/Banner";
import CategoryPanel from "@/components/CategoryPanel";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Poster from "@/components/Poster";
import SalePoint from "@/components/sections/SalePoint";
import CountDown from "@/components/sections/TimeCounter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { clearLoading } from "@/store/generalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Index() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearLoading());
  }, []);

  return (
    <div className="max-w-[1400px] m-auto">
      <Navigation />
      {/* Main Body */}
      <div className="p-2">
        {/* 1st Section (Banner + Category Panel) */}
        <div className="flex gap-2">
          <CategoryPanel />
          <Banner />
        </div>
        {/* 2nd Section Sale Point */}
        <div className="">
          <div className="mt-6 px-4 bg-neutral-100 dark:bg-neutral-900 p-2 flex flex-wrap gap-2 justify-between ">
            <div className="flex items-center gap-2">
              <Label className="text-xl"> Flash Sale</Label>
              <div className="flex items-center">
                <Button>See More</Button>
              </div>
              {/* <CountDown /> */}
            </div>
          </div>

          {/* <SalePoint /> */}
        </div>
        {/* Poster */}
        <Poster />
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
