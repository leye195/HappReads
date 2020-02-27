import React from "react";
import style from "./Category.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);
const Category = () => {
  return (
    <div className={cx("category")}>
      <ul>
        <li>카테고리</li>
        <li>예술</li>
        <li>소설</li>
        <li>스포츠</li>
        <li>역사</li>
        <li>과학</li>
        <li>미스테리</li>
        <li>코믹</li>
      </ul>
    </div>
  );
};

export default Category;
