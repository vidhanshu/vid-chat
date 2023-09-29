import React, { ChangeEvent, HTMLAttributes } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

import { StringShortener } from "@/src/common/utils/string-manipulation";

type TFileUploadInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  fileUrl?: string;
  fileName?: string;
  clearForm: () => void;
};
const FileUploadInput = ({
  fileUrl,
  fileName,
  clearForm,
  ...props
}: TFileUploadInputProps) => {
  const isImage = fileUrl?.match(/\.(jpeg|jpg|gif|png)$/);

  return (
    <div className="space-y-4">
      {fileUrl ? (
        <div>
          {isImage ? (
            <Image
              width={150}
              height={150}
              className="object-cover w-[150px] h-[150px] rounded-lg border-[1px] shadow-sm"
              src={fileUrl}
              alt="uploaded-image"
            />
          ) : (
            <div className="w-[150px] h-[150px] border-[1px] shadow-sm flex flex-col gap-y-4 items-center justify-center">
              <FileText className="w-14 h-14 text-gray-400" />
            </div>
          )}
        </div>
      ) : (
          <label className="cursor-pointer">
            <div className="border-2 rounded-lg border-dashed p-8 flex flex-col gap-y-4">
              <h1 className="text-blue-500">Select file to send</h1>
              <em className="text-gray-600 text-xs">
                file type accepted - jpeg/png/jpg/gif & pdf <br /> max filesize
                accepted - 3MB
              </em>
            </div>
            <input
              hidden
              type="file"
              accept="image/jpeg, image/jpg, image/png, image/gif, application/pdf"
              {...props}
            />
          </label>
      )}

      {fileName ? (
        <div onClick={clearForm}>
          <h1 className="text-sm text-red-500 underline underline-offset-4 cursor-pointer">
            {fileName
              ? `Remove : ${StringShortener(fileName, 15)}`
              : "Remove selected file"}
          </h1>
        </div>
      ) : null}
    </div>
  );
};

export default FileUploadInput;
