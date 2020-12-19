import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import classnames from "classnames/bind";
import * as actions from "../../reducer/login";
import Modal from "../Modal";
import style from "./Book.scss";

const cx = classnames.bind(style);
const isMe = window.location.href.includes("/me");

const Book = (props) => {
  const { from, type } = props;
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
          <p className={cx("ser-author")}>{formatAuthors(book.authors)}</p>
          <p className={cx("ser-contents")}>
            {book && book.contents
              ? book.contents.length > 100
                ? `${book.contents.substr(0, 100)}...`
                : book.contents
              : "입력된 내용이 없습니다"}
          </p>
        </div>
      </li>
    );
  } else if (from === "profile") {
    const {
      book: { book },
    } = props;
    const handleDelete = (type) => () => {
      const {
        deleteShelve,
        book,
        profile: { user },
      } = props;
      deleteShelve(user._id, book._id, type);
    };
    const handleEdit = () => {
      setOpen((cur) => !cur);
    };

    return (
      <div className={cx("shelve")}>
        <Link to={`/book/${book?._id}`}>
          <p className={cx("title")}>{book?.title}</p>
        </Link>
        {isMe && (
          <div className={cx("setting-btns")}>
            <div className={cx("edit-container")}>
              <span className={cx("edit")} onClick={handleEdit}>
                <FaEdit />
              </span>
              {isOpen && <Modal type={type} item={book} handleCancel={handleEdit} />}
            </div>
            <div>
              <span className={cx("delete")} onClick={handleDelete(type)}>
                <FaTrash />
              </span>
            </div>
          </div>
        )}
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
