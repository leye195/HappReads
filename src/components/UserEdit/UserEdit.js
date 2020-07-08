import React, { useState, useCallback } from "react";
import style from "./UserEdit.scss";
import classnames from "classnames/bind";
import { getAvartUrl } from "../../utills";
import { useDispatch } from "react-redux";
import dotenv from "dotenv";
import { editProfile } from "../../reducer/login";
dotenv.config();

const cx = classnames.bind(style);
const readURL = (file) => {
  const render = URL.createObjectURL(file);
  document.querySelector(".preview-img").src = render;
};
const UserEdit = ({ profile, isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState({
    seletedImg: null,
    avatarUrl: profile ? profile.avatarUrl : undefined,
    nickname: profile ? profile.name : "",
    website: profile ? profile.website : "",
    intro: profile ? profile.intro : "",
    interest: profile ? profile.interest : "",
  });

  const submitEdit = async () => {
    const { seletedImg, nickname, website, interest, intro } = content;
    const formData = new FormData();
    formData.append("avatar", seletedImg);
    formData.append("email", profile.email);
    formData.append("nickname", nickname);
    formData.append("website", website);
    formData.append("interest", interest);
    formData.append("intro", intro);
    try {
      const {
        value: { status },
      } = await dispatch(editProfile(formData));
      if (status === 200) {
        window.location.href = `${
          process.env.NODE_ENV === "development" ? "/me" : "/heapreads/me"
        }`;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitEdit();
  };
  const handleFile = useCallback(
    (e) => {
      const {
        target: { files },
      } = e;
      setContent({
        ...content,
        seletedImg: files[0],
      });
      readURL(files[0]);
    },
    [content, setContent]
  );
  const handleNickName = useCallback(
    (e) => {
      const { target } = e;
      setContent({
        ...content,
        nickname: target.value,
      });
    },
    [content, setContent]
  );
  const handleWebSite = useCallback(
    (e) => {
      const { target } = e;
      setContent({
        ...content,
        website: target.value,
      });
    },
    [content, setContent]
  );
  const handleInterest = useCallback(
    (e) => {
      const { target } = e;
      setContent({
        ...content,
        interest: target.value,
      });
    },
    [content, setContent]
  );
  const handleIntro = useCallback(
    (e) => {
      const { target } = e;
      setContent({
        ...content,
        intro: target.value,
      });
    },
    [content, setContent]
  );
  return (
    <section className={cx("user-edit", isOpen ? "close" : "open")}>
      <div className={cx("x-button")}>
        <p onClick={handleClose}>
          <span role="img" aria-label="close">
            ❌
          </span>
        </p>
      </div>
      <section className={cx("form-container")}>
        <form onSubmit={handleSubmit}>
          <div className={cx("upload-btn-wrapper")}>
            <img
              className={cx("preview-img")}
              alt="사용자 이미지"
              src={getAvartUrl(content?.avatarUrl)}
            />
            <div style={{ position: "relative" }}>
              <button className={cx("btn")}>
                {content?.seletedImg?.name === undefined
                  ? "이미지 업로드"
                  : content.seletedImg.name}
              </button>
              <input type="file" name="avatar" onChange={handleFile} />
            </div>
          </div>
          <input
            type="text"
            name="nickname"
            value={content?.nickname}
            placeholder={"닉네임"}
            onChange={handleNickName}
          />
          <input
            type="email"
            name="website"
            placeholder="웹 사이트 ex) http://www.example.com"
            value={content?.website}
            onChange={handleWebSite}
          />
          <input
            type="text"
            name="interest"
            placeholder="취미"
            value={content?.interest}
            onChange={handleInterest}
          />
          <textarea
            name="intro"
            placeholder="소개"
            value={content?.intro}
            onChange={handleIntro}
          />
          <input type="submit" value="수정" />
        </form>
        <button onClick={handleClose}>취소</button>
      </section>
    </section>
  );
};

export default UserEdit;
