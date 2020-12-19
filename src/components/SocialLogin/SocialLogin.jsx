import React from "react";
import { FaGithubSquare } from "react-icons/fa";
import style from "./SocialLogin.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);
const SocialLogin = ({ type }) => {
  return (
    <div className={cx("social-login")}>
      <h2>{type === "login" ? "로그인" : "회원가입"}</h2>
      <button className={cx("github", "button")}>
        <span className={cx("icon")}>
          <FaGithubSquare />
        </span>
        <span>Github으로 시작하기</span>
      </button>
    </div>
  );
};

export default SocialLogin;
