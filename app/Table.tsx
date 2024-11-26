import React from "react";
import "./style.css";

type TableProps = {
  title: string
  message: string
};

export const Table = (props: TableProps): JSX.Element => {
  return (
    <div className="table">
      <div className="table-logo">
        <div className="titletext-logo">{props.title}</div>
        <div className="text-logo">{props.message}</div>
      </div>
    </div>
  );
};
