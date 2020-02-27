import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import style from "./LoginForm.scss";
import classnames from "classnames/bind";
import SocialLogin from "../SocialLogin/SocialLogin";
const cx = classnames.bind(style);
class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { loginRequest } = this.props;
    loginRequest(email, password);
  };
  handleEmail = p => {
    this.setState({
      email: p
    });
  };
  handlePassword = p => {
    this.setState({
      password: p
    });
  };
  render() {
    const { email, password } = this.state;
    return (
      <Fragment>
        <div className={cx("login-form", "form-container")}>
          <SocialLogin type="login" />
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={e => this.handleEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={e => this.handlePassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input type="submit" value="Login" />
          </form>
          <Link to="/signup">
            <button>SignUp</button>
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default LoginForm;
