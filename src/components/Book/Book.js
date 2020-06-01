import React, { useState, Fragment } from "react";
import style from "./Book.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import * as actions from "../../reducer/login";
const cx = classnames.bind(style);
const Book = (props) => {
  const {
    from,
    type,
    profile: { profile },
    postShelve,
  } = props;
  const [isOpen, setOpen] = useState(false);
  const formatAuthors = (authors) => {
    let format = "";
    authors.forEach((ele) => {
      format += ele;
    });
    return format;
  };
  if (from === "home") {
    const { book } = props;
    return (
      <div className={cx("book")}>
        <img src={book.thumbnail} alt="book" />
        <p>{book.title}</p>
      </div>
    );
  } else if (from === "search") {
    const { book } = props;
    const url =
      book && book.isbn !== undefined ? book.isbn.split(" ") : undefined;
    return (
      <li className={cx("ser-bg")}>
        <div className={cx("ser-book")}>
          <Link to={`/book/${book._id}`}>
            <img src={book.thumbnail} alt="book" />
          </Link>
        </div>
        <div className={cx("ser-info")}>
          <Link to={`/book/${book._id}`}>
            <h3 className={cx("ser-title")}>{book.title}</h3>
          </Link>
          <p>
            <span className={cx("ser-author")}>
              {formatAuthors(book.authors)}
            </span>
          </p>
        </div>
      </li>
    );
  } else if (from === "profile") {
    const {
      book: { book },
    } = props;

    const isMe = window.location.pathname === "/me";
    const url =
      book && book.isbn !== undefined ? book.isbn.split(" ") : undefined;
    const handleChange = async (e) => {
      const {
        target: { value },
      } = e;
      //서버에 수정 요청 전송 코드입력
      try {
        await postShelve(
          profile.email,
          book.id,
          book.title,
          book.authors,
          value,
          book.thumbnail
        );
      } catch (error) {
        console.log(error);
      }
    };
    const editTags = (type) => {
      return (
        <div className={cx("edit-form")}>
          <select defaultValue={type} onChange={handleChange}>
            <option value={"want_read"}>읽을 책</option>
            <option value={"reading"}>읽고 있음</option>
            <option value={"read"}>읽음</option>
          </select>
        </div>
      );
    };
    const handleDelete = () => {
      console.log("Delete");
    };
    const handleEdit = (isOpen, setOpen) => {
      setOpen(!isOpen);
    };
    return (
      <div className={cx("shelve")} style={{ margin: "10px" }}>
        <Link to={`/book/${book._id}`}>
          <span className={cx("title")}>{book?.title}</span>
          <span className={cx("authors")}>
            지은이: {book?.authors ? formatAuthors(book?.authors) : ""}
          </span>
        </Link>
        {isMe ? (
          <div className={cx("setting-btns")}>
            <div className={cx("edit-container")}>
              <span
                className={cx("edit")}
                onClick={() => handleEdit(isOpen, setOpen)}
              >
                <FaEdit />
              </span>
              {isOpen ? editTags(type) : <Fragment />}
            </div>
            <div>
              <span className={cx("delete")} onClick={() => handleDelete()}>
                <FaTrash />
              </span>
            </div>
          </div>
        ) : (
          <Fragment />
        )}
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    profile: state.login.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postShelve: (email, isbn, title, authors, type, thumbnail) =>
      dispatch(
        actions.postShelve(email, isbn, title, authors, type, thumbnail)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Book);
