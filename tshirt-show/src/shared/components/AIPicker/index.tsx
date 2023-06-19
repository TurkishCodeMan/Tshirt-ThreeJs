import React from "react";
import { CustomButton } from "../CustomButton";
import { DecalTypes } from "../../../config/constants";

type AIPickerProps = {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<any>>;
  generatingImg: boolean;
  handleSubmit: (type:keyof typeof DecalTypes) => void;
};

export const AIPicker = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
}: AIPickerProps) => {
  return (
    <div className="aipicker-container">
      <textarea
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      ></textarea>

      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            variant="outline"
            title="Asking AI..."
            className="text-xs"
          />
        ) : (
        <>
            <CustomButton
            variant="outline"
            title="AI Logo"
            onClick={() => handleSubmit("logo")}
            className="text-xs"
          />
          <CustomButton
          variant="filled"
          title="AI Full"
          onClick={() => handleSubmit("full")}
          className="text-xs"
        />
        </>
        )}
      </div>
    </div>
  );
};
