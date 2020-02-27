import React, { Component } from "react";
import { FaFacebookSquare, FaGithubSquare } from "react-icons/fa";

import style from "./SocialLogin.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);
class SocialLogin extends Component {
  render() {
    const { type } = this.props;
    return (
      <div className={cx("social-login")}>
        <h2>
          {type === "login" ? "Login to HappReads" : "Sign up for HappReads"}
        </h2>
        <button className={cx("facebook", "button")}>
          <span className={cx("icon")}>
            <FaFacebookSquare />
          </span>
          Continue with Facebook
        </button>
        <button className={cx("github", "button")}>
          <span className={cx("icon")}>
            <FaGithubSquare />
          </span>
          Continue with Github
        </button>
      </div>
    );
  }
}

export default SocialLogin;
