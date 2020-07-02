import React from "react";
import style from "./Notice.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);
const Notice = ({ type, children }) => {
  return <div className={cx(["notice-container", type])}>{children}</div>;
};
export default Notice;
