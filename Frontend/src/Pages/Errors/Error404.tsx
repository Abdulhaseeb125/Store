import { clearLoading } from "@/store/generalSlice";
import  { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Error404() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearLoading());
  }, [dispatch]);
  return (
    <div className="flex text-2xl justify-center items-center h-screen">
      404 | Not found
    </div>
  );
}
