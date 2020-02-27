import React, { Component } from "react";
import style from "./EditProfile.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);
class EditProfile extends Component {
  render() {
    return <div className={cx("edit-profile")}></div>;
  }
}

export default EditProfile;
