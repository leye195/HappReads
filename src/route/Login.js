import React, { Component, Fragment } from "react";
import LoginForm from "../components/LoginForm";
//import Header from "../components/Header";
import { connect } from "react-redux";
import * as actions from "../reducer/login";
import { Redirect } from "react-router";
class Login extends Component {
  state = {
    isLoggedIn: false
  };
  saveATK = t => {
    localStorage.setItem("atk", t);
  };
  handleLogin = async (email, password) => {
    const { loginRequest } = this.props;
    try {
      const response = await loginRequest(email, password);
      const {
        value: { data, status }
      } = response;
      if (status === 200) {
        this.saveATK(data.token);
        this.setState({
          isLoggedIn: true
        });
        //window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { isLoggedIn } = this.state;
    if (isLoggedIn === true) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <LoginForm loginRequest={this.handleLogin} />
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    login_error: state.login.error,
    login_pending: state.login.pending,
    login_success: state.login.success,
    isLoggedIn: state.login.isLoggedIn,
    profile: state.login.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginRequest: (email, password) => dispatch(actions.login(email, password))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
