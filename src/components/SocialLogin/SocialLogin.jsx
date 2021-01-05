import React from "react";
import { FaGithubSquare } from "react-icons/fa";
import style from "./SocialLogin.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);
const SocialLogin = () => {
  return (
    <div className={cx("social-login")}>
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
