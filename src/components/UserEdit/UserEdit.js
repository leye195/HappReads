import React, { Component } from "react";
import style from "./UserEdit.scss";
import classnames from "classnames/bind";
import axios from "axios";
import { Link } from "react-router-dom";

const cx = classnames.bind(style);
class UserEdit extends Component {
  constructor(props) {
    super(props);
    const {
      profile: { profile }
    } = this.props;
    this.state = {
      seletedImg: null,
      nickname: profile ? profile.name : "",
      website: profile ? profile.website : "",
      intro: profile ? profile.intro : "",
      interest: profile ? profile.interest : ""
    };
  }

  submitEdit = async () => {
    const {
      seletedImg,
      email,
      nickname,
      website,
      interest,
      intro
    } = this.state;
    const {
      profile: { profile }
    } = this.props;
    const formData = new FormData();
    formData.append("avatar", seletedImg);
    formData.append("email", profile.email);
    formData.append("nickname", nickname);
    formData.append("website", website);
    formData.append("interest", interest);
    formData.append("intro", intro);
    try {
      await axios.post(`http://localhost:8080/edit`, formData);
      window.location.href = "/me";
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    this.submitEdit();
    //form data post 요청 진행
  };
  handleFile = e => {
    this.setState({
      seletedImg: e.target.files[0]
    });
  };
  handleNickName = val => {
    this.setState({
      nickname: val
    });
  };
  handleWebSite = val => {
    this.setState({
      website: val
    });
  };
  handleInterest = val => {
    this.setState({
      interest: val
    });
  };
  handleIntro = val => {
    this.setState({
      intro: val
    });
  };
  render() {
    const { nickname, website, intro, interest } = this.state;
    const { handleClose, isOpen } = this.props;
    return (
      <div className={cx("user-edit", isOpen ? "close" : "open")}>
        <div className={cx("x-button")}>
          <p onClick={handleClose}>
            <span role="img" aria-label="close">
              ❌
            </span>
          </p>
        </div>
        <div className={cx("form-container")}>
          <form onSubmit={this.handleSubmit}>
            <input
              type="file"
              name="avatar"
              onChange={e => this.handleFile(e)}
            />
            <input
              type="text"
              name="nickname"
              value={nickname}
              onChange={e => this.handleNickName(e.target.value)}
            />
            <input
              type="email"
              name="website"
              placeholder="웹 사이트 ex) http://www.example.com"
              value={website}
              onChange={e => this.handleWebSite(e.target.value)}
            />
            <input
              type="text"
              name="interest"
              placeholder="취미"
              value={interest}
              onChange={e => this.handleInterest(e.target.value)}
            />
            <textarea
              name="intro"
              placeholder="소개"
              value={intro}
              onChange={e => this.handleIntro(e.target.value)}
            />
            <input type="submit" value="수정" />
          </form>
          <button onClick={handleClose}>취소</button>
        </div>
      </div>
    );
  }
}

export default UserEdit;
