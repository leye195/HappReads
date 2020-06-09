import React, { Component, Fragment } from "react";
import style from "./Review.scss";
import classnames from "classnames/bind";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaHeart } from "react-icons/fa";
import * as reviewActions from "../../reducer/review";
import * as loginActions from "../../reducer/login";

const cx = classnames.bind(style);
const reviewTag = (item, idx, handleLike) => {
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
            ? moment(item.createdAt).format(`YYYY년 MM월 DD일 HH:MM:SS`)
            : ""}
        </span>
        <div style={{ marginTop: "10px" }}>
          <span className={cx("user-review")}>
            {item.content.length > 20
              ? `${item.content.substr(0, 20)}...`
              : item.content}
          </span>
        </div>
        <div className={cx("review-footer")}>
          <span
            className={cx("heart")}
            onClick={handleLike}
            data-value={item._id}
          >
            <FaHeart />
          </span>
          <span>{item.likes.length} likes</span>
          {item.content.length > 20 && (
            <>
              <span style={{ marginLeft: "5px", marginRight: "5px" }}>·</span>
              <span className={cx("more")}>더 보기</span>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }
  checkUser = async () => {
    const atk = localStorage.getItem("atk");
    const { checkUser } = this.props;
    if (atk) {
      try {
        await checkUser(atk);
      } catch (error) {
        console.log(error);
      }
    }
  };
  postReview = async (content) => {
    console.log(this.props.me);
    const {
      me: {
        user: { email },
      },
      postReview,
      book,
    } = this.props;
    try {
      await postReview(book._id, email, content, book);
      await this.checkUser();
    } catch (error) {
      console.log(error);
    }
  };
  handleChange = (input) => {
    this.setState({
      input: input,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { isLoggedIn } = this.props;
    const { input } = this.state;
    if (isLoggedIn) {
      this.postReview(input);
      this.setState({
        input: "",
      });
    } else {
      alert("Please Login");
    }
  };
  //like 관련 작업 수정 진행 필요
  handleLike = (e) => {
    const { currentTarget, target } = e;
    console.log(currentTarget);
    const id = currentTarget.getAttribute("data-value");
    this.postLike("like", id, target);
  };
  postLike = async (type, id, target) => {
    const { me, postLike } = this.props;
    try {
      const {
        value: { status },
      } = await postLike(type, id, me?.user?._id);
      //console.log(response);
      if (status === 200) {
        target.style.fill = "pink";
      }
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
                onChange={(e) => this.handleChange(e.target.value)}
                value={input}
              />
              <input type="submit" value="등록" />
            </form>
          </div>
          <div className={cx("review-list-wrapper")}>
            {reviews ? (
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
const mapStateToProps = (state) => {
  return {
    pending: state.review.pending,
    error: state.review.error,
    success: state.review.success,
    isLoggedIn: state.login.isLoggedIn,
    me: state.login.profile,
    reviews: state.review.reviews,
    book: state.books.book,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postReview: (isbn, name, content, book) =>
      dispatch(reviewActions.postReview(isbn, name, content, book)),
    postLike: (type, id, uid) =>
      dispatch(reviewActions.postLike(type, id, uid)),
    checkUser: (atk) => dispatch(loginActions.check(atk)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Review);
