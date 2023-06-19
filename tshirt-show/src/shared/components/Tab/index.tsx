import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import state from "../../../store";
import { useSnapshot } from "valtio";

interface TabProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  tab: {
    name: string;
    icon: string;
  };
  isFilterTab?: boolean;
  isActiveTab?: boolean;
}

export const Tab = ({ tab, isFilterTab, isActiveTab, ...rest }: TabProps) => {
  const snap = useSnapshot(state);

  const activeStyles =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: "transparent", opacity: 1 };
  return (
    <div
      key={tab.name}
      className={`tab-btn ${
        isFilterTab ? "rounded-full glassmorphism" : "rounded-4"
      }`}
      style={activeStyles}
      {...rest}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={`${
          isFilterTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12"
        } object-contain`}
      />
    </div>
  );
};
