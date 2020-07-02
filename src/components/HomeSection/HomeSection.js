import React from "react";
import style from "./HomeSection.scss";
import classname from "classnames/bind";

const cx = classname.bind(style);
const HomeSection = () => {
  return (
    <section className={cx("home-section")}>
      <section className={cx("words")}>
        <h3>With Happyness</h3>
        <h4>책을 공유 하고 자신의 인생 책을 찾아보세요</h4>
      </section>
    </section>
  );
};

export default HomeSection;
