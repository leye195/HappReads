import React from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import SignUpForm from "../../components/User/SignUpForm";
import { userSignup } from "../../reducer/signup";
import Helmet from "../../components/Helmet";
import dotenv from "dotenv";

dotenv.config();

const SignUp = ({ history }) => {
  const dispatch = useDispatch();
  const { signup_pending, signup_success, signup_error } = useSelector(
    (state) => state.signup
  );
  const { isLoggedIn } = useSelector((state) => state.login);
  const handleSignUp = async (email, p) => {
    dispatch(userSignup(email, p));
  };
  if (isLoggedIn) {
    return (
      <Redirect
        to={process.env.NODE_ENV === "development" ? "/" : "/HappReads-front"}
      />
    );
  }
  if (signup_success) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Helmet title={`SignUp | HappReads`} />
      <SignUpForm
        history={history}
        handleSignUp={handleSignUp}
        signup_pending={signup_pending}
        signup_success={signup_success}
        signup_error={signup_error}
      />
    </>
  );
};
export default SignUp;
