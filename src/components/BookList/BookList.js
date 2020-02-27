import React from "react";
import style from "./BookList.scss";
import classnames from "classnames/bind";
import Book from "../Book/Book";
import { Link } from "react-router-dom";
import { ChasingDots } from "better-react-spinkit";
import { v4 } from "uuid";
const cx = classnames.bind(style);
const BookList = ({ booklist, from }) => {
  if (from === "home") {
    return (
      <div className={cx("book-list")}>
        {booklist ? (
          booklist.map(book => {
            const url = book.isbn.split(" ");
            return (
              <Link
                to={
                  url[0] !== ""
                    ? `/book/${book.isbn.split(" ")[0]}`
                    : `/book/${book.isbn.split(" ")[1]}`
                }
                key={v4()}
              >
                <Book book={book} from={from} />
              </Link>
            );
          })
        ) : (
          <ChasingDots color="white" size={60} />
        )}
      </div>
    );
  } else if (from === "search") {
    return (
      <div>
        <ul className={cx("ser-ul")}>
          {booklist.map(book => {
            return <Book book={book} from={from} key={v4()} />;
          })}
        </ul>
      </div>
    );
  } else if (from === "profile") {
    return (
      <div>
        <ul>
          {booklist.map(book => {
            return <Book book={book} from={from} key={v4()} />;
          })}
        </ul>
      </div>
    );
  }
};

export default BookList;
