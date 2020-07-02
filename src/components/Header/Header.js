import React, { useEffect, useState, useCallback } from "react";
import style from "./Header.scss";
import { Link, Redirect } from "react-router-dom";
import classnames from "classnames/bind";
import SearchBar from "../SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { check, logout } from "../../reducer/login";
import { getBooks } from "../../reducer/books";

const cx = classnames.bind(style);
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, profile, logoutSuccess } = useSelector(
    (state) => state.login
  );
  const checkUser = useCallback(async () => {
    const atk = localStorage.getItem("atk");
    if (atk) {
      try {
        dispatch(check(atk));
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch]);
  const handleLogout = useCallback(async () => {
    const {
      value: { status },
    } = await dispatch(logout());
    if (status === 200) {
      localStorage.removeItem("atk");
      setIsLogOut(true);
      window.location.reload();
    }
  }, [dispatch]);
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const clickMenu = useCallback(() => {
    setShowMenu((cur) => !cur);
  }, [setShowMenu]);
  return (
    <header className={cx("header")}>
      <div className={cx("title")}>
        <Link to={"/"}>
          <span className={cx("fr")}>Happ</span>
          <span className={cx("en")}>Reads</span>
        </Link>
      </div>
      <SearchBar getBooks={getBooks} />
      <nav className={cx("nav")}>
        <div className={cx("community")}>
          <Link to={"/community/reviews"}>커뮤니티</Link>
        </div>
        <ul className={cx("ul")}>
          {isLoggedIn ? (
            <>
              <li>
                <span>
                  <img
                    src={profile.user ? profile.user.avatarUrl : ""}
                    alt={"me"}
                    onClick={clickMenu}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </span>
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
                    <li onClick={handleLogout}>
                      <p>로그아웃</p>
                    </li>
                  </ul>
                  <div className={cx("callout")}></div>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className={cx("login")}>
                <Link to={"/login"}>로그인</Link>
              </li>
              <li>
                <Link to={"/signup"}>가입</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {isLogOut && <Redirect to="/" />}
    </header>
  );
};
export default Header;
