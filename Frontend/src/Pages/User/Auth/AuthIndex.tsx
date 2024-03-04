// import React from "react";

import { Link } from "react-router-dom";

export default function AuthIndex() {

  return (
    <div className=" px-10 py-10 rounded-lg sm:input_box my-auto">
      <div className="flex flex-col gap-4">
        <Link
          to={"login"}
          className="border bg-primary rounded-full text-center py-2 text-black text-sm"
        >
          Login
        </Link>
        <Link
          to={"signup"}
          className="border bg-primary rounded-full text-center py-2 text-black text-sm "
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
