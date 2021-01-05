import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";

import Helmet from "../../components/Helmet";
import LoginForm from "../../components/User/LoginForm";
import Notice from "../../components/Notice";

import { login } from "../../reducer/login";

const Login = () => {
  const { isLoggedIn, loginPending, loginSuccess, loginError } = useSelector(
    (state) => state.login
  );

  const dispatch = useDispatch();

  const handleLogin = async (email, password) => {
    try {
      await dispatch(login(email, password));
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoggedIn === true) {
    return <Redirect to={"/"} />;
  }
  return (
    <>
      <Helmet title={`Login | HappReads`} />
      {loginError && (
        <Notice type={"error"}>
          등록되지 않은 이메일 혹은 비밀번호가 틀렸습니다
        </Notice>
      )}
      <LoginForm
        loginRequest={handleLogin}
        login_pending={loginPending}
        login_success={loginSuccess}
      />
    </>
  );
};
export default Login;
