import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import state from "../store";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../shared/components";
import { Popover } from "@headlessui/react";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = React.useState<any>("");
  const [prompt, setPrompt] = React.useState("");
  const [generatingImg, setGeneratingImg] = React.useState(false);
  const [activeEditorTab, setActiveEditorTab] = React.useState("");
  const [activeFilterTab, setActiveFilterTab] = React.useState({
    logoShirt: true,
    stylishShirt: false,
    dragHand: false,
    dragHandFull: false,
  });

  async function handleSubmit(type: keyof typeof DecalTypes) {
    if (!prompt) alert("Please enter a valid prompt");

    try {
      //call our backend generate an ai image
      setGeneratingImg(true);
      const response = await fetch("https://devswag.onrender.com/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      const data = await response.json();
      handleDecals(type, `data:image/png,base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return (
          <Popover.Panel className="absolute left-full ml-3">
            <ColorPicker />
          </Popover.Panel>
        );

      case "filepicker":
        return (
          <Popover.Panel className="absolute left-full ml-1 top-0">
            <FilePicker file={file} setFile={setFile} readFile={readFile} />
          </Popover.Panel>
        );

      case "aipicker":
        return (
          <Popover.Panel className="absolute left-full ml-3">
            <AIPicker
              prompt={prompt}
              setPrompt={setPrompt}
              generatingImg={generatingImg}
              handleSubmit={handleSubmit}
            />
          </Popover.Panel>
        );
      default:
        return null;
    }
  };
  function handleDecals(type: keyof typeof DecalTypes, result: unknown) {
    const decalType = DecalTypes[type];

    //@ts-expect-error
    state[decalType.stateProperty] = result;
    //@ts-expect-error
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
      setActiveFilterTab((curr) => ({
        ...curr,
        [decalType.filterTab]: !curr[decalType.filterTab as keyof typeof curr],
      }));
    }
  }

  function handleActiveFilterTab(tabName: string) {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !state.isLogoTexture;
        break;
      case "stylishShirt":
        state.isFullTexture = !state.isFullTexture;
        break;
      case "dragHand":
        state.isDragHand = !state.isDragHand;
        break;
      case "dragHandFull":
        state.isDragHandFull = !state.isDragHandFull;
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        state.isDragHand = false;
        state.isDragHandFull = false;
        break;
    }
  }

  function readFile(type: keyof typeof DecalTypes) {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="top-0 left-0 absolute z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <Popover>
                <div className="editortabs-container tabs">
                  {EditorTabs.map((tab) => (
                    <Popover.Button key={tab.name}>
                      <Tab
                        key={tab.name}
                        tab={tab}
                        onClick={() => setActiveEditorTab(tab.name)}
                      />
                    </Popover.Button>
                  ))}
                  {generateTabContent()}
                </div>
              </Popover>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              variant="filled"
              title="Go Back"
              onClick={() => (state.intro = true)}
              className="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={
                  activeFilterTab[tab.name as keyof typeof activeFilterTab]
                }
                onClick={() => {
                  handleActiveFilterTab(tab.name);
                  setActiveFilterTab((curr) => ({
                    ...curr,
                    [tab.name]: !curr[tab.name as keyof typeof curr],
                  }));
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
