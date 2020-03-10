import React, { Component } from "react";
import classname from "classnames/bind";
import style from "./ReviewModal.scss";
import { connect } from "react-redux";
import * as userActions from "../../reducer/login";
import * as reviewActions from "../../reducer/review";

const cx = classname.bind(style);
class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.review.content
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
  editReview = async (rid, content) => {
    const { editReview, handleClose } = this.props;
    try {
      const {
        value: { status }
      } = await editReview(rid, content);
      if (status === 200) {
        this.checkUser();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const { content } = this.state;
    const {
      review: { _id: rid },
      profile
    } = this.props;
    if (profile !== {}) {
      this.editReview(rid, content);
    }
  };
  handleChange = e => {
    this.setState({
      content: e.target.value
    });
  };
  render() {
    const { review, handleClose } = this.props;
    const { content } = this.state;
    return (
      <div className={cx(["review-modal", "modal-container"])}>
        <div className="modal-overlay">
          <div className="modal">
            <div className={cx("form-container")}>
              <img
                src={review.book !== undefined ? review.book.thumbnail : ""}
                alt={review.book !== undefined ? review.book.title : ""}
              />
              <form onSubmit={this.handleSubmit}>
                <textarea value={content} onChange={this.handleChange}>
                  {content}
                </textarea>
                <input type="submit" value="수정" />
                <button className={cx("cancel")} onClick={handleClose}>
                  취소
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    profile: state.login.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    checkUser: atk => dispatch(userActions.check(atk)), //유저 로그인 상태 체크
    editReview: (rid, content) =>
      dispatch(reviewActions.editReview(rid, content))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewModal);
