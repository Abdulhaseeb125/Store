// import React from 'react'

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React from "react";

type Props = {
  placeholder?: string;
  icon?: React.ReactNode;
  func?: any;
  type?: string;
  name?: string;
  classNames?: string;
  value?: string;
  disabled?: boolean;
};

export default function CustomInput(props: Props) {
  return (
    <Label className={`relative  flex items-center  w-full`}>
      <span className="absolute px-2">{props.icon}</span>
      <Input
        className={" placeholder:italic placeholder:text-neutral-400 block py-2 pl-10 shadow-sm focus:outline-none focus:border-0 focus-visible:ring-0 focus:ring-0 sm:text-sm rounded-none focus-visible:border-b-2 border-0 border-b-2 border-neutral-600"
          .concat(...(" " + props.classNames))}
        placeholder={props.placeholder ?? "Enter text here"}
        type={props.type ?? "text"}
        name={props.name ?? "name"}
        onChange={props.func}
        value={props.value ?? ""}
        disabled={props.disabled}
      />
    </Label>
  );
}
