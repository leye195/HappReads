import React, { useState, useCallback } from "react";
import {  NavLink, useLocation } from "react-router-dom";
import classnames from "classnames/bind";
import UserEdit from "../UserEdit";

import style from "./UserProfile.scss";

const cx = classnames.bind(style);

const UserProfile = ({ profile, from, children }) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleCancel = useCallback((e) => {
    e.preventDefault();
    setIsOpen(false);
  }, []);

  const OpenEdit = ({ isOpen, handleClose, profile }) => {
    return (
      <>
        <div
          className={cx("modal-overay", isOpen ? "open-modal" : "close-modal")}
        />
        <div className={cx(isOpen ? "open-modal" : "close-modal")}>
          <UserEdit
            handleClose={handleClose}
            profile={profile}
            isOpen={!isOpen}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <section className={cx("user-profile")}>
        <section className={cx("user-profile-wrapper")}>
          <div className={cx("profile-info")}>
            <img
              src={profile && profile.avatarUrl ? profile.avatarUrl : ""}
              alt={profile && profile.email ? profile.email : ""}
            />
            <h1>{profile && profile.email? profile.email : ""}</h1>
            <div className={cx("profile-edit")}>
              {from.includes("/me") ? (
                <p to={"/edit"} onClick={handleOpen}>
                  프로필 수정
                </p>
              ) : null}
            </div>
            <div className={cx("rate-review")}>
              <p>
                {profile && profile.votes ? profile.votes.length : 0}
                평가
              </p>
              <p>
                {profile && profile.reviews
                  ? profile.reviews.length
                  : 0}
                리뷰
              </p>
            </div>
            <p className={cx("intro")}>
              {profile && profile.intro }
            </p>
          </div>
        </section>
        <section>
          <ul className={cx("catalog-list")}>
            <li
              className={pathname.includes("/books") ? cx("active") : ""}
            >
              <NavLink to={`${pathname.startsWith("/me")?"/me/books":`/profile/${profile._id}/books`}`}>책</NavLink>
            </li>
            <li
              className={pathname.includes("/review") ? cx("active") : ""}
            >
              <NavLink to={`${pathname.startsWith("/me")?"/me/review":`/profile/${profile._id}/review`}`}>리뷰</NavLink>
            </li>
          </ul>
          {children}
        </section>
      </section>
      <OpenEdit isOpen={isOpen} handleClose={handleCancel} profile={profile} />
    </>
  );
};
export default UserProfile;
