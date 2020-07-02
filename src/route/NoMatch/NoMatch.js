import React from "react";
import goBack from "../../img/go_back.png";
import classnames from "classnames/bind";
import style from "./NoMatch.scss";
const cx = classnames.bind(style);
const NoMatch = () => {
  return (
    <section className={cx("nomatch-section")}>
      <h1>404 Not Found</h1>
      <img src={goBack} alt={"404"} />
    </section>
  );
};

export default NoMatch;
