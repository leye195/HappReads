import React, { Component, Fragment } from "react";
import style from "./Header.scss";
import { Link, Redirect } from "react-router-dom";
import classnames from "classnames/bind";
import SearchBar from "../SearchBar";
import { connect } from "react-redux";
import * as actions from "../../reducer/login";
const cx = classnames.bind(style);
const LinkContainer = (
  isLoggedIn,
  clickMenu,
  showMenu,
  requestLogOut,
  profile
) => {
  if (isLoggedIn) {
    return (
      <Fragment>
        <li>
          <span>
            <img
              src={profile.profile ? profile.profile.avatarUrl : ""}
              alt={"me"}
              onClick={clickMenu}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </span>
          {menu(showMenu, requestLogOut, isLoggedIn)}
        </li>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <li className={cx("login")}>
          <Link to={"/login"}>로그인</Link>
        </li>
        <li>
          <Link to={"/signup"}>가입</Link>
        </li>
      </Fragment>
    );
  }
};
const menu = (showMenu, requestLogOut, isLoggedIn) => {
  //console.log(showMenu);
  return (
    <div className={cx("menu", `${showMenu ? "show" : ""}`)}>
      <ul>
        <li>
          <Link to="/me">
            <p>프로필</p>
          </Link>
        </li>
        <li>
          <Link to="/upload">
            <p>책 업로드</p>
          </Link>
        </li>
        <li onClick={() => requestLogOut()}>
          <p>로그아웃</p>
        </li>
      </ul>
      <div className={cx("callout")}></div>
    </div>
  );
};
class Header extends Component {
  _isMounted = false;
  state = {
    showMenu: false,
    lastPos: window.pageYOffset,
    isLogOut: false
  };
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      //window.addEventListener("scroll", this.handleScroll);
    }
    this.checkUser();
  }
  componentWillUnmount() {
    this._isMounted = false;
    //window.removeEventListener("scroll", this.handleScroll);
  }

  checkUser = async () => {
    const atk = localStorage.getItem("atk");
    const { checkUser } = this.props;
    if (atk) {
      try {
        await checkUser(atk);
      } catch (error) {
        console.log(error);
      }
    }
  };
  requestLogOut = async () => {
    const { userLogOut } = this.props;
    try {
      const response = await userLogOut();
      const {
        value: { status }
      } = response;
      if (status === 200) {
        localStorage.removeItem("atk");
        this.setState({
          isLogOut: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  clickMenu = () => {
    const { showMenu } = this.state;
    this.setState({
      showMenu: !showMenu
    });
  };
  handleScroll = e => {
    let currentScrollPos = window.pageYOffset;
    const { lastPos } = this.state;
    if (e) {
      if (lastPos > currentScrollPos) {
        document.querySelector(".header").classList.remove("header-up");
      } else {
        document.querySelector(".header").classList.add("header-up");
      }
      this.setState({
        lastPos: currentScrollPos
      });
    }
  };
  render() {
    const { showMenu, isLogOut } = this.state;
    const { isLoggedIn, profile } = this.props;
    this.handleScroll();
    return (
      <div className={cx("header")}>
        <div className={cx("title")}>
          <Link to={"/"}>
            <span className={cx("fr")}>Happ</span>
            <span className={cx("en")}>Reads</span>
          </Link>
        </div>
        {<SearchBar />}
        <div className={cx("community")}>
          <Link to={"/community/reviews"}>커뮤니티</Link>
        </div>
        <div>
          <ul className={cx("ul")}>
            {LinkContainer(
              isLoggedIn,
              this.clickMenu,
              showMenu,
              this.requestLogOut,
              profile
            )}
          </ul>
        </div>
        {isLogOut && <Redirect to="/" />}
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
const mapDispatchToProps = dispatch => {
  return {
    checkUser: atk => dispatch(actions.check(atk)), //유저 로그인 상태 체크
    userLogOut: () => dispatch(actions.logout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
