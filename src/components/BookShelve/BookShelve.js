import React, { useState, useEffect, useCallback } from "react";
import style from "./BookShelve.scss";
import classnames from "classnames/bind";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../reducer/user";
import { postShelve, deleteShelve } from "../../reducer/login";
import { Link } from "react-router-dom";
import BookModal from "../BookModal";
const cx = classnames.bind(style);
let currentItem = null;
let shelveHeader = null;
const active = (target) => {
  target.classList.add("show");
  currentItem = target;
};
const inactive = (currentItem) => {
  currentItem.classList.remove("show");
};
const convertType = { 읽음: "read", 읽기: "want_read", 읽는중: "reading" };
const BookShelve = () => {
  const [shelve, setShelve] = useState({
    type: 1,
    openModal: false,
    lastPos: 90,
    item: {},
    status: "",
  });
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.login);
  const { profile: user } = useSelector((state) => state.user);
  const loadUser = useCallback(async () => {
    const tmp = window.location.hash.split("/");
    const uid = tmp[tmp.length - 1]; //pathname.substring(1).split("/")[1];
    try {
      dispatch(getUser(uid));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  const handleScroll = useCallback((e) => {
    const menu_ul = document.querySelector(".menu-ul");
    const posY = menu_ul.getBoundingClientRect().top;
    if (e) {
      if (posY < 50) {
        if (!shelveHeader.classList.contains("fix")) {
          shelveHeader.classList.add("fix");
          menu_ul.classList.add("fix");
        }
      } else {
        shelveHeader.classList.remove("fix");
        menu_ul.classList.remove("fix");
      }
    }
  }, []);
  const handleClick = useCallback(
    (e) => {
      const { target } = e;
      const val = target.getAttribute("data-value");
      setShelve({
        ...shelve,
        type: val,
      });
      if (currentItem) {
        inactive(currentItem);
      }
      active(target);
    },
    [shelve]
  );
  useEffect(() => {
    const menu_ul = document.querySelector(".menu-ul");
    shelveHeader = document.querySelector(".shelve-header");
    window.addEventListener("scroll", handleScroll);
    menu_ul.addEventListener("click", handleClick);
    active(document.querySelector(".menu-ul li:nth-child(1)"));
    loadUser();
    window.scrollTo(0, 0);
    return () => {
      const menu_ul = document.querySelector(".menu-ul");
      window.removeEventListener("scroll", handleScroll);
      menu_ul.removeEventListener("click", handleClick);
    };
  }, [loadUser, handleScroll, handleClick]);

  const checkType = (item) => {
    const read = user?.read;
    const want_read = user?.want_read;
    const reading = user?.reading;
    for (let i = 0; i < want_read.length; i++) {
      if (want_read[i].book.isbn === item.isbn) return "읽기";
    }
    for (let i = 0; i < reading.length; i++) {
      if (reading[i].book.isbn === item.isbn) return "읽는중";
    }
    for (let i = 0; i < read.length; i++) {
      if (read[i].book.isbn === item.isbn) return "읽음";
    }
  };
  const getBooks = (val) => {
    const type = parseInt(val, 10);
    if (user) {
      if (type === 1) {
        const read = user?.read;
        const want_read = user?.want_read;
        const reading = user?.reading;
        const all = want_read
          ?.concat(reading)
          ?.concat(read)
          ?.sort((a, b) => {
            return a.title > b.title ? 1 : -1;
          });
        const tags = all?.map((item) => {
          return (
            <tr key={item.book._id}>
              <td>
                <Link to={`/book/${item._id}`}>
                  <img
                    src={item.book.thumbnail}
                    alt={item.book.thumbnail}
                  ></img>
                </Link>
              </td>
              <td>
                <Link to={`/book/${item.book._id}`}>{item.book.title}</Link>
              </td>
              <td>
                {item.book.authors.length > 1
                  ? item.book.authors[0] + "*"
                  : item.book.authors[0]}
              </td>
              <td>{0.0}</td>
              <td>
                {moment(item.book.createdAt).format("YY년MM월DD일 HH:MM:SS")}
              </td>
              <td>{checkType(item.book)} </td>
              <td
                className={cx("settings all")}
                onClick={handleSettings(item.book, checkType(item.book))}
              >
                <span>수정</span>
                <span>X</span>
              </td>
            </tr>
          );
        });
        return tags;
      } else if (type === 2) {
        const uploaded = user.uploaded;
        //console.log(uploaded);
        const tags = uploaded.map((item) => {
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
                  ? item.authors[0] + "*"
                  : item.authors[0]}
              </td>
              <td>{0.0}</td>
              <td>{moment(item.createdAt).format("YY년MM월DD일 HH:MM:SS")}</td>
              <td>업로드</td>
              <td
                className={cx("settings uploaded")}
                onClick={handleSettings(item, this.checkType(item))}
              >
                <span>수정</span>
                <span>X</span>
              </td>
            </tr>
          );
        });
        return tags;
      } else if (type === 3) {
        const want_read = user.want_read;
        const tags = want_read.map((item) => {
          return (
            <tr key={item.book._id}>
              <td>
                <Link to={`/book/${item._id}`}>
                  <img
                    src={item.book.thumbnail}
                    alt={item.book.thumbnail}
                  ></img>
                </Link>
              </td>
              <td>
                <Link to={`/book/${item.book._id}`}>{item.book.title}</Link>
              </td>
              <td>
                {item.book.authors.length > 1
                  ? item.book.authors[0] + "*"
                  : item.book.authors[0]}
              </td>
              <td>{0.0}</td>
              <td>
                {moment(item.book.createdAt).format("YY년MM월DD일 HH:MM:SS")}
              </td>
              <td>읽기</td>
              <td
                className={cx("settings want")}
                onClick={handleSettings(item.book, checkType(item.book))}
              >
                <span>수정</span>
                <span>X</span>
              </td>
            </tr>
          );
        });
        return tags;
      } else if (type === 4) {
        const reading = user.reading;
        const tags = reading.map((item) => {
          return (
            <tr key={item._id}>
              <td>
                <Link to={`/book/${item.book._id}`}>
                  <img
                    src={item.book.thumbnail}
                    alt={item.book.thumbnail}
                  ></img>
                </Link>
              </td>
              <td>
                <Link to={`/book/${item.book._id}`}>{item.book.title}</Link>
              </td>
              <td>
                {item.book.authors.length > 1
                  ? item.book.authors[0] + "*"
                  : item.book.authors[0]}
              </td>
              <td>{0.0}</td>
              <td>
                {moment(item.book.createdAt).format("YY년MM월DD일 HH:MM:SS")}
              </td>
              <td>읽는중</td>
              <td
                className={cx("settings reading")}
                onClick={handleSettings(item.book, this.checkType(item.book))}
              >
                <span>수정</span>
                <span>X</span>
              </td>
            </tr>
          );
        });
        return tags;
      } else if (type === 5) {
        const read = user.read;
        const tags = read.map((item) => {
          return (
            <tr key={item.book._id}>
              <td>
                <Link to={`/book/${item.book._id}`}>
                  <img
                    src={item.book.thumbnail}
                    alt={item.book.thumbnail}
                  ></img>
                </Link>
              </td>
              <td>
                <Link to={`/book/${item.book.isbn}`}>{item.book.title}</Link>
              </td>
              <td>
                {item.book.authors.length > 1
                  ? item.book.authors[0] + "*"
                  : item.book.authors[0]}
              </td>
              <td>{0.0}</td>
              <td>
                {moment(item.book.createdAt).format("YY년MM월DD일 HH:MM:SS")}
              </td>
              <td>읽음</td>
              <td
                className={cx("settings")}
                onClick={handleSettings(item.book, checkType(item.book))}
              >
                <span>수정</span>
                <span>X</span>
              </td>
            </tr>
          );
        });
        return tags;
      }
    }
    return null;
  };
  const onDeleteShelve = useCallback(
    async (uid, bid, type) => {
      try {
        const response = await dispatch(deleteShelve(uid, bid, type)); //await deleteShelve(uid, bid, type);
        const {
          value: { status },
        } = response;
        if (status === 200) {
          loadUser(uid);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, loadUser]
  );

  const handleSettings = useCallback(
    (target, item, type) => (e) => {
      const { target } = e;
      if (target.innerText === "수정") {
        setShelve({
          ...shelve,
          openModal: true,
          item,
          status: type,
        });
      }
      if (target.innerText === "X") {
        onDeleteShelve(profile.user._id, item._id, convertType[type]);
      }
    },
    [shelve, profile, onDeleteShelve]
  );
  const handleSubmit = (e) => {
    const { target } = e;
    console.log(target.value);
  };
  const handleCancel = useCallback(
    (e) => {
      setShelve({
        ...shelve,
        openModal: false,
      });
    },
    [shelve]
  );
  const handleTypeChange = async (book, value) => {
    //서버에 수정 요청 전송 코드입력
    try {
      const response = await dispatch(
        postShelve(profile?.user.email, book._id, value)
      );
      const {
        value: { status },
      } = response;
      if (status === 200) {
        loadUser(user._id);
        setShelve({
          ...shelve,
          openModal: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { openModal, status, item, type } = shelve;
  return (
    <div className={cx("book-shelve")}>
      {openModal ? (
        <BookModal
          handleCancel={handleCancel}
          handleTypeChange={handleTypeChange}
          item={item}
          type={status}
        />
      ) : null}
      <div>
        <p className={cx("shelve-header")}>
          <span>{user ? user.email : ""}'s </span> <span>책장</span>
        </p>
        <ul className={cx("menu-ul")}>
          <li data-value={1}>전체</li>
          <li data-value={3}>
            읽기 ({user ? user && user?.want_read?.length : 0})
          </li>
          <li data-value={4}>
            읽는중 ({user ? user && user?.reading?.length : 0})
          </li>
          <li data-value={5}>읽음 ({user ? user && user?.read?.length : 0})</li>
          <li data-value={2}>업로드</li>
        </ul>
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
              <th>상태</th>
              {profile?.user && user && user._id === profile.user._id ? (
                <th>설정</th>
              ) : null}
            </tr>
          </thead>
          <tbody>{getBooks(type)}</tbody>
        </table>
      </div>
    </div>
  );
};
export default BookShelve;
