import React, { useState, useCallback } from "react";
import style from "./SignUpForm.scss";
import classnames from "classnames/bind";
import SocialLogin from "../SocialLogin/SocialLogin";
const cx = classnames.bind(style);
const SignUpForm = ({ handleSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    p1: "",
    p2: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { p1, p2 } = password;
    if (p1 === p2) {
      handleSignUp(email, p1);
    }
  };
  const handleEmail = useCallback((e) => {
    const { target } = e;
    setEmail(target.value);
  }, []);
  const handlePassword1 = useCallback(
    (e) => {
      const { target } = e;
      setPassword({
        ...password,
        p1: target.value,
      });
    },
    [password]
  );
  const handlePassword2 = useCallback(
    (e) => {
      const { target } = e;
      setPassword({
        ...password,
        p2: target.value,
      });
    },
    [password]
  );
  return (
    <section className={cx("signup-form", "form-container")}>
      <SocialLogin type="signup" />
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
          value={password.p1}
          onChange={handlePassword1}
          placeholder="비밀번호"
          required
        />
        <input
          type="password"
          value={password.p2}
          onChange={handlePassword2}
          placeholder="비밀번호 재입력"
          required
        />
        <input type="submit" value="SignUp" />
      </form>
    </section>
  );
};

export default SignUpForm;
