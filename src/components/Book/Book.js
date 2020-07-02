import React, { useState } from "react";
import style from "./Book.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import * as actions from "../../reducer/login";
const cx = classnames.bind(style);
const Book = (props) => {
  const { from, type, postShelve } = props;
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
      profile: { user },
    } = props;
    const isMe = window.location.href.endsWith("/me");
    const handleChange = async (e) => {
      const {
        target: { value },
      } = e;
      //서버에 수정 요청 전송 코드입력
      try {
        postShelve(user.email, book._id, value);
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
    const handleDelete = (type) => () => {
      const {
        deleteShelve,
        book,
        profile: { user },
      } = props;
      deleteShelve(user._id, book._id, type);
    };
    const handleEdit = (isOpen, setOpen) => {
      setOpen(!isOpen);
    };
    return (
      <div className={cx("shelve")} style={{ margin: "10px" }}>
        <Link to={`/book/${book?._id}`}>
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
              {isOpen ? editTags(type) : null}
            </div>
            <div>
              <span className={cx("delete")} onClick={handleDelete(type)}>
                <FaTrash />
              </span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    profile: state.login.profile,
    success: state.login.success,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postShelve: (email, id, type) =>
      dispatch(actions.postShelve(email, id, type)),
    deleteShelve: (id, bid, type) =>
      dispatch(actions.deleteShelve(id, bid, type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Book);
