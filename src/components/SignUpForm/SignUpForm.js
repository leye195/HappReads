import React, { Component, Fragment } from "react";
import style from "./SignUpForm.scss";
import classnames from "classnames/bind";
import SocialLogin from "../SocialLogin/SocialLogin";
const cx = classnames.bind(style);
class SignUpForm extends Component {
  state = {
    email: "",
    p1: "",
    p2: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, p1, p2 } = this.state;
    const { handleSignUp } = this.props;
    if (p1 === p2) {
      handleSignUp(email, p1);
    }
  };

  handleEmail = q => {
    this.setState({
      email: q
    });
  };
  handlePassword1 = q => {
    this.setState({
      p1: q
    });
  };
  handlePassword2 = q => {
    this.setState({
      p2: q
    });
  };
  render() {
    const { email, p1, p2 } = this.state;
    return (
      <Fragment>
        <div className={cx("signup-form", "form-container")}>
          <SocialLogin type="signup" />
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
              value={p1}
              onChange={e => this.handlePassword1(e.target.value)}
              placeholder="Password"
              required
            />
            <input
              type="password"
              value={p2}
              onChange={e => this.handlePassword2(e.target.value)}
              placeholder="Password Verify"
              required
            />
            <input type="submit" value="SignUp" />
          </form>
        </div>
      </Fragment>
    );
  }
}

export default SignUpForm;
