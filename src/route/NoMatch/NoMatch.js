import React from "react";
import goBack from "../../img/go_back.png";
import classnames from "classnames/bind";
import style from "./NoMatch.scss";
import Helmet from "../../components/Helmet";
const cx = classnames.bind(style);
const NoMatch = () => {
  return (
    <>
      <Helmet title={`404 Error | HappReads`} />
      <section className={cx("nomatch-section")}>
        <h1>404 Not Found</h1>
        <img src={goBack} alt={"404"} />
      </section>
    </>
  );
};

export default NoMatch;
