import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import style from "./LoginForm.scss";
import classnames from "classnames/bind";
import SocialLogin from "../SocialLogin/SocialLogin";
const cx = classnames.bind(style);
const LoginForm = ({ loginRequest, login_success, login_pending }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      loginRequest(email, password);
    },
    [email, password, loginRequest]
  );
  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handlePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  return (
    <>
      <div className={cx("login-form", "form-container")}>
        <SocialLogin type="login" />
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="이메일"
            required
          />
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="비밀번호"
            required
          />
          <input type="submit" value="로그인" />
        </form>
        <Link to="/signup">
          <button>가입</button>
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
