import React from "react";
import { useSnapshot } from "valtio";
import { SketchPicker } from "react-color";
import state from "../../../store";

export const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div >
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (state.color = color.hex)}
      />
    </div>
  );
};
