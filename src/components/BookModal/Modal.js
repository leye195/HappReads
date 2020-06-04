import React, { useState } from "react";
import classnames from "classnames/bind";
import style from "./Modal.scss";
const cx = classnames.bind(style);
const convertType = { 읽음: "read", 읽기: "want_read", 읽는중: "reading" };
const Modal = ({ handleCancel, handleTypeChange, handleEdit, item, type }) => {
  console.log(type);
  const [to, setTo] = useState(convertType[type]);
  const handleSelect = (e) => {
    const { target } = e;
    setTo(target.value);
  };
  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal">
        <p className={cx("exit")}>
          <span role="img" aria-label="cancel" onClick={handleCancel}>
            ❌
          </span>
        </p>
        {type !== undefined ? (
          <>
            <img src={item.thumbnail} alt={item.id} />
            <div className={cx("status-wrapper")}>
              <div className={cx("read-status")}>
                <span>현재 상태:</span>
                <p className={cx("current-status")}>{type}</p>
              </div>
              <select
                className={cx("select")}
                defaultValue={to}
                onChange={handleSelect}
              >
                <option value={"want_read"}>읽을 책</option>
                <option value={"reading"}>읽는중</option>
                <option value={"read"}>읽음</option>
              </select>
              <div className={cx("button-container")}>
                <button
                  className={cx("ok-btn")}
                  onClick={(e) => handleTypeChange(item, to)}
                >
                  수정
                </button>
                <button className={cx("cancel-btn")} onClick={handleCancel}>
                  취소
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={cx("book-info-container")}>
            <div className={cx("img-container")}>
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <form className={cx("book-info-form")}>
              <input value={item.title} placeholder="제목" />
              <input vlaue={item.genres} placeholder="장르" />
              <textarea value={item.contents} placeholder="요약" />
              <button className={"ok-btn"}>수정</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default Modal;
