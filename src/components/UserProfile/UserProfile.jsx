import React, { useState, useCallback, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import classnames from "classnames/bind";
import BookList from "../BookList";
import UserEdit from "../UserEdit";
import UserReview from "../UserReview";

import style from "./UserProfile.scss";

const cx = classnames.bind(style);

const UserProfile = ({ profile, from, type }) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [isMe, setIsMe] = useState(from === "/me");

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleCancel = useCallback((e) => {
    e.preventDefault();
    setIsOpen(false);
  }, []);
  const handleSetIdx = useCallback(
    (number) => (e) => {
      setIdx(number);
    },
    []
  );
  useEffect(() => {
    if (type.includes("?type=reviews")) {
      setIdx(1);
    }
    setIsMe(from === "/me");
    return () => {};
  }, [from, type]);

  const UserBookList = ({ from, profile, type }) => {
    if (type !== "uploaded") {
      return from === "/me" ? (
        profile && profile[type]?.length > 0 ? (
          <div>
            <BookList booklist={profile[type]} from="profile" type={type} />
          </div>
        ) : (
          <p className={cx("recent-empty")}>최근 아무 활동도 없습니다.</p>
        )
      ) : profile && profile[type]?.length > 0 ? (
        <div>
          <BookList booklist={profile[type]} from="profile" />
        </div>
      ) : (
        <p className={cx("recent-empty")}>최근 아무 활동도 없습니다.</p>
      );
    } else {
      return from === "/me" ? (
        profile && profile?.uploaded?.length > 0 ? (
          <div className={cx("uploaded-list")}>
            {profile?.uploaded?.map((book) => {
              return (
                <div className={cx("uploaded-img-wrapper")} key={v4()}>
                  <img
                    className={cx("uploaded-img")}
                    src={book.thumbnail}
                    alt={book.thumbnail}
                  />
                  <div className={cx("to-detail")}>
                    <Link to={`/book/${book._id}`}>{book.title}</Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={cx("recent-empty")}>최근 아무 활동도 없습니다.</p>
        )
      ) : profile && profile?.uploaded?.length > 0 ? (
        <div className={cx("uploaded-list")}>
          {profile?.uploaded?.map((book) => {
            return (
              <div className={cx("uploaded-img-wrapper")} key={v4()}>
                <img
                  className={cx("uploaded-img")}
                  src={book.thumbnail}
                  alt={book.thumbnail}
                />
                <div className={cx("to-detail")}>
                  <Link to={`/book/${book._id}`}>상세 페이지</Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className={cx("recent-empty")}>최근 아무 활동도 없습니다.</p>
      );
    }
  };
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
              {from === "/me" ? (
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
              className={idx === 0 ? cx("active") : ""}
              onClick={handleSetIdx(0)}
            >
              <NavLink to={pathname}>책</NavLink>
            </li>
            <li
              className={idx === 1 ? cx("active") : ""}
              onClick={handleSetIdx(1)}
            >
              <NavLink to={`${pathname}?type=reviews`}>리뷰</NavLink>
            </li>
            <li 
               className={idx === 2 ? cx("active") : ""}
               onClick={handleSetIdx(2)}>
                <NavLink to={`${pathname}?type=note`}>독서 노트</NavLink>
            </li>
          </ul>
          {idx === 0 && (
            <section>
              <section className={cx("uploaded")}>
                <div className={cx("uploaded-head")}>
                  {from === "/me" ? (
                    <Link
                      to={
                        profile && profile._id
                          ? `shelve/${profile._id}`
                          : `/`
                      }
                    >
                      <h2>업로드 한 책</h2>
                    </Link>
                  ) : (
                    <h2>업로드 한 책</h2>
                  )}
                </div>
                <div
                  className={cx("uploaded-body")}
                >
                  <UserBookList
                    from={from}
                    profile={profile}
                    type={"uploaded"}
                  />
                </div>
              </section>
              <section className={cx("want-read")}>
                <div className={cx("want-read-head")}>
                  <h2>
                    읽을 책 (
                    {profile && profile.want_read
                      ? profile.want_read.length
                      : 0}
                    )
                  </h2>
                </div>
                <div className={cx("want-read-body")}>
                  <UserBookList
                    from={from}
                    profile={profile}
                    type={"want_read"}
                  />
                </div>
                <div></div>
              </section>
              <section className={cx("currently-reading")}>
                <div className={cx("currently-head")}>
                  <h2>
                    현재 읽고 있는 책 (
                    {profile && profile.reading
                      ? profile?.reading.length
                      : 0}
                    )
                  </h2>
                </div>
                <div className={cx("currently-body")}>
                  <UserBookList
                    from={from}
                    profile={profile}
                    type={"reading"}
                  />
                </div>
              </section>
              <section className={cx("read")}>
                <div className={cx("read-head")}>
                  <h2>
                    읽은 책 (
                    {profile && profile.read 
                      ? profile.read.length
                      : 0}
                    )
                  </h2>
                </div>
                <div className={cx("read-body")}>
                  <UserBookList from={from} profile={profile} type={"read"} />
                </div>
              </section>
            </section>
          )}
          {idx === 1 && (
            <section>
              <section className={cx("recent-update")}>
                <div className={cx("recent-head")}>
                  <h2>리뷰</h2>
                </div>
                <div className={cx("recent-body")}>
                  {profile && profile !== undefined ? (
                    <UserReview profile={profile} isMe={isMe} />
                  ) : (
                    "리뷰 없음"
                  )}
                </div>
              </section>
            </section>
          )}
        </section>
      </section>
      <OpenEdit isOpen={isOpen} handleClose={handleCancel} profile={profile} />
    </>
  );
};
export default UserProfile;
