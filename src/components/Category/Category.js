import React from "react";
import style from "./Category.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);
const Category = () => {
  return (
    <div className={cx("category")}>
      <ul>
        <li>최근 책 리뷰</li>
      </ul>
    </div>
  );
};

export default Category;
