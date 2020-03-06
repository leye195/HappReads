import React, { Component, Fragment } from "react";
import style from "./Review.scss";
import classnames from "classnames/bind";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaHeart } from "react-icons/fa";
import * as actions from "../../reducer/review";
import * as loginActions from "../../reducer/login";

const cx = classnames.bind(style);
const reviewTag = (item, idx, handleLike) => {
  console.log(item);
  return (
    <Fragment key={idx}>
      <div>
        <div>
          <Link to={item.reviewer ? `/profile/${item.reviewer._id}` : ""}>
            <img
              className={cx("user-img")}
              src={item.reviewer ? item.reviewer.avatarUrl : ""}
              alt={item.reviewer ? item.reviewer.avatarUrl : ""}
            />
            <span className={cx("user")}>
              {item.reviewer ? item.reviewer.email : ""}
            </span>
          </Link>
        </div>
        <span className={cx("date")}>
          {item.createdAt
            ? moment(item.createdAt).format(`MMMM MM월 DD일 HH:MM:SS`)
            : ""}
        </span>
        <div style={{ marginTop: "10px" }}>
          <span className={cx("user-review")}>{item.content}</span>
        </div>
        <div className={cx("review-footer")}>
          <span>{item.likes} likes</span>
          <span style={{ marginLeft: "5px", marginRight: "5px" }}>·</span>
          <span
            className={cx("heart")}
            onClick={handleLike}
            data-value={item._id}
          >
            <FaHeart />
          </span>
          <span style={{ marginLeft: "5px", marginRight: "5px" }}>·</span>
          <span className={cx("more")}>see more</span>
        </div>
      </div>
    </Fragment>
  );
};
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }
  componentDidMount() {
    this.getReview();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.reviews &&
      prevProps.reviews &&
      this.props.reviews.length !== prevProps.reviews.length
    )
      this.getReview();
  }
  getReview = async () => {
    const { id, getReviews } = this.props;
    try {
      await getReviews(id);
    } catch (error) {
      console.log(error);
    }
  };
  postReview = async content => {
    const {
      profile: {
        profile: { email }
      },
      postReview,
      books: book
    } = this.props;
    const id = window.location.pathname.substring(1).split("/")[1];
    try {
      await postReview(id, email, content, book[0]);
    } catch (error) {
      console.log(error);
    }
  };
  handleChange = input => {
    this.setState({
      input: input
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { isLoggedIn } = this.props;
    const { input } = this.state;
    if (isLoggedIn) {
      this.postReview(input);
      this.setState({
        input: ""
      });
    } else {
      alert("Please Login");
    }
  };
  handleLike = e => {
    const { currentTarget } = e;
    const id = currentTarget.getAttribute("data-value");
    this.postLike("like", id);
  };
  postLike = async (type, id) => {
    const { me, postLike, profile } = this.props;
    try {
      await postLike(type, id, profile._id, me.profile._id);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { input } = this.state;
    const { reviews } = this.props;
    return (
      <div className={cx("review")}>
        <p>리뷰</p>
        <div>
          <div className={cx("form-container")}>
            <form onSubmit={this.handleSubmit}>
              <textarea
                onChange={e => this.handleChange(e.target.value)}
                value={input}
              />
              <input type="submit" value="등록" />
            </form>
          </div>
          <div className={cx("review-list-wrapper")}>
            {reviews !== undefined ? (
              reviews.map((item, idx) => {
                return reviewTag(item, idx, this.handleLike);
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    pending: state.review.pending,
    error: state.review.error,
    success: state.review.success,
    isLoggedIn: state.login.isLoggedIn,
    profile: state.login.profile,
    reviews: state.review.reviews,
    books: state.books.books
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postReview: (isbn, name, content, book) =>
      dispatch(actions.postReview(isbn, name, content, book)),
    getReviews: isbn => dispatch(actions.getReview(isbn)),
    postLike: (type, id, uid) => dispatch(loginActions.postLike(type, id, uid))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Review);
