import React, { useState, useEffect, useCallback } from "react";
import style from "./BookShelve.scss";
import classnames from "classnames/bind";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../reducer/user";
import { deleteShelve, check } from "../../reducer/login";
import { Link } from "react-router-dom";
import { getAvg, getAtk } from "../../utills";
import { editBook } from "../../reducer/books";
import Modal from "../Modal";
const cx = classnames.bind(style);
const BookShelve = () => {
  const [shelve, setShelve] = useState({
    type: 1,
    openModal: false,
    lastPos: 90,
    item: {},
    status: "",
  });
  const dispatch = useDispatch();
  const { profile, isLoggedIn } = useSelector((state) => state.login);
  const { profile: user } = useSelector((state) => state.user);
  const loadUser = useCallback(async () => {
    const atk = getAtk();
    if (atk) {
      dispatch(check(atk));
    }
    const tmp = window.location.hash.split("/");
    const uid = tmp[tmp.length - 1]; //pathname.substring(1).split("/")[1];
    dispatch(getUser(uid));
  }, [dispatch]);
  useEffect(() => {
    loadUser();
    window.scrollTo(0, 0);
    return () => {};
  }, [loadUser]);

  const getBooks = () => {
    const { user } = profile;
    if (user) {
      const tags = user?.uploaded?.map((item) => {
        return (
          <tr key={item._id}>
            <td>
              <Link to={`/book/${item._id}`}>
                <img src={item.thumbnail} alt={item.thumbnail}></img>
              </Link>
            </td>
            <td>
              <Link to={`/book/${item._id}`}>{item.title}</Link>
            </td>
            <td>
              {item.authors.length > 1
                ? `${item.authors[0]} *`
                : item.authors[0]}
            </td>
            <td>{item.votes ? getAvg(item.votes) : 0.0}</td>
            <td>{moment(item.createdAt).format("YY년MM월DD일 HH:MM:SS")}</td>
            <td className={cx("settings uploaded")}>
              <p onClick={handleOpen(item)}>수정</p>
              <p onClick={onDeleteShelve(user._id, item._id)}>X</p>
            </td>
          </tr>
        );
      });
      return tags;
    }
    return null;
  };
  const onDeleteShelve = useCallback(
    (uid, bid, type) => async (e) => {
      try {
        const response = await dispatch(deleteShelve(uid, bid, type)); //await deleteShelve(uid, bid, type);
        const {
          value: { status },
        } = response;
        if (status === 200) {
          loadUser();
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, loadUser]
  );

  const handleOpen = useCallback(
    (book) => (e) => {
      setShelve({
        ...shelve,
        openModal: true,
        item: book,
      });
    },
    [shelve]
  );
  const handleCancel = useCallback(
    (e) => {
      setShelve({
        ...shelve,
        openModal: false,
      });
    },
    [shelve]
  );
  const handleSubmit = useCallback(
    (book) => async (e) => {
      e.preventDefault();
      if (isLoggedIn) {
        try {
          const response = await dispatch(
            editBook({
              ...book,
            })
          );
          const {
            value: { status },
          } = response;
          if (status === 200) {
            loadUser();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    [dispatch, loadUser, isLoggedIn]
  );
  const { openModal, item } = shelve;
  return (
    <section className={cx("book-shelve")}>
      {openModal ? (
        <Modal
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          item={item}
        />
      ) : null}
      <div>
        <p className={cx("shelve-header")}>{user ? user.email : ""}의 책장</p>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>커버</th>
              <th>제목</th>
              <th>저자</th>
              <th>평균</th>
              <th>생성 날짜</th>
              {profile?.user && user && user._id === profile.user._id ? (
                <th>설정</th>
              ) : null}
            </tr>
          </thead>
          <tbody>{getBooks()}</tbody>
        </table>
      </div>
    </section>
  );
};
export default BookShelve;
