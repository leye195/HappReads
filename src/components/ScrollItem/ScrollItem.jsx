import React from "react";
import style from "./ScrollItem.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);
const ScrollItem = ({ children }) => {
  return <div className={cx("scroll-item")}>{children}</div>;
};
export default ScrollItem;
