import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaBookReader,
  FaSignOutAlt,
  FaUpload,
  FaUserAlt,
  FaSignInAlt,
  FaUserPlus,
  FaSearch
} from "react-icons/fa";
import classnames from "classnames/bind";
import SearchBar from "../SearchBar";
import { check, logout } from "../../reducer/login";
import { getBooks } from "../../reducer/books";
import { getAtk } from "../../utills";

import style from "./Header.scss";

const cx = classnames.bind(style);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, profile } = useSelector((state) => state.login);
  
  const checkUser = useCallback(async () => {
    const atk = getAtk();
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
      window.location.href = "/";
    }
  }, [dispatch]);

  const checkSize = (e) => {
    const { innerWidth } = window;
    if (innerWidth < 768) {
      //console.log("isMobile");
      setIsMobile(true);
    } else {
      //console.log("not Mobile");
      setIsMobile(false);
    }
  };

  useEffect(()=>{
    checkUser();
  },[checkUser]);

  useEffect(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  const clickMenu = useCallback(() => {
    setShowMenu((cur) => !cur);
  }, [setShowMenu]);

  return (
    <header className={cx("header")}>
      <nav className={cx(["nav", isMobile && "mobile"])}>
        <div className={cx("nav-title")}>
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
          <div className={cx("nav-menu-container")}>
            <div className={cx("nav-menu-link")}>
              <Link to={"/search?p="}>
                <FaSearch />
                <p>도서</p>
              </Link>
              <Link to={"/community/reviews"}>
                <FaBookReader />
                <p>책 리뷰</p>
              </Link>
            </div>
            <ul className={cx("navbar-nav")}>
              {isLoggedIn ? (
                <>
                  <li>
                    <span>
                      <img
                        src={profile.user ? profile.user.avatarUrl : ""}
                        alt={"me"}
                        onClick={clickMenu}
                      />
                    </span>
                    <div className={cx("dropdown-menu", `${showMenu ? "show" : ""}`)}>
                      <ul>
                        <li className={cx("dropdown-item")}>
                          <Link to="/me/books">프로필</Link>
                        </li>
                        <li className={cx("dropdown-item")}>
                          <Link to="/upload">책 업로드</Link>
                        </li>
                        <li className={cx("dropdown-item")} onClick={handleLogout}>로그아웃</li>
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
                <Link to="/me/books">
                  <FaUserAlt /> 프로필
                </Link>
              </li>
              <li className={cx("mobile-menu-item")}>
                <Link to="/upload">
                  <FaUpload /> 책 업로드
                </Link>
              </li>
              <li className={cx("mobile-menu-item")}>
                <Link to={"/search?p="}>
                  <FaSearch /> 도서
                </Link>
              </li>
              <li className={cx("mobile-menu-item")}>
                <Link to={"/community/reviews"}>
                  <FaBookReader /> 책 리뷰
                </Link>
              </li>
              <li className={cx("mobile-menu-item")} onClick={handleLogout}>
                <FaSignOutAlt /> 로그아웃
              </li>
            </>
          ) : (
            <>
              <li className={cx("mobile-menu-item")}>
                <Link to={"/login"}>
                  <FaSignInAlt /> 로그인
                </Link>
              </li>
              <li className={cx("mobile-menu-item")}>
                <Link to={"/signup"}>
                  <FaUserPlus /> 가입
                </Link>
              </li>
              <li className={cx("mobile-menu-item")}>
                <Link to={"/community/reviews"}>
                  <FaBookReader /> 책 리뷰
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
  );
};
export default Header;
