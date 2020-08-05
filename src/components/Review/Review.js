import React, { useState, useCallback } from "react";
import style from "./Review.scss";
import classnames from "classnames/bind";
import moment from "moment";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { postReview, postLike } from "../../reducer/review";
import { check } from "../../reducer/login";
import { getAtk } from "../../utills";

const cx = classnames.bind(style);
const Review = () => {
  const [input, setInput] = useState("");
  const [more, setMore] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, profile: me } = useSelector((state) => state.login);
  const { reviews } = useSelector((state) => state.review);
  const { book } = useSelector((state) => state.books);
  const checkUser = useCallback(async () => {
    const atk = getAtk();
    if (atk) {
      try {
        dispatch(check(atk));
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch]);
  const handlePostReview = useCallback(
    async (content) => {
      const {
        user: { email },
      } = me;
      try {
        dispatch(postReview(book._id, email, content, book));
        checkUser();
      } catch (error) {
        console.log(error);
      }
    },
    [book, checkUser, dispatch, me]
  );
  const handleChange = useCallback((e) => {
    const { target } = e;
    setInput(target.value);
  }, []);
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (isLoggedIn) {
        if (input.length > 0) {
          handlePostReview(input);
          setInput("");
        }
      } else {
        alert("로그인이 필요합니다");
      }
    },
    [isLoggedIn, input, handlePostReview]
  );
  //like 관련 작업 수정 진행 필요
  const handlePostLike = useCallback(
    async (type, id, target) => {
      try {
        const {
          value: { status },
        } = await dispatch(postLike(type, id, me?.user?._id));
        if (status === 200) {
          target.style.fill = "pink";
          checkUser();
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, me, checkUser]
  );
  const handleLike = useCallback(
    (e) => {
      const { currentTarget, target } = e;
      const id = currentTarget.getAttribute("data-value");
      handlePostLike("like", id, target);
    },
    [handlePostLike]
  );
  const toggleMore = useCallback(() => {
    setMore((cur) => !cur);
  }, []);
  const textAreaResize = (e) => {
    const { target } = e;
    target.style.height = `40px`;
    target.style.height = `${target.scrollHeight}px`;
  };
  const reviewTag = (item) => {
    return (
      <article key={v4()} className={cx("review-item")}>
        <div>
          <Link to={item.reviewer ? `/profile/${item.reviewer._id}` : ""}>
            <img
              className={cx("user-img")}
              src={item.reviewer ? item.reviewer.avatarUrl : ""}
              alt={item.reviewer ? item.reviewer.avatarUrl : ""}
            />
            <span className={cx("user")}>
              {item.reviewer ? item.reviewer.email : ""}
            </span>
          </Link>
        </div>
        <span className={cx("date")}>
          {item.createdAt
            ? moment(item.createdAt).format(`YYYY년 MM월 DD일 HH:MM:SS`)
            : ""}
        </span>
        <article style={{ marginTop: "10px" }}>
          <p className={cx("user-review")}>
            {!more && item.content.length > 30
              ? `${item.content.substr(0, 30)}...`
              : item.content}
          </p>
          {item.content.length > 20 && (
            <p className={cx("more")} onClick={toggleMore}>
              {!more ? "더보기" : "줄이기"}
            </p>
          )}
        </article>
        <div className={cx("review-footer")}>
          <span
            className={cx("heart")}
            onClick={handleLike}
            data-value={item._id}
          >
            <FaHeart />
          </span>
          <span>{item.likes.length} 좋아요</span>
        </div>
      </article>
    );
  };
  return (
    <section className={cx("review")}>
      <p className={cx("review-title")}>리뷰</p>
      <section className={cx("form-container")}>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            value={input}
            onKeyDown={textAreaResize}
            onKeyUp={textAreaResize}
          />
          <input type="submit" value="등록" />
        </form>
      </section>
      <section className={cx("review-list-wrapper")}>
        {reviews
          ? reviews.map((item) => {
              return reviewTag(item);
            })
          : null}
      </section>
    </section>
  );
};
export default Review;
