import clsx from "clsx";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { useSnapshot } from "valtio";
import state from "../../../store";
import { getContrastingColor } from "../../../config/helpers";


export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: string;
  title: string;
}

export const CustomButton = ({
  variant,
  title,
  className,
  ...rest
}: ButtonProps) => {
  const snap = useSnapshot(state);

  const generateStyle = (variant: string) => {
    if (variant === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color)
      };
    }else if (variant==='outline'){
      return {
        borderWidth:'1px',
        borderColor:snap.color,
        color:getContrastingColor(snap.color)
      }
    }
  };
  return (
    <button
      className={clsx(className, "px-2 py-1.5 flex-1 rounded-md")}
      title={title}
      style={generateStyle(variant)}
      {...rest}
    >
      {title}
    </button>
  );
};
