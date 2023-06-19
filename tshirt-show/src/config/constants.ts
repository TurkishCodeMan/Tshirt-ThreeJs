import { swatch, fileIcon, ai, logoShirt, stylishShirt, dragHand, dragHandFull } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
  {
    name: "dragHand",
    icon: dragHand,
  },
  {
    name: "dragHandFull",
    icon: dragHandFull,
  }
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
  isDragHand:{
    stateProperty:"isDragHand",
    filterTab:"dragHand"
  },
  isDragHandFull: {
    stateProperty:"isDragHandFull",
    filterTab:"dragHandFull"
  }

};
