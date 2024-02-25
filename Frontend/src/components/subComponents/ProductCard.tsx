// import { ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
// import { useState } from "react";
// import {
  // Tooltip,
  // TooltipContent,
  // TooltipProvider,
  // TooltipTrigger,
// } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

export default function ProductCard({}) {
  // let [isHovered, setHovered] = useState(false);
  // function HandleMouseEnter() {
  //   setHovered(true);
  // }
  // function handleMouseLeave() {
  //   setHovered(false);
  // }
  return (
    <div>
      <Link to={'#'}>
        <Card
          className="hover:shadow-md dark:hover:shadow-md dark:hover:shadow-neutral-800 transition-all m-auto max-w-full w-[13.8rem] rounded border  dark:border-neutral-700"
        //   onMouseEnter={HandleMouseEnter}
        //   onMouseLeave={handleMouseLeave}
        >
          <CardHeader className="">
            <img
              src="/public/images/shoes.jpg"
              alt=""
              className="rounded aspect-[6/5]"
            />
          </CardHeader>
          <CardContent>
            <CardDescription>Woods</CardDescription>
            <CardTitle className="text-pretty text-sm line-clamp-2">
             <p>Lorem ipgsum dolor sit agmet consectetur adgipisicing elit. Ut, laboriosam?</p>
            </CardTitle>
          </CardContent>
          <CardFooter className="font-semibold py-3 flex justify-between items-center">
            Rs. 2000
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button className="">
                    <ShoppingCart color="orange" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="dark:bg-neutral-700 bg-neutral-100 dark:text-white text-black border dark:border-neutral-500">
                  <p>Add to Cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
