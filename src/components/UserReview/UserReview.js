import React, { Component } from "react";
import style from "./UserReview.scss";
import classnames from "classnames/bind";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../reducer/login";
import { FaHeart, FaTrash } from "react-icons/fa";
const cx = classnames.bind(style);
class UserReview extends Component {
  handleLike = e => {
    const { currentTarget } = e;
    const id = currentTarget.getAttribute("data-value");
    this.postLike("like", id);
  };
  handleDelete = e => {
    const { currentTarget } = e;
    const bid = currentTarget.getAttribute("data-value");
    console.log(bid);
  };
  postLike = async (type, id) => {
    const { me, postLike, profile } = this.props;
    try {
      await postLike(type, id, profile._id, me.profile._id);
    } catch (error) {
      console.log(error);
    }
  };
  getReview = (review, handleLike, handleDelete) => {
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
            <p
              className={cx("like-container")}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px"
              }}
            >
              <span className={cx("review-like")}>{review.likes} likes</span>
              <span> · </span>
              <span
                className={cx("likebtn")}
                onClick={handleLike}
                data-value={review._id}
              >
                <FaHeart />
              </span>
            </p>
          </div>
        </div>
        <span
          className={cx("review-remove")}
          data-value={review._id}
          onClick={handleDelete}
        >
          <FaTrash />
        </span>
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
          return this.getReview(review, this.handleLike, this.handleDelete);
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
