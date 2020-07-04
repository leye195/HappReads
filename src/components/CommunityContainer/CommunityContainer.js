import React, { useState, useEffect, useCallback } from "react";
import classnames from "classnames/bind";
import style from "./CommunityContainer.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../reducer/review";
import moment from "moment";
import Loading from "../Loading";
const cx = classnames.bind(style);
const CommunityContainer = ({ path }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [more, setMore] = useState(false);
  const { reviews, loadReviewsPending } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const loadReviews = useCallback(async () => {
    try {
      dispatch(getReviews());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  const toggleMore = useCallback(() => {
    setMore((cur) => !cur);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    loadReviews();
    setIsLoading(false);
  }, [loadReviews]);
  const content = (path, info = []) => {
    if (path === "reviews") {
      return (
        <>
          {info.length === 0 && (
            <p style={{ textAlign: "center" }}>최근 리뷰가 없습니다.</p>
          )}
          {info.length > 0 &&
            info.map((review) => {
              return (
                <section
                  key={review && review._id}
                  className={cx(["card", "row"])}
                >
                  <section className={cx("first-col")}>
                    <Link
                      to={`/book/${review && review.book && review.book._id}`}
                    >
                      <img
                        src={review && review.book && review.book.thumbnail}
                        alt={review && review.book && review.book.title}
                      />
                    </Link>
                  </section>
                  <section className={cx("second-col")}>
                    <p className={cx("date")}>
                      {review &&
                        moment(review.createdAt).format("YYYY/MM/DD HH:MM:DD")}
                    </p>
                    <p className={cx("reviewer")}>
                      <Link to={`/profile/${review && review.reviewer._id}`}>
                        {review && review.reviewer.email.split("@")[0]}
                      </Link>
                    </p>
                    <h4 className={cx("title")}>
                      <Link
                        to={`/book/${review && review.book && review.book._id}`}
                      >
                        {review && review.book && review.book.title}
                      </Link>
                    </h4>
                    <section className={cx("content")}>
                      <img
                        src={
                          review && review.reviewer && review.reviewer.avatarUrl
                        }
                        alt={review && review.reviewer.email}
                      />
                      <article>
                        <p className={cx("content-text")}>
                          {more === false &&
                          review &&
                          review.content &&
                          review.content.length >= 50
                            ? `${review.content.substring(0, 50)}...`
                            : review.content}
                        </p>
                        {review &&
                        review.content &&
                        review.content.length >= 50 ? (
                          <p className={cx("more")} onClick={toggleMore}>
                            {more ? "줄이기" : "더보기"}
                          </p>
                        ) : null}
                      </article>
                    </section>
                  </section>
                </section>
              );
            })}
        </>
      );
    }
  };
  return isLoading || loadReviewsPending ? (
    <Loading />
  ) : (
    <section className={cx("community-container")}>
      {path === "reviews" && (
        <section className={cx("reviews")}>
          {content("reviews", reviews)}
        </section>
      )}
    </section>
  );
};
export default CommunityContainer;
