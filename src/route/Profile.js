import React, { Component, Fragment } from "react";
import UserProfile from "../components/UserProfile";
import { connect } from "react-redux";
import * as actions from "../reducer/user";

//import { Redirect } from "react-router";
class Profile extends Component {
  componentDidMount() {
    const {
      history: { location },
    } = this.props;
    if (location.pathname !== "/me") {
      const uid = location.pathname.substring(1).split("/")[1];
      this.getProfile(uid);
    }
  }

  getProfile = async (id) => {
    const { getProfile } = this.props;
    try {
      await getProfile(id);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      isLoggedIn,
      user,
      profile,
      history: { location },
    } = this.props;
    //console.log(this.props.history);
    console.log(profile);
    return (
      <Fragment>
        <UserProfile
          isLoggedIn={isLoggedIn}
          profile={location.pathname === "/me" ? profile?.user : user}
          from={location.pathname}
        />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    profile: state.login.profile,
    user: state.user.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (id) => dispatch(actions.getUser(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
