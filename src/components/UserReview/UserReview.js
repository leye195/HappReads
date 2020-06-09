import React, { Component, Fragment } from "react";
import style from "./UserReview.scss";
import classnames from "classnames/bind";
import moment from "moment";
import { v4 } from "uuid";
import { connect } from "react-redux";
import * as reviewActions from "../../reducer/review";
import * as loginActions from "../../reducer/login";
import { FaHeart, FaTrash, FaEdit } from "react-icons/fa";
import ReviewModal from "../ReviewModal";
const cx = classnames.bind(style);
class UserReview extends Component {
  state = {
    review: null,
    isOpen: false,
  };
  handleLike = (e) => {
    const { currentTarget } = e;
    const id = currentTarget.getAttribute("data-value");
    this.postLike("like", id);
  };
  handleEdit = (currentTarget, review) => {
    //console.log(currentTarget.getAttribute("data-value"));
    this.setState({
      isOpen: true,
      review,
    });
  };
  handleClose = () => {
    this.setState({
      isOpen: false,
      review: null,
    });
  };
  handleDelete = (e) => {
    const { me } = this.props;
    const { currentTarget } = e;
    const bid = currentTarget.getAttribute("data-bid"),
      rid = currentTarget.getAttribute("data-value"),
      uid = me.user._id;
    //console.log(bid, rid, uid);
    this.deleteReview(bid, rid, uid);
  };
  deleteReview = async (bid, rid, uid) => {
    const { deleteReview } = this.props;
    try {
      await deleteReview(bid, rid, uid);
    } catch (error) {
      console.log(error);
    }
  };
  postLike = async (type, id) => {
    const { me, postLike, profile } = this.props;
    try {
      await postLike(type, id, profile._id, me.user._id);
    } catch (error) {
      console.log(error);
    }
  };
  getReview = (review, handleLike, handleDelete, handleEdit, mid, uid) => {
    return (
      <Fragment key={v4()}>
        <div className={cx("review-container")} id={review._id}>
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
                  marginTop: "5px",
                }}
              >
                <span className={cx("review-like")}>
                  {review.likes.length} likes
                </span>
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
          {uid === mid ? (
            <>
              <span
                className={cx("review-edit")}
                data-value={review._id}
                onClick={(e) => handleEdit(e.currentTarget, review)}
              >
                <FaEdit />
              </span>
              <span
                className={cx("review-remove")}
                data-value={review._id}
                data-bid={review.book._id}
                onClick={handleDelete}
              >
                <FaTrash />
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
      </Fragment>
    );
  };
  render() {
    const { profile, me, userloading } = this.props;
    const { isOpen, review } = this.state;
    return (
      <div className={cx("user-review")}>
        {userloading === false &&
          profile &&
          profile.reviews &&
          profile.reviews.map((review) => {
            return this.getReview(
              review,
              this.handleLike,
              this.handleDelete,
              this.handleEdit,
              me.user._id,
              profile._id
            );
          })}
        {isOpen && (
          <ReviewModal review={review} handleClose={this.handleClose} />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    me: state.login.profile,
    userloading: state.login.pending,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postLike: (type, id, uid) =>
      dispatch(reviewActions.postLike(type, id, uid)),
    deleteReview: (bid, rid, uid) =>
      dispatch(loginActions.deleteReview(bid, rid, uid)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserReview);
