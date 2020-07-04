import React, { useState, useCallback } from "react";
import style from "./UserReview.scss";
import classnames from "classnames/bind";
import moment from "moment";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { postLike } from "../../reducer/review";
import { deleteReview } from "../../reducer/login";
import { FaHeart, FaTrash, FaEdit } from "react-icons/fa";
import ReviewModal from "../ReviewModal";
const cx = classnames.bind(style);
const UserReview = ({ profile }) => {
  const [review, setReview] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { profile: me, pending: userloading } = useSelector(
    (state) => state.login
  );
  const handleDelete = (e) => {
    const { currentTarget } = e;
    const bid = currentTarget.getAttribute("data-bid"),
      rid = currentTarget.getAttribute("data-value"),
      uid = me.user._id;
    handleDeleteReview(bid, rid, uid);
  };
  const handleDeleteReview = async (bid, rid, uid) => {
    try {
      dispatch(deleteReview(bid, rid, uid));
    } catch (error) {
      console.log(error);
    }
  };
  const handlePostLike = useCallback(
    (type, id) => {
      try {
        dispatch(postLike(type, id, profile._id, me.user._id));
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, me, profile]
  );
  const handleLike = useCallback(
    (e) => {
      const { currentTarget } = e;
      const id = currentTarget.getAttribute("data-value");
      handlePostLike("like", id);
    },
    [handlePostLike]
  );
  const handleEdit = useCallback(
    (review) => (e) => {
      const { currentTarget } = e;
      //console.log(currentTarget.getAttribute("data-value"));
      setIsOpen(true);
      setReview(review);
    },
    []
  );
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setReview(null);
  }, []);
  const getReview = (
    review,
    handleLike,
    handleDelete,
    handleEdit,
    mid, //
    uid //user.id
  ) => {
    return (
      <>
        <div className={cx("review-container")} id={review._id}>
          <div>
            <img
              src={review.book !== undefined ? review.book.thumbnail : ""}
              alt={review.book !== undefined ? review.book.title : ""}
            />
          </div>
          <div>
            <div>
              <p className={cx("review-book")}>
                {review.book !== undefined ? review.book.title : ""}
              </p>
              <p className={cx("review-text")}>
                {review.book !== undefined ? review.content : ""}
              </p>
              <p className={cx("review-date")}>
                {moment(review.createdAt).format("YYYY년 MM월 DD일 HH:MM:SS")}
              </p>
              <p
                className={cx("like-container")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <span className={cx("review-like")}>
                  {review.likes.length} likes
                </span>
                <span
                  className={cx("likebtn")}
                  onClick={handleLike}
                  data-value={review._id}
                >
                  <FaHeart />
                </span>
              </p>
            </div>
          </div>
          {uid === mid ? (
            <>
              <span
                className={cx("review-edit")}
                data-value={review._id}
                onClick={handleEdit(review)}
              >
                <FaEdit />
              </span>
              <span
                className={cx("review-remove")}
                data-value={review._id}
                data-bid={review.book._id}
                onClick={handleDelete}
              >
                <FaTrash />
              </span>
            </>
          ) : null}
        </div>
      </>
    );
  };
  return (
    <div className={cx("user-review")}>
      {userloading === false &&
        profile &&
        profile.reviews &&
        profile.reviews.map((review) => {
          return getReview(
            review,
            handleLike,
            handleDelete,
            handleEdit,
            me.user._id,
            profile._id
          );
        })}
      {isOpen && <ReviewModal review={review} handleClose={handleClose} />}
    </div>
  );
};
export default UserReview;
