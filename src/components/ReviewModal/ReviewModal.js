import React, { useState, useCallback, useEffect } from "react";
import classname from "classnames/bind";
import style from "./ReviewModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { check } from "../../reducer/login";
import { editReview } from "../../reducer/review";
import { getAtk } from "../../utills";

const cx = classname.bind(style);
const ReviewModal = ({ review, handleClose }) => {
  const [content, setContent] = useState(review?.content || "");
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);

  const checkUser = useCallback(async () => {
    const atk = getAtk();
    if (atk) {
      try {
        dispatch(check(atk));
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch]);
  const handleEditReview = useCallback(
    async (rid, content) => {
      try {
        const {
          value: { status },
        } = await dispatch(editReview(rid, content)); //await editReview(rid, content);
        if (status === 200) {
          checkUser();
        }
      } catch (error) {
        console.log(error);
      }
    },
    [checkUser, dispatch]
  );
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (isLoggedIn) {
        handleEditReview(review._id, content);
      }
    },
    [content, isLoggedIn, review, handleEditReview]
  );
  const handleChange = (e) => {
    const { target } = e;
    setContent(target.value);
  };
  useEffect(() => {
    return () => {};
  });
  return (
    <section className={cx(["review-modal", "modal-container"])}>
      <section className="modal-overlay">
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
      </section>
    </section>
  );
};
export default ReviewModal;
