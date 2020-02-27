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
      //const [bookState,setBookState] = useState(booklist);
      return (
        <div>
          <ul>
            {booklist.map(book => {
              return <Book book={book} from={from} key={v4()} type={type} />;
            })}
          </ul>
        </div>
      );
    }
  }
}

export default connect(null, null)(BookList);
