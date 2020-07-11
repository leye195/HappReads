import React, { useState, useEffect, useCallback } from "react";
import { FaPlusCircle, FaStar, FaAngleDown } from "react-icons/fa";
import style from "./BookDetail.scss";
import classnames from "classnames/bind";
import { ChasingDots } from "better-react-spinkit";
import Select from "react-select";
import Rater from "../Rater";
import Review from "../Review";
import { useDispatch } from "react-redux";
import { postShelve } from "../../reducer/login";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { formatAuthors, getAvg } from "../../utills";
import Notice from "../Notice";
import RateAnalysis from "../RateAnalysis/RateAnalysis";

const cx = classnames.bind(style);
const options = [
  {
    value: "want_read",
    label: "읽기",
  },
  {
    value: "reading",
    label: "읽는중",
  },
  {
    value: "read",
    label: "읽음",
  },
];
const BookDetail = ({
  profile: user,
  votes,
  id,
  book,
  postVote,
  reviews,
  postShelveError,
  postShelveSuccess,
  isLoggedIn,
}) => {
  const [selected, setSelected] = useState({
    value: "want_read",
    label: "읽기",
  });
  const [status, setStatus] = useState("읽기");
  const dispatch = useDispatch();
  const getStatus = useCallback(() => {
    const { profile } = user;
    const { isbn } = id;
    if (profile) {
      if (this.checkStatus(profile.want_read, isbn)) {
        setSelected(options[0]);
        setStatus(options[0].label);
        return;
      }
      if (this.checkStatus(profile.reading, isbn)) {
        setSelected(options[1]);
        setStatus(options[1].label);
        return;
      }
      if (this.checkStatus(profile.read, isbn)) {
        setSelected(options[2]);
        setStatus(options[2].label);
        return;
      }
    }
  }, [id, user]);
  const checkStatus = (arr, isbn) => {
    if (arr.filter((item) => item.isbn === isbn).length > 0) return true;
    return false;
  };
  const checkUserVote = () => {
    const { profile } = user;
    let cur = "0";
    if (votes) {
      for (let i = 0; i < votes.length; i++) {
        if (votes[i]?._id === profile?._id) {
          cur = String(votes[i].vote);
          break;
        }
      }
    }
    return cur;
  };

  const handleOnClick = useCallback(() => {
    const { value } = selected;
    if (isLoggedIn) {
      const {
        user: { email },
      } = user;
      dispatch(postShelve(email, book._id, value));
    } else {
      alert("로그인이 필요한 서비스 입니다");
    }
  }, [dispatch, book, user, selected, isLoggedIn]);

  const handleRadio = (selected) => {
    setSelected(selected);
  };
  useEffect(() => {
    getStatus();
  }, [getStatus]);
  return (
    <>
      {book ? (
        <>
          {postShelveSuccess && (
            <Notice
              type={"success"}
            >{`${selected.label}목록에 추가됬습니다`}</Notice>
          )}
          {postShelveError && (
            <Notice type={"error"}>{`목록 추가에 실패했습니다`}</Notice>
          )}
          <section className={cx("book-detail")}>
            <section className={cx("book-rater-list")}>
              <ul>
                <li className={"star"}>
                  <FaStar />
                </li>
                {book &&
                  book.votes &&
                  book.votes.map((vote) => (
                    <li key={v4()} className={"book-rater"}>
                      <Link to={`/profile/${vote.voter._id}`}>
                        <img
                          src={vote.voter.avatarUrl}
                          alt={vote.voter.emails}
                        />
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
            <section className={cx("book-info-wrapper")}>
              <section className={cx("img-col")}>
                <img src={book.thumbnail} alt="geisha" />
              </section>
              <section className={cx("book-content")}>
                <h2 className={cx("title")}>{book.title}</h2>
                <p className={cx("author")}>
                  <strong>저자 </strong>
                  {formatAuthors(book.authors)}
                </p>
                <section className={cx("bookmeta")}>
                  <span className={cx("score")}>
                    <FaStar />
                    {getAvg(votes)}
                    <FaAngleDown className={cx("angle-down")} />
                  </span>
                  <span className={cx("rate-cnt")}>
                    {votes ? votes.length : 0} 평가
                  </span>
                  <span className={cx("review-cnt")}>
                    {reviews ? reviews.length : 0} 리뷰
                  </span>
                </section>
                <RateAnalysis votes={book.votes} />
                <section className={cx("discription")}>
                  <h5>책 소개</h5>
                  <p>
                    {book.contents !== undefined ? book.contents : "내용 없음"}
                  </p>
                </section>
                <div>
                  <div className={cx("rate-wrapper")}>
                    <span>책 평가하기</span>
                    <Rater
                      postVote={postVote}
                      book={book}
                      id={id}
                      votes={votes && votes.length > 0 ? checkUserVote() : "0"}
                    />
                  </div>
                  <div className={cx("add")}>
                    <Select
                      className={cx("select")}
                      options={options}
                      onChange={handleRadio}
                      value={selected}
                      isSearchable={false}
                      placeholder={status}
                    />
                    <button className={cx("want-read")} onClick={handleOnClick}>
                      <span>
                        <FaPlusCircle />
                      </span>
                      등록
                    </button>
                  </div>
                </div>
              </section>
            </section>
          </section>
          <Review />
        </>
      ) : (
        <ChasingDots color="white" size={60} />
      )}
    </>
  );
};
export default BookDetail;
