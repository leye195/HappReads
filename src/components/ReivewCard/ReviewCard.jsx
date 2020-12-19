import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const ReviewCard = ({ review, handleLike }) => {
  const [more, setMore] = useState(false);
  const toggleMore = useCallback(() => {
    setMore((cur) => !cur);
  });
  useEffect(() => {}, []);
  return (
    <>
      <section key={v4()} className={"card row"}>
        <section className={"first-col"}>
          <Link to={`/book/${review && review.book && review.book._id}`}>
            <img
              src={review && review.book && review.book.thumbnail}
              alt={review && review.book && review.book.title}
            />
          </Link>
          <p className={"like"}>
            <FontAwesomeIcon className={"heart"} icon={faHeart} />{" "}
            {review && review.likes && review.likes.length} 좋아요
          </p>
        </section>
        <section className={"second-col"}>
          <p className={"date"}>
            {review && moment(review.createdAt).format("YYYY/MM/DD HH:MM:DD")}
          </p>
          <p className={"reviewer"}>
            <Link to={`/profile/${review && review.reviewer._id}`}>
              {review && review.reviewer.email.split("@")[0]}
            </Link>
          </p>
          <h4 className={"title"}>
            <Link to={`/book/${review && review.book && review.book._id}`}>
              {review && review.book && review.book.title}
            </Link>
          </h4>
          <section className={"content"}>
            <img
              src={review && review.reviewer && review.reviewer.avatarUrl}
              alt={review && review.reviewer.email}
            />
            <article>
              <p className={"content-text"}>
                {review &&
                review.content &&
                review.content.length >= 50 &&
                review._id &&
                more === false
                  ? `${review.content.substring(0, 50)}...`
                  : review.content}
              </p>
              {review && review.content && review.content.length >= 50 ? (
                <p className={"more"} onClick={toggleMore(review._id)}>
                  {more ? "줄이기" : "더보기"}
                </p>
              ) : null}
            </article>
          </section>
        </section>
      </section>
    </>
  );
};
export default ReviewCard;
