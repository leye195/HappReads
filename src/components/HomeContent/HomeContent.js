import React from "react";
import style from "./HomeContent.scss";
import classnames from "classnames/bind";
import BookList from "../BookList";
const cx = classnames.bind(style);
const HomeContent = ({ booklist }) => {
  return (
    <div className={cx("home-content")}>
      <div className={cx("books-wrapper")}>
        <BookList booklist={booklist} from={"home"} />
      </div>
    </div>
  );
};

export default HomeContent;
