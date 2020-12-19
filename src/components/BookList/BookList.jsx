import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ChasingDots } from "better-react-spinkit";
import { v4 } from "uuid";
import classnames from "classnames/bind";
import Book from "../Book/Book";

import style from "./BookList.scss";

const cx = classnames.bind(style);

const BookList = ({ from, booklist, type, handleMore, done }) => {
  if (from === "home") {
    return (
      <section className={cx("book-list")}>
        {booklist ? (
          type === "전체" && booklist.length > 0 ? (
            <>
              {booklist.map((book) => {
                return (
                  <Link to={`/book/${book._id}`} key={v4()}>
                    <Book book={book} from={from} />
                  </Link>
                );
              })}
              {done === false && (
                <div className={cx("more-book-btn")} onClick={handleMore}>
                  <p>더 보기 +</p>
                </div>
              )}
            </>
          ) : (
            <>
              {booklist
                .filter((book) => book?.genres?.includes(type))
                .map((book) => {
                  return (
                    <Link to={`/book/${book._id}`} key={v4()}>
                      <Book book={book} from={from} />
                    </Link>
                  );
                })}
              {booklist.filter((book) => book?.genres?.includes(type)).length >
                0 &&
                done === false &&
                booklist.length % 15 !== 0 && (
                  <div className={cx("more-book-btn")} onClick={handleMore}>
                    <p>더 보기 +</p>
                  </div>
                )}
            </>
          )
        ) : (
          <ChasingDots color="white" size={60} />
        )}
      </section>
    );
  } else if (from === "search") {
    return (
      <section className={cx("ser-container")}>
        <ul className={cx("ser-ul")}>
          {booklist.map((book) => {
            return <Book book={book} from={from} key={v4()} />;
          })}
        </ul>
      </section>
    );
  } else if (from === "profile") {
    return (
      <section>
        <ul>
          {booklist.map((book) => {
            return <Book book={book} from={from} key={v4()} type={type} />;
          })}
        </ul>
      </section>
    );
  }
};

export default connect(null, null)(BookList);
