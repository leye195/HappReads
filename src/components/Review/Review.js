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

const cx = classnames.bind(style);
const reviewTag = (item, handleLike) => {
  return (
    <section key={v4()}>
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
        <span className={cx("user-review")}>
          {item.content.length > 20
            ? `${item.content.substr(0, 20)}...`
            : item.content}
        </span>
      </article>
      <div className={cx("review-footer")}>
        <span
          className={cx("heart")}
          onClick={handleLike}
          data-value={item._id}
        >
          <FaHeart />
        </span>
        <span>{item.likes.length} likes</span>
        {item.content.length > 20 && (
          <>
            <span style={{ marginLeft: "5px", marginRight: "5px" }}>·</span>
            <span className={cx("more")}>더 보기</span>
          </>
        )}
      </div>
    </section>
  );
};
const Review = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, profile: me } = useSelector((state) => state.login);
  const { reviews } = useSelector((state) => state.review);
  const { book } = useSelector((state) => state.books);
  const checkUser = async () => {
    const atk = localStorage.getItem("atk");
    if (atk) {
      try {
        dispatch(check(atk));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handlePostReview = async (content) => {
    const {
      user: { email },
    } = me;
    try {
      dispatch(postReview(book._id, email, content, book));
      checkUser();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = useCallback((e) => {
    const { target } = e;
    setInput(target.value);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      handlePostReview(input);
      setInput("");
    } else {
      alert("로그인 필요한 서비스 입니다");
    }
  };
  //like 관련 작업 수정 진행 필요
  const handleLike = (e) => {
    const { currentTarget, target } = e;
    const id = currentTarget.getAttribute("data-value");
    handlePostLike("like", id, target);
  };
  const handlePostLike = async (type, id, target) => {
    try {
      const {
        value: { status },
      } = await dispatch(postLike(type, id, me?.user?._id));
      //console.log(response);
      if (status === 200) {
        target.style.fill = "pink";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={cx("review")}>
      <p>리뷰</p>
      <div>
        <div className={cx("form-container")}>
          <form onSubmit={handleSubmit}>
            <textarea onChange={handleChange} value={input} />
            <input type="submit" value="등록" />
          </form>
        </div>
        <div className={cx("review-list-wrapper")}>
          {reviews ? (
            reviews.map((item) => {
              return reviewTag(item, handleLike);
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Review;
