import React, { useCallback } from "react";
import { FaStar } from "react-icons/fa";
import style from "./Rater.scss";
import classnames from "classnames/bind";
import { useSelector } from "react-redux";
const cx = classnames.bind(style);
const values = ["1", "2", "3", "4", "5"];
const starStyle = {
  color: "#f1c40f",
  cursor: "pointer",
};
const Rater = ({ book, postVote, votes }) => {
  const { isLoggedIn, profile } = useSelector((state) => state.login);
  const handleVote = useCallback(
    async (vote) => {
      const { _id } = book;
      const {
        user: { email },
      } = profile;
      await postVote(_id, email, vote);
    },
    [book, profile, postVote]
  );
  const handleOnClick = useCallback(
    (e) => {
      let currentItem = e.target;
      while (currentItem.nodeName !== "svg") {
        currentItem = currentItem.parentNode;
      }
      const rating = currentItem.dataset.rating;
      if (isLoggedIn) handleVote(rating);
      else alert("로그인 필요한 서비스 입니다");
    },
    [isLoggedIn, handleVote]
  );
  return (
    <div className={cx("rater")}>
      {values.map((value, idx) => {
        return (
          <FaStar
            key={idx}
            data-rating={idx + 1}
            onClick={handleOnClick}
            style={votes >= idx + 1 ? starStyle : {}}
          />
        );
      })}
    </div>
  );
};
export default Rater;
