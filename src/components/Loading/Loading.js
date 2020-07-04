import React from "react";
import { ChasingDots } from "better-react-spinkit";
import style from "./Loading.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);
const Loading = () => {
  return (
    <section className={cx("loading")}>
      <ChasingDots color="white" size={60} />
    </section>
  );
};
export default Loading;
