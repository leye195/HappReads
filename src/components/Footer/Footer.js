import React from "react";
import moment from "moment";
import style from "./Footer.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);
const Footer = () => {
  return (
    <footer className={cx("footer")}>
      <div className={cx("footer_icon")}></div>
      <span className={cx("footer_text")}>
        &copy; HappReads {moment().format("YYYY")}
      </span>
    </footer>
  );
};

export default Footer;
