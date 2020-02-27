import React, { Component } from "react";
//import Header from "../components/Header";
import UserEdit from "../components/UserEdit";
import { connect } from "react-redux";
class Edit extends Component {
  render() {
    const { history, profile } = this.props;
    return (
      <div>
        <UserEdit history={history} profile={profile} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    profile: state.login.profile
  };
};
export default connect(mapStateToProps)(Edit);
