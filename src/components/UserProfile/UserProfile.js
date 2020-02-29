import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
//import { FaPlusCircle } from "react-icons/fa";
import BookList from "../BookList";
import style from "./UserProfile.scss";
import classnames from "classnames/bind";
import im from "../../img/1.jpg";
import UserEdit from "../UserEdit";
import UserReview from "../UserReview/UserReview";

const cx = classnames.bind(style);
const openEdit = (isOpen, handleClose, profile) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};
const getList = (from, profile, type) => {
  if (type !== "uploaded") {
    return from === "/me" ? (
      profile && profile.profile && profile.profile[type].length > 0 ? (
        <div>
          <BookList
            booklist={profile.profile[type]}
            from="profile"
            type={type}
          />
        </div>
      ) : (
        <p className={cx("recent-empty")}>최근 아무 활동도 없습니다.</p>
      )
    ) : profile && profile.user && profile.user[type].length > 0 ? (
      <div>
        <BookList booklist={profile.user[type]} from="profile" />
      </div>
    ) : (
      <p className={cx("recent-empty")}>최근 아무 활동도 없습니다.</p>
    );
  } else {
    return from === "/me" ? (
      profile && profile.profile && profile.profile.uploaded.length > 0 ? (
        <div className={cx("uploaded-list")}>
          {profile.profile.uploaded.map(book => {
            return (
              <div className={cx("uploaded-img-wrapper")} key={book._id}>
                <img
                  className={cx("uploaded-img")}
                  src={book.thumbnail}
                  alt={book.thumbnail}
                />
                <div className={cx("to-detail")}>
                  <Link to={`/book/${book.isbn}`}>{book.title}</Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className={cx("recent-empty")}>최근 아무 활동도 없습니다.</p>
      )
    ) : profile && profile.user && profile.user.uploaded.length > 0 ? (
      <div className={cx("uploaded-list")}>
        {profile.user.uploaded.map(book => {
          return (
            <div className={cx("uploaded-img-wrapper")} key={book._id}>
              <img
                className={cx("uploaded-img")}
                src={book.thumbnail}
                alt={book.thumbnail}
              />
              <div className={cx("to-detail")}>
                <Link to={`/book/${book.isbn}`}>상세 페이지</Link>
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
class UserProfile extends Component {
  state = {
    isOpen: false,
    idx: 0
  };
  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };
  handleCancel = () => {
    this.setState({
      isOpen: false
    });
  };
  render() {
    const { profile, from } = this.props;
    const { isOpen, idx } = this.state;
    return (
      <Fragment>
        <div className={cx("user-profile")}>
          <div className={cx("profile-wrapper")}>
            <div className={cx("info")}>
              <img
                src={
                  from === "/me"
                    ? profile && profile.profile !== undefined
                      ? profile.profile.avatarUrl
                      : ""
                    : profile && profile.user !== undefined
                    ? profile.user.avatarUrl
                    : ""
                }
                alt={im}
              />
              <h1>
                {from === "/me"
                  ? profile && profile.profile !== undefined
                    ? profile.profile.email
                    : ""
                  : profile && profile.user !== undefined
                  ? profile.user.email
                  : ""}
              </h1>
              <div className={cx("profile-edit")}>
                {from === "/me" ? (
                  <p to={"/edit"} onClick={this.handleOpen}>
                    프로필 수정
                  </p>
                ) : (
                  <div></div>
                )}
              </div>
              <div className={cx("rate-review")}>
                <p>
                  {from === "/me"
                    ? profile && profile.profile !== undefined
                      ? profile.profile.votes.length
                      : 0
                    : profile && profile.user !== undefined
                    ? profile.user.votes.length
                    : 0}{" "}
                  평가
                </p>
                <p>
                  {from === "/me"
                    ? profile && profile.profile !== undefined
                      ? profile.profile.reviews.length
                      : 0
                    : profile && profile.user !== undefined
                    ? profile.user.reviews.length
                    : 0}{" "}
                  리뷰
                </p>
              </div>
              <p className={cx("intro")}>
                {from === "/me"
                  ? profile && profile.profile !== undefined
                    ? profile.profile.intro
                    : 0
                  : profile && profile.user !== undefined
                  ? profile.user.intro
                  : 0}
              </p>
            </div>
          </div>
          <div>
            <ul className={cx("catalog-list")}>
              <li
                className={idx === 0 ? cx("active") : ""}
                onClick={() => this.setState({ idx: 0 })}
              >
                책
              </li>
              <li
                className={idx === 1 ? cx("active") : ""}
                onClick={() => this.setState({ idx: 1 })}
              >
                리뷰
              </li>
            </ul>
            <div style={idx === 0 ? { display: "block" } : { display: "none" }}>
              <div className={cx("uploaded")}>
                <div className={cx("uploaded-head")}>
                  <Link
                    to={
                      from === "/me"
                        ? profile && profile.profile !== undefined
                          ? `shelve/${profile.profile._id}`
                          : `/`
                        : profile && profile.user !== undefined
                        ? `shelve/${profile.user._id}`
                        : `/  `
                    }
                  >
                    <h2>업로드 한 책</h2>
                  </Link>
                </div>
                <div
                  className={cx("uploaded-body")}
                  style={{ marginLeft: "5px", marginTop: "5px" }}
                >
                  {getList(from, profile, "uploaded")}
                </div>
              </div>
              <div className={cx("want-read")}>
                <div className={cx("want-read-head")}>
                  <h2>
                    읽을 책 (
                    {from === "/me"
                      ? profile && profile.profile !== undefined
                        ? profile.profile.want_read.length
                        : 0
                      : profile && profile.user !== undefined
                      ? profile.user.want_read.length
                      : 0}
                    )
                  </h2>
                </div>
                <div className={cx("want-read-body")}>
                  {getList(from, profile, "want_read")}
                </div>
                <div></div>
              </div>
              <div className={cx("currently-reading")}>
                <div className={cx("currently-head")}>
                  <h2>
                    현재 읽고 있는 책 (
                    {from === "/me"
                      ? profile && profile.profile !== undefined
                        ? profile.profile.reading.length
                        : 0
                      : profile && profile.user !== undefined
                      ? profile.user.reading.length
                      : 0}
                    )
                  </h2>
                </div>
                <div className={cx("currently-body")}>
                  {getList(from, profile, "reading")}
                </div>
              </div>
              <div className={cx("read")}>
                <div className={cx("read-head")}>
                  <h2>
                    읽은 책 (
                    {from === "/me"
                      ? profile && profile.profile !== undefined
                        ? profile.profile.read.length
                        : 0
                      : profile && profile.user !== undefined
                      ? profile.user.read.length
                      : 0}
                    )
                  </h2>
                </div>
                <div className={cx("read-body")}>
                  {getList(from, profile, "read")}
                </div>
              </div>
            </div>
            <div style={idx === 1 ? { display: "block" } : { display: "none" }}>
              <div className={cx("recent-update")}>
                <div className={cx("recent-head")}>
                  <h2>리뷰</h2>
                </div>
                <div className={cx("recent-body")}>
                  {from === "/me" ? (
                    profile && profile.profile !== undefined ? (
                      <UserReview profile={profile.profile} />
                    ) : (
                      "리뷰 없음"
                    )
                  ) : profile && profile.user !== undefined ? (
                    <UserReview profile={profile.user} />
                  ) : (
                    "리뷰 없음"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {openEdit(isOpen, this.handleCancel, profile)}
      </Fragment>
    );
  }
}

export default UserProfile;
