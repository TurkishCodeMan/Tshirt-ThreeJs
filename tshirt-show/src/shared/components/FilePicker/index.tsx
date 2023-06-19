import React from "react";
import { DecalTypes } from "../../../config/constants";
import { CustomButton } from "../CustomButton";

type FilePickerProps = {
  file: any;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  readFile: (val: keyof typeof DecalTypes) => void;
  
};


export const FilePicker = ({ file, setFile, readFile }: FilePickerProps) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex-col">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          //@ts-expect-error
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === "" ? "No File Selected" : file.name}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          variant="outline"
          title="Logo"
          className="text-xs"
          onClick={() => readFile("logo")}
        />
             <CustomButton
          variant="filled"
          title="Full"
          className="text-xs"
          onClick={() => readFile("full")}
        />
      </div>
    </div>
  );
};
