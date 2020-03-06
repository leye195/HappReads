import React from "react";
import style from "./Category.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
const cx = classnames.bind(style);
const Category = ({ path }) => {
  return (
    <div className={cx("category")}>
      <ul>
        <li>
          <Link to={`/community/reviews`}>최근 리뷰</Link>
        </li>
        <li>
          <Link to={`/community/top-readers`}>Top Readers</Link>
        </li>
        <li>
          <Link to={`/community/top-reviewers`}>Top Reviewers</Link>
        </li>
      </ul>
    </div>
  );
};

export default Category;
