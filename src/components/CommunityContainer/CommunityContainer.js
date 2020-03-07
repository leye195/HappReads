import React, { Component, Fragment } from "react";
import classnames from "classnames/bind";
import style from "./CommunityContainer.scss";
import img1 from "../../img/1.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as reviewActions from "../../reducer/review";
import * as userActions from "../../reducer/user";
import moment from "moment";
const cx = classnames.bind(style);
const content = (path, info = [], handleType = null, type = null) => {
  if (path === "top-readers") {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
  if (path === "top-reviewers") {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
  if (path === "reviews") {
    return (
      <Fragment>
        {info.length === 0 && (
          <p style={{ textAlign: "center" }}>기록이 없습니다.</p>
        )}
        {info.length > 0 &&
          info.map(review => {
            return (
              <div key={review && review._id} className={cx(["card", "row"])}>
                <div className={cx("first-col")}>
                  <Link
                    to={`/book/${review && review.book && review.book.isbn}`}
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
                      to={`/book/${review && review.book && review.book.isbn}`}
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
      </Fragment>
    );
  }
};
class CommunityContainer extends Component {
  state = {
    type: 0
  };
  componentDidMount() {
    this.getReviews();
    this.getTopReaders();
    this.getTopReviewers();
  }
  getReviews = async () => {
    const { getReviews } = this.props;
    try {
      await getReviews();
    } catch (error) {
      console.log(error);
    }
  };
  getTopReaders = async (type = 0) => {
    const { getTopReaders } = this.props;
    try {
      await getTopReaders(type);
    } catch (error) {
      console.log(error);
    }
  };
  getTopReviewers = async (type = 0) => {
    const { getTopReviewers } = this.props;
    try {
      await getTopReviewers(type);
    } catch (error) {
      console.log(error);
    }
  };
  handleType = e => {
    const { target } = e;
    const value = target.getAttribute("data-value");
    const role = target.getAttribute("data-role");
    if (role === "reader") this.getTopReaders(value);
    if (role === "reviewer") this.getTopReviewers(value);
    this.setState({
      type: value
    });
  };
  render() {
    const { path, reviews, topReaders, topReviewers } = this.props;
    const { type } = this.state;
    return (
      <div className={cx("community-container")}>
        {path === "reviews" && (
          <div className={cx("reviews")}>{content("reviews", reviews)}</div>
        )}
        {path === "top-readers" && (
          <div>{content("top-readers", topReaders, this.handleType, type)}</div>
        )}
        {path === "top-reviewers" && (
          <div>
            {content("top-reviewers", topReviewers, this.handleType, type)}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    reviews: state.review.reviews,
    topReaders: state.user.topReaders,
    topReviewers: state.user.topReviewers
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getReviews: () => dispatch(reviewActions.getReviews()),
    getTopReaders: (type = 0) => dispatch(userActions.getTopReaders(type)),
    getTopReviewers: (type = 0) => dispatch(userActions.getTopReviewers(type))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommunityContainer);
