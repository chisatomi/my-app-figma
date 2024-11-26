import React from "react";
import uploadlogo from "./image.svg";
import "./style.css";
import Image from "next/image";

interface Props {
  hover: boolean;
  className: any;
}

export const UploadButton = ({ hover, className }: Props): JSX.Element => {
  return (
    <button className={`upload-button hover-${hover} ${className}`}>
      <Image className="upload" alt="Upload" src={uploadlogo} />
      <div className="text-wrapper">ファイルを選択</div>
    </button>
  );
};