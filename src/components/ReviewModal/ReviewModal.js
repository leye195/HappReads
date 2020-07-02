import React, { useState } from "react";
import classname from "classnames/bind";
import style from "./ReviewModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { check } from "../../reducer/login";
import { editReview } from "../../reducer/review";

const cx = classname.bind(style);
const ReviewModal = ({ review, handleClose }) => {
  const [content, setContent] = useState(review?.content || "");
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.login);

  const checkUser = async () => {
    const atk = localStorage.getItem("atk");
    if (atk) {
      try {
        dispatch(check(atk));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleEditReview = async (rid, content) => {
    try {
      const {
        value: { status },
      } = await dispatch(editReview(rid, content)); //await editReview(rid, content);
      if (status === 200) {
        checkUser();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { content } = this.state;
    const {
      review: { _id: rid },
      profile,
    } = this.props;
    if (profile !== {}) {
      handleEditReview(rid, content);
    }
  };
  const handleChange = (e) => {
    const { target } = e;
    setContent(target.value);
  };
  return (
    <div className={cx(["review-modal", "modal-container"])}>
      <div className="modal-overlay">
        <div className="modal">
          <div className={cx("form-container")}>
            <img
              src={review.book !== undefined ? review.book.thumbnail : ""}
              alt={review.book !== undefined ? review.book.title : ""}
            />
            <form onSubmit={handleSubmit}>
              <textarea value={content} onChange={handleChange}>
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
};
export default ReviewModal;
