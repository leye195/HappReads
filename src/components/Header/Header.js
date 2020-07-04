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
  const [isMobile, setIsMobile] = useState(false);

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
  const checkSize = (e) => {
    const { innerWidth } = window;
    if (innerWidth >= 320 && innerWidth <= 425) {
      //console.log("isMobile");
      setIsMobile(true);
    } else {
      //console.log("not Mobile");
      setIsMobile(false);
    }
  };
  useEffect(() => {
    checkUser();
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, [checkUser]);

  const clickMenu = useCallback(() => {
    setShowMenu((cur) => !cur);
  }, [setShowMenu]);
  return (
    <header className={cx("header")}>
      <nav className={cx(["nav", isMobile && "mobile"])}>
        <div className={cx("title")}>
          <Link to={"/"}>
            <span className={cx("fr")}>Happ</span>
            <span className={cx("en")}>Reads</span>
          </Link>
        </div>
        <SearchBar getBooks={getBooks} />
        {isMobile && (
          <ul className={cx("mobile-menu-bar")} onClick={clickMenu}>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        )}
        {isMobile === false && (
          <div className={cx("menu-container")}>
            <div className={cx("community")}>
              <Link to={"/community/reviews"}>책 리뷰</Link>
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
                          <Link to="/me">프로필</Link>
                        </li>
                        <li>
                          <Link to="/upload">책 업로드</Link>
                        </li>
                        <li onClick={handleLogout}>로그아웃</li>
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
          </div>
        )}
      </nav>
      {isMobile && showMenu && (
        <ul className={cx("mobile-menu-container")} onClick={clickMenu}>
          {isLoggedIn ? (
            <>
              <li className={cx("mobile-menu-item")}>
                <Link to="/me">프로필</Link>
              </li>
              <li className={cx("mobile-menu-item")}>
                <Link to="/upload">책 업로드</Link>
              </li>
              <li className={cx("mobile-menu-item")}>
                <Link to={"/community/reviews"}>책 리뷰</Link>
              </li>
              <li className={cx("mobile-menu-item")} onClick={handleLogout}>
                로그아웃
              </li>
            </>
          ) : (
            <>
              <li className={cx("mobile-menu-item")}>
                <Link to={"/login"}>로그인</Link>
              </li>
              <li className={cx("mobile-menu-item")}>
                <Link to={"/signup"}>가입</Link>
              </li>
              <li className={cx("mobile-menu-item")}>
                <Link to={"/community/reviews"}>책 리뷰</Link>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
  );
};
export default Header;
