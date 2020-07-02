import React from "react";
import LoginForm from "../../components/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reducer/login";
import { Redirect } from "react-router";
import Notice from "../../components/Notice";
const Login = () => {
  const { isLoggedIn, loginPending, loginSuccess, loginError } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  const saveATK = (t) => {
    localStorage.setItem("atk", t);
  };
  const handleLogin = async (email, password) => {
    //const { loginRequest } = this.props;
    try {
      const {
        value: { data, status },
      } = await dispatch(login(email, password));
      if (status === 200) {
        saveATK(data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoggedIn === true) {
    return <Redirect to="/" />;
  }
  return (
    <>
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
