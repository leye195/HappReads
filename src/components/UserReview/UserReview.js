import React, { useState, useCallback } from "react";
import style from "./UserReview.scss";
import classnames from "classnames/bind";
import moment from "moment";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { postLike } from "../../reducer/review";
import { deleteReview, check } from "../../reducer/login";
import { getUser } from "../../reducer/user";
import { FaHeart, FaTrash, FaEdit } from "react-icons/fa";
import ReviewModal from "../ReviewModal";
import { getAtk } from "../../utills";
import { Link } from "react-router-dom";
const cx = classnames.bind(style);
const UserReview = ({ profile, isMe }) => {
  const [review, setReview] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { profile: me, pending: userloading, isLoggedIn } = useSelector(
    (state) => state.login
  );
  const loadUser = useCallback(() => {
    if (isMe) {
      const atk = getAtk();
      if (atk) {
        dispatch(check(atk));
      }
    } else {
      dispatch(getUser(profile._id));
    }
  }, [dispatch, isMe, profile]);
  const handleDelete = (e) => {
    const { currentTarget } = e;
    const bid = currentTarget.getAttribute("data-bid"),
      rid = currentTarget.getAttribute("data-value"),
      uid = me.user._id;
    handleDeleteReview(bid, rid, uid);
  };
  const handleDeleteReview = async (bid, rid, uid) => {
    try {
      const {
        value: { status },
      } = await dispatch(deleteReview(bid, rid, uid));
      if (status === 200) {
        loadUser();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePostLike = useCallback(
    async (type, id) => {
      try {
        const {
          value: { status },
        } = await dispatch(postLike(type, id, profile._id, me.user._id));
        if (status === 200) {
          console.log(status);
          loadUser();
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, me, profile, loadUser]
  );
  const handleLike = useCallback(
    (id) => (e) => {
      if (isLoggedIn) {
        handlePostLike("like", id);
      } else {
        alert("로그인이 필요합니다");
      }
    },
    [handlePostLike, isLoggedIn]
  );
  const handleEdit = useCallback(
    (review) => (e) => {
      setIsOpen(true);
      setReview(review);
    },
    []
  );
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setReview(null);
  }, []);
  const Reviews = ({
    review,
    handleLike,
    handleDelete,
    handleEdit,
    mid, //
    uid, //user.id
  }) => {
    return (
      <section className={cx("review-container")} id={review._id} key={v4()}>
        <div>
          <Link to={`/book/${review.book?._id}`}>
            <img
              src={review.book !== undefined ? review.book.thumbnail : ""}
              alt={review.book !== undefined ? review.book.title : ""}
            />
          </Link>
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
            <p className={cx("like-container")}>
              <span className={cx("review-like")}>
                {review.likes.length} likes
              </span>
              <span className={cx("likebtn")} onClick={handleLike(review._id)}>
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
      </section>
    );
  };
  return (
    <div className={cx("user-review")}>
      {userloading === false &&
        profile &&
        profile.reviews &&
        profile.reviews.map((review) => (
          <Reviews
            key={v4()}
            review={review}
            handleLike={handleLike}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            mid={me.user._id}
            uid={profile._id}
          />
        ))}
      {isOpen && <ReviewModal review={review} handleClose={handleClose} />}
    </div>
  );
};
export default UserReview;
