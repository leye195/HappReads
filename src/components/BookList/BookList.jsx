import React, {forwardRef} from "react";
import { Link } from "react-router-dom";
import { ChasingDots } from "better-react-spinkit";
import { v4 } from "uuid";
import classnames from "classnames/bind";
import Book from "../Book/Book";
import LoadMore from "../LoadMore/LoadMore";
import style from "./BookList.scss";

const cx = classnames.bind(style);

const BookList = forwardRef(({ from, booklist, type, handleMore, done },ref) => {
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
                  <LoadMore text={"더 보기+"} ref={ref}/>
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
                    <LoadMore text={"더 보기+"} ref={ref}/>
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
          {!done&&<li className="ser-load-more">
            <LoadMore text={"더 보기+"} ref={ref} handleClick={handleMore}/>
          </li>}
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
});

export default BookList;
