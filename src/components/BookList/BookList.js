import React, { Component } from "react";
import style from "./BookList.scss";
import classnames from "classnames/bind";
import Book from "../Book/Book";
import { Link } from "react-router-dom";
import { ChasingDots } from "better-react-spinkit";
import { v4 } from "uuid";
import { connect } from "react-redux";
const cx = classnames.bind(style);
class BookList extends Component {
  render() {
    const { from, booklist, type } = this.props;
    if (from === "home") {
      return (
        <div className={cx("book-list")}>
          {booklist ? (
            booklist.map((book) => {
              return (
                <Link to={`/book/${book._id}`} key={v4()}>
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
        <div className={cx("ser-container")}>
          <ul className={cx("ser-ul")}>
            {booklist.map((book) => {
              return <Book book={book} from={from} key={v4()} />;
            })}
          </ul>
        </div>
      );
    } else if (from === "profile") {
      //console.log(booklist);
      return (
        <div>
          <ul>
            {booklist.map((book) => {
              return <Book book={book} from={from} key={v4()} type={type} />;
            })}
          </ul>
        </div>
      );
    }
  }
}

export default connect(null, null)(BookList);
