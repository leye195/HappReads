import React from "react";
import style from "./Book.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classnames.bind(style);
const formatAuthors = authors => {
  let format = "";
  authors.forEach(ele => {
    format += ele;
  });
  return format;
};
/*const getAvg = votes => {
  if (votes) {
    const total = votes.reduce((a, b) => a + b, 0);
    return (total / votes.length).toFixed(2);
  } else {
    return 0;
  }
};*/
const Book = props => {
  const { book, from } = props;
  const url = book.isbn.split(" ");
  if (from === "home") {
    return (
      <div className={cx("book")}>
        <img src={book.thumbnail} alt="book" />
        <p>{book.title}</p>
      </div>
    );
  } else if (from === "search") {
    return (
      <li className={cx("ser-bg")}>
        <div className={cx("ser-book")}>
          <Link
            to={
              url[0] !== ""
                ? `/book/${book.isbn.split(" ")[0]}`
                : `/book/${book.isbn.split(" ")[1]}`
            }
          >
            <img src={book.thumbnail} alt="book" />
          </Link>
        </div>
        <div className={cx("ser-info")}>
          <Link
            to={
              url[0] !== ""
                ? `/book/${book.isbn.split(" ")[0]}`
                : `/book/${book.isbn.split(" ")[1]}`
            }
          >
            <h3 className={cx("ser-title")}>{book.title}</h3>
          </Link>
          <p>
            <span className={cx("ser-author")}>
              {formatAuthors(book.authors)}
            </span>
          </p>
          <div className={cx("ser-score")}>
            <span>{0} 평점</span>
            <span> | </span>
            <span>{0} 평론 </span>
          </div>
        </div>
      </li>
    );
  } else if (from === "profile") {
    return (
      <div className={cx("shelve")} style={{ margin: "10px" }}>
        <Link
          to={
            url[0] !== ""
              ? `/book/${book.isbn.split(" ")[0]}`
              : `/book/${book.isbn.split(" ")[1]}`
          }
        >
          <span className={cx("title")}>{book.title}</span>
          <span className={cx("authors")}>
            지은이: {formatAuthors(book.authors)}
          </span>
        </Link>
      </div>
    );
  }
};

export default Book;
