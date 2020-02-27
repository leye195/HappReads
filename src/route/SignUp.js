import React, { Component, Fragment } from "react";
//import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
import { connect } from "react-redux";
import * as actions from "../reducer/signup";
import { Redirect } from "react-router";
class SignUp extends Component {
  handleSignUp = async (email, p) => {
    const { requestSignUp } = this.props;
    const res = await requestSignUp(email, p);
    if (res.value.status === 200) {
      this.props.history.push("/login");
    }
  };
  render() {
    const { history, isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <SignUpForm history={history} handleSignUp={this.handleSignUp} />
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    signup_error: state.signup.error,
    signup_pending: state.signup.pending,
    signup_success: state.signup.success,
    isLoggedIn: state.login.isLoggedIn
  };
};
const mapDispatchToProps = dispatch => {
  return {
    requestSignUp: (email, password) =>
      dispatch(actions.userSignup(email, password))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
