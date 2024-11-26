import React from "react";
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
  return (
    <button
      className={`CTA-button disabled-${disabled} hover-${hover} ${className}`}
    >
      <div className="text-wrapper">チェックする</div>
    </button>
  );
};
