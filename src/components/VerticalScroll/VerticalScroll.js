import React from "react";
import classnames from "classnames/bind";
import style from "./VerticalScroll.scss";
import Book from "../Book/Book";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(style);
const VerticalScroll = ({ title, books }) => {
  return (
    <section className={cx("vertical")}>
      <p className={cx("title")}>
        {title}
        <FontAwesomeIcon className={cx("book-icon")} icon={faBook} />
      </p>
      <section className={cx("list")}>
        {books?.map((book) => (
          <Link key={v4()} to={`/book/${book._id}`}>
            <Book book={book} from={"home"} />
          </Link>
        ))}
      </section>
    </section>
  );
};
export default VerticalScroll;
