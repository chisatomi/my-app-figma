'use client'
import React, { useState, ButtonHTMLAttributes } from "react";
import "./style.css";

interface Props {
  disabled: boolean;
  hover: boolean;
  className: string;
}

export const CtaButton = ({
  hover,
  disabled,
  className,
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
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
      {...props}
    >
      <div className="text-wrapper">チェックする</div>
    </button>
  );
};
