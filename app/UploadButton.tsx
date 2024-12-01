'use client'
import React, { useState } from "react";
import uploadlogo from "./image.svg";
import "./style.css";
import Image from "next/image";

interface Props {
  hover: boolean;
  className: any;
}

export const UploadButton = ({ hover, className }: Props): JSX.Element => {
  const [isHover, setIsHover] = useState(false)
  const onHover = () => {
    console.log("on")
    setIsHover(true)
  }
  const offHover = () => {
    console.log("off")
    setIsHover(false)
  }
  return (
    <button className={`upload-button hover-${isHover} ${className}`}
      onMouseEnter={onHover}
      onMouseLeave={offHover}
    >
      <Image className="upload" alt="Upload" src={uploadlogo} />
      <div className="text-wrapper">ファイルを選択</div>
    </button>
  );
};