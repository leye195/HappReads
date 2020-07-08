import React from "react";
import SignUpForm from "../../components/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../reducer/signup";
import { Redirect } from "react-router";
import Helmet from "../../components/Helmet";
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
    return <Redirect to="/" />;
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
