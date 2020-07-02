import React, { useState, useEffect, useCallback } from "react";
import classnames from "classnames/bind";
import style from "./CommunityContainer.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../reducer/review";
import { getTopReaders, getTopReviewers } from "../../reducer/user";
import moment from "moment";
const cx = classnames.bind(style);
const content = (path, info = [], handleType = null, type = null) => {
  if (path === "top-readers") {
    return (
      <>
        <div className={cx("range-container")}>
          <span data-value={0} data-role="reader" onClick={handleType}>
            전체
          </span>
          <span> | </span>
          <span data-value={1} data-role="reader" onClick={handleType}>
            이번 주
          </span>
          <span> | </span>
          <span data-value={2} data-role="reader" onClick={handleType}>
            이번 달
          </span>
        </div>
        <table className={cx("table")}>
          <tbody>
            {info.length === 0 && (
              <tr style={{ textAlign: "center", border: "none" }}>
                <p>기록이 없습니다.</p>
              </tr>
            )}
            {info.length >= 1 &&
              info.map((reader, idx) => {
                return (
                  <tr key={reader && reader._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <Link to={`/profile/${reader._id}`}>
                        <img
                          src={reader && reader.avatarUrl}
                          alt={reader && reader.avatarUrl}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/profile/${reader._id}`}>
                        <p>{reader && reader.email}</p>
                      </Link>
                      <p>책: {reader && reader.read.length} 권</p>
                    </td>
                    <td>
                      <p>
                        {parseInt(type) === 0 && <span>전체: </span>}
                        {parseInt(type) === 1 && <span>이번 주: </span>}
                        {parseInt(type) === 2 && <span>이번 달: </span>}
                        <span>{reader && reader.read.length} 권</span>
                      </p>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
  if (path === "top-reviewers") {
    return (
      <>
        <div className={cx("range-container")}>
          <span data-value={0} data-role="reviewer" onClick={handleType}>
            전체
          </span>
          <span> | </span>
          <span data-value={1} data-role="reviewer" onClick={handleType}>
            이번 주
          </span>
          <span> | </span>
          <span data-value={2} data-role="reviewer" onClick={handleType}>
            이번 달
          </span>
        </div>
        <table className={cx("table")}>
          <tbody>
            {info.length === 0 && (
              <tr style={{ textAlign: "center", border: "none" }}>
                <p>기록이 없습니다.</p>
              </tr>
            )}
            {info.length > 0 &&
              info.map((reviewer, idx) => {
                return (
                  <tr key={reviewer._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <img src={reviewer.avatarUrl} alt={reviewer.avatarUrl} />
                    </td>
                    <td>
                      <p>{reviewer.email}</p>
                      <p>{reviewer.reviews.length} 리뷰</p>
                    </td>
                    <td>
                      <p>
                        {parseInt(type) === 0 && <span>전체: </span>}
                        {parseInt(type) === 1 && <span>이번 주: </span>}
                        {parseInt(type) === 2 && <span>이번 달: </span>}
                        <span>{reviewer.reviews.length} 리뷰</span>
                      </p>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
  if (path === "reviews") {
    return (
      <>
        {info.length === 0 && (
          <p style={{ textAlign: "center" }}>기록이 없습니다.</p>
        )}
        {info.length > 0 &&
          info.map((review) => {
            return (
              <div key={review && review._id} className={cx(["card", "row"])}>
                <div className={cx("first-col")}>
                  <Link
                    to={`/book/${review && review.book && review.book._id}`}
                  >
                    <img
                      src={review && review.book && review.book.thumbnail}
                      alt={review && review.book && review.book.title}
                    />
                  </Link>
                </div>
                <div className={cx("second-col")}>
                  <p className={cx("date")}>
                    {review &&
                      moment(review.createdAt).format("YYYY/MM/DD HH:MM:DD")}
                  </p>
                  <p className={cx("reviewer")}>
                    <Link to={`/profile/${review && review.reviewer._id}`}>
                      {review && review.reviewer.email}
                    </Link>
                  </p>
                  <h4 className={cx("title")}>
                    <Link
                      to={`/book/${review && review.book && review.book._id}`}
                    >
                      {review && review.book && review.book.title}
                    </Link>
                  </h4>
                  <div className={cx("content")}>
                    <img
                      src={
                        review && review.reviewer && review.reviewer.avatarUrl
                      }
                      alt={review && review.reviewer.email}
                    />
                    <p>{review && review.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  }
};
const CommunityContainer = ({ path }) => {
  const [type, setType] = useState(0);
  const { reviews } = useSelector((state) => state.review);
  const { topReaders, topReviewers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const loadReviews = useCallback(async () => {
    try {
      dispatch(getReviews());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  const loadTopReaders = useCallback(
    async (type = 0) => {
      try {
        dispatch(getTopReaders(type));
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );
  const loadTopReviewers = useCallback(
    async (type = 0) => {
      try {
        dispatch(getTopReviewers(type));
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );
  const handleType = (e) => {
    const { target } = e;
    const value = target.getAttribute("data-value"),
      role = target.getAttribute("data-role");
    if (role === "reader") loadTopReaders(value);
    else if (role === "reviewer") loadTopReviewers(type);
    setType(value);
  };
  useEffect(() => {
    loadReviews();
    loadTopReaders(type);
    loadTopReviewers(type);
  }, [loadTopReviewers, loadTopReaders, loadReviews, type]);
  return (
    <div className={cx("community-container")}>
      {path === "reviews" && (
        <div className={cx("reviews")}>{content("reviews", reviews)}</div>
      )}
      {path === "top-readers" && (
        <div>{content("top-readers", topReaders, handleType, type)}</div>
      )}
      {path === "top-reviewers" && (
        <div>{content("top-reviewers", topReviewers, handleType, type)}</div>
      )}
    </div>
  );
};
export default CommunityContainer;
