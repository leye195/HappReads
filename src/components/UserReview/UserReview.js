import React, { Component } from "react";
import style from "./UserReview.scss";
import classnames from "classnames/bind";
import moment from "moment";
const cx = classnames.bind(style);
const getReview = review => {
  //console.log();
  return (
    <div className={cx("review-container")} key={review._id}>
      <div>
        <img src={review.book.thumbnail} alt={review.book.title} />
      </div>
      <div>
        <div>
          <p className={cx("review-book")}>{review.book.title}</p>
          <p className={cx("review-text")}>{review.content}</p>
          <p className={cx("review-date")}>
            {moment(review.createdAt).format("YYYY년 MM월 DD일 HH:MM:SS")}
          </p>
          <p>
            <span className={cx("review-like")}>{review.likes} likes</span>
            <span> · </span>
            <span>
              <button>like</button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
class UserReview extends Component {
  render() {
    const {
      profile: { reviews }
    } = this.props;
    //console.log(reviews);
    return (
      <div className={cx("user-review")}>
        {reviews.map(review => {
          return getReview(review);
        })}
      </div>
    );
  }
}

export default UserReview;
