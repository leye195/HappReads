import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {v4} from "uuid";
import { getUser } from "../../reducer/user";
import BookList from "../../components/BookList";
import Loading from "../../components/Loading";
import cx from 'classnames';

const UserBookList = ({ from, profile, type }) => {
  if (type !== "uploaded") {
    return from.includes("/me") ? (
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
    return from.includes("/me") ? (
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

const Profile = ({ history: { location },from, profile }) => {
  const [loading, setIsLoading] = useState(true);
  const { pending } = useSelector((state) => state.login);
  const {  pending: userPending } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const getProfile = useCallback(
    async (id) => {
      try {
        dispatch(getUser(id));
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    setIsLoading(true);
    if (location.pathname.includes("/me")) {
      const uid = location.pathname.substring(1).split("/")[1];
      getProfile(uid);
    }
    setIsLoading(false);
  }, [getProfile, location.pathname]);

  return (
    <>
      {loading || pending || userPending ? (
        <Loading />
      ) : (
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
                  : 0})
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
                  : 0})
              </h2>
            </div>
            <div className={cx("read-body")}>
              <UserBookList from={from} profile={profile} type={"read"} />
            </div>
          </section>
        </section>
      )}
    </>
  );
};
export default Profile;
