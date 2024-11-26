import React from "react";
import "./style.css";

type LockupProps = {
  title: string
  keymessage: string
};

export const Lockup = (props: LockupProps): JSX.Element => {
  return (
    <div className="lockup">
      <div className="h">
        <div className="text-wrapper">{props.title}</div>
        <div className="keymessage">{props.keymessage}</div>
      </div>
    </div>
  );
};
