'use client'
import React, { useState } from "react";
import "./style.css";

interface Props {
  disabled: boolean;
  hover: boolean;
  className: any;
}

export const CtaButton = ({
  disabled,
  hover,
  className,
}: Props): JSX.Element => {
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
    <button
      className={`CTA-button disabled-${disabled} hover-${isHover} ${className}`}
      onMouseEnter={onHover}
      onMouseLeave={offHover}
    >
      <div className="text-wrapper">チェックする</div>
    </button>
  );
};
