import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, control, label, defaultValue = "Hello", className }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="w-full font-semibold">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <Editor
              apiKey="ib0psmxnr8yq33yve8ulv9y5h00qa58k5le6fpwcjo8lqpkp"
              initialValue={defaultValue}
              init={{ branding: false }}
              toolbar="bold italic underline | undo redo | contentchecker"
              onEditorChange={onChange}
            />
          );
        }}
      />
    </div>
  );
};

export default React.memo(RTE);
