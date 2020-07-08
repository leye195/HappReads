import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import BookList from "../BookList";
import style from "./UserProfile.scss";
import classnames from "classnames/bind";
import im from "../../img/1.jpg";
import UserEdit from "../UserEdit";
import UserReview from "../UserReview/UserReview";

const cx = classnames.bind(style);
const UserProfile = ({ profile, from }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [isMe, setIsMe] = useState(from === "/me");
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleSetIdx = useCallback(
    (number) => (e) => {
      setIdx(number);
    },
    []
  );
  useEffect(() => {
    setIsMe(from === "/me");
    return () => {};
  }, [from]);
  const getList = (from, profile, type) => {
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
  const openEdit = (isOpen, handleClose, profile) => {
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
        <section className={cx("profile-wrapper")}>
          <div className={cx("info")}>
            <img
              src={profile && profile !== undefined ? profile.avatarUrl : ""}
              alt={profile && profile !== undefined ? profile.email : ""}
            />
            <h1>{profile && profile !== undefined ? profile.email : ""}</h1>
            <div className={cx("profile-edit")}>
              {from === "/me" ? (
                <p to={"/edit"} onClick={handleOpen}>
                  프로필 수정
                </p>
              ) : null}
            </div>
            <div className={cx("rate-review")}>
              <p>
                {profile && profile !== undefined ? profile?.votes?.length : 0}
                평가
              </p>
              <p>
                {profile && profile !== undefined
                  ? profile?.reviews?.length
                  : 0}
                리뷰
              </p>
            </div>
            <p className={cx("intro")}>
              {profile && profile !== undefined ? profile?.intro : 0}
            </p>
          </div>
        </section>
        <section>
          <ul className={cx("catalog-list")}>
            <li
              className={idx === 0 ? cx("active") : ""}
              onClick={handleSetIdx(0)}
            >
              책
            </li>
            <li
              className={idx === 1 ? cx("active") : ""}
              onClick={handleSetIdx(1)}
            >
              리뷰
            </li>
          </ul>
          <section
            style={idx === 0 ? { display: "block" } : { display: "none" }}
          >
            <section className={cx("uploaded")}>
              <div className={cx("uploaded-head")}>
                {from === "/me" ? (
                  <Link
                    to={
                      profile && profile !== undefined
                        ? `shelve/${profile?._id}`
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
                style={{ marginLeft: "5px", marginTop: "5px" }}
              >
                {getList(from, profile, "uploaded")}
              </div>
            </section>
            <section className={cx("want-read")}>
              <div className={cx("want-read-head")}>
                {from === "/me" ? (
                  <h2>
                    읽을 책 (
                    {profile && profile !== undefined
                      ? profile?.want_read?.length
                      : 0}
                    )
                  </h2>
                ) : (
                  <h2>
                    읽을 책 (
                    {profile && profile !== undefined
                      ? profile?.want_read?.length
                      : 0}
                    )
                  </h2>
                )}
              </div>
              <div className={cx("want-read-body")}>
                {getList(from, profile, "want_read")}
              </div>
              <div></div>
            </section>
            <section className={cx("currently-reading")}>
              <div className={cx("currently-head")}>
                {from === "/me" ? (
                  <h2>
                    현재 읽고 있는 책 (
                    {profile && profile !== undefined
                      ? profile?.reading?.length
                      : 0}
                    )
                  </h2>
                ) : (
                  <h2>
                    현재 읽고 있는 책 (
                    {profile && profile !== undefined
                      ? profile?.reading?.length
                      : 0}
                    )
                  </h2>
                )}
              </div>
              <div className={cx("currently-body")}>
                {getList(from, profile, "reading")}
              </div>
            </section>
            <section className={cx("read")}>
              <div className={cx("read-head")}>
                {from === "/me" ? (
                  <h2>
                    읽은 책 (
                    {profile && profile !== undefined
                      ? profile?.read?.length
                      : 0}
                    )
                  </h2>
                ) : (
                  <h2>
                    읽은 책 (
                    {profile && profile !== undefined
                      ? profile?.read?.length
                      : 0}
                    )
                  </h2>
                )}
              </div>
              <div className={cx("read-body")}>
                {getList(from, profile, "read")}
              </div>
            </section>
          </section>
          <section
            style={idx === 1 ? { display: "block" } : { display: "none" }}
          >
            <section className={cx("recent-update")}>
              <div className={cx("recent-head")}>
                <h2>리뷰</h2>
              </div>
              <div className={cx("recent-body")}>
                {profile && profile !== undefined ? (
                  <UserReview key={v4()} profile={profile} isMe={isMe} />
                ) : (
                  "리뷰 없음"
                )}
              </div>
            </section>
          </section>
        </section>
      </section>
      {openEdit(isOpen, handleCancel, profile)}
    </>
  );
};
export default UserProfile;
