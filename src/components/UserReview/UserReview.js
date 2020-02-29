import React, { Component } from "react";
import style from "./UserReview.scss";
import classnames from "classnames/bind";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../reducer/login";
const cx = classnames.bind(style);
class UserReview extends Component {
  handleLike = e => {
    const { target } = e;
    console.log(target);
    const id = target.getAttribute("data-value");
    const type = target.innerHTML;
    this.postLike(type, id);
  };
  postLike = async (type, id) => {
    const { me, postLike, profile } = this.props;
    try {
      await postLike(type, id, profile._id, me.profile._id);
    } catch (error) {
      console.log(error);
    }
  };
  getReview = (review, handleLike) => {
    return (
      <div className={cx("review-container")} id={review._id} key={review._id}>
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
            <p>
              <span className={cx("review-like")}>{review.likes} likes</span>
              <span> · </span>
              <span>
                <button onClick={handleLike} data-value={review._id}>
                  like
                </button>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const {
      profile: { reviews }
    } = this.props;
    return (
      <div className={cx("user-review")}>
        {reviews.map(review => {
          return this.getReview(review, this.handleLike);
        })}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    me: state.login.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postLike: (type, id, uid) => dispatch(actions.postLike(type, id, uid))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserReview);
