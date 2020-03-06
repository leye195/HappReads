import React, { Component, Fragment } from "react";
import style from "./BookShelve.scss";
import classnames from "classnames/bind";
import moment from "moment";
import { connect } from "react-redux";
import * as userActions from "../../reducer/user";
import * as loginActions from "../../reducer/login";
import { Link } from "react-router-dom";
import Modal from "../Modal";
const cx = classnames.bind(style);
let currentItem = null;
let shelveHeader = null;
const active = target => {
  target.classList.add("show");
  currentItem = target;
};
const inactive = currentItem => {
  currentItem.classList.remove("show");
};
const convertType = { 읽음: "read", 읽기: "want_read", 읽는중: "reading" };
class BookShelve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      openModal: false,
      lastPos: 90,
      item: {},
      status: ""
    };
  }
  componentDidMount() {
    const menu_ul = document.querySelector(".menu-ul");
    shelveHeader = document.querySelector(".shelve-header");
    window.addEventListener("scroll", this.handleScroll);
    menu_ul.addEventListener("click", this.handleClick);
    active(document.querySelector(".menu-ul li:nth-child(1)"));
    this.getUser();
    window.scrollTo(0, 0);
  }
  componentWillUnmount() {
    const menu_ul = document.querySelector(".menu-ul");
    window.removeEventListener("scroll", this.handleScroll);
    menu_ul.removeEventListener("click", this.handleClick);
  }
  handleScroll = e => {
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
  };
  getUser = async () => {
    const uid = window.location.pathname.substring(1).split("/")[1];
    const { getUser } = this.props;
    try {
      await getUser(uid);
    } catch (error) {
      console.log(error);
    }
  };
  checkType = item => {
    const {
      user: { user }
    } = this.props;
    const read = user.read;
    const want_read = user.want_read;
    const reading = user.reading;
    for (let i = 0; i < want_read.length; i++) {
      if (want_read[i].isbn === item.isbn) return "읽기";
    }
    for (let i = 0; i < reading.length; i++) {
      if (reading[i].isbn === item.isbn) return "읽는중";
    }
    for (let i = 0; i < read.length; i++) {
      if (read[i].isbn === item.isbn) return "읽음";
    }
  };
  getBooks = val => {
    const {
      user: { user }
    } = this.props;
    const type = parseInt(val, 10);
    if (user) {
      //let all=[];
      if (type === 1) {
        const read = user.read;
        const want_read = user.want_read;
        const reading = user.reading;
        const all = want_read
          .concat(reading)
          .concat(read)
          .sort((a, b) => {
            return a.title > b.title ? 1 : -1;
          });
        const tags = all.map(item => {
          return (
            <tr key={item._id}>
              <td>
                <Link to={`/book/${item.isbn}`}>
                  <img src={item.thumbnail} alt={item.thumbnail}></img>
                </Link>
              </td>
              <td>
                <Link to={`/book/${item.isbn}`}>{item.title}</Link>
              </td>
              <td>
                {item.authors.length > 1
                  ? item.authors[0] + "*"
                  : item.authors[0]}
              </td>
              <td>{0.0}</td>
              <td>{moment(item.createdAt).format("YY년MM월DD일 HH:MM:SS")}</td>
              <td>{this.checkType(item)} </td>
              <td
                className={cx("settings all")}
                onClick={e =>
                  this.handleSettings(e.target, item, this.checkType(item))
                }
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
        const tags = uploaded.map(item => {
          return (
            <tr key={item._id}>
              <td>
                <Link to={`/book/${item.isbn}`}>
                  <img src={item.thumbnail} alt={item.thumbnail}></img>
                </Link>
              </td>
              <td>
                <Link to={`/book/${item.isbn}`}>{item.title}</Link>
              </td>
              <td>
                {item.authors.length > 1
                  ? item.authors[0] + "*"
                  : item.authors[0]}
              </td>
              <td>{0.0}</td>
              <td>{moment(item.createdAt).format("YY년MM월DD일 HH:MM:SS")}</td>
              <td>업로드</td>
              <td className={cx("settings uploaded")}>
                <span>수정</span>
                <span>X</span>
              </td>
            </tr>
          );
        });
        return tags;
      } else if (type === 3) {
        const want_read = user.want_read;
        const tags = want_read.map(item => {
          return (
            <tr key={item._id}>
              <td>
                <Link to={`/book/${item.isbn}`}>
                  <img src={item.thumbnail} alt={item.thumbnail}></img>
                </Link>
              </td>
              <td>
                <Link to={`/book/${item.isbn}`}>{item.title}</Link>
              </td>
              <td>
                {item.authors.length > 1
                  ? item.authors[0] + "*"
                  : item.authors[0]}
              </td>
              <td>{0.0}</td>
              <td>{moment(item.createdAt).format("YY년MM월DD일 HH:MM:SS")}</td>
              <td>읽기</td>
              <td
                className={cx("settings want")}
                onClick={e =>
                  this.handleSettings(e.target, item, this.checkType(item))
                }
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
        const tags = reading.map(item => {
          return (
            <tr key={item._id}>
              <td>
                <Link to={`/book/${item.isbn}`}>
                  <img src={item.thumbnail} alt={item.thumbnail}></img>
                </Link>
              </td>
              <td>
                <Link to={`/book/${item.isbn}`}>{item.title}</Link>
              </td>
              <td>
                {item.authors.length > 1
                  ? item.authors[0] + "*"
                  : item.authors[0]}
              </td>
              <td>{0.0}</td>
              <td>{moment(item.createdAt).format("YY년MM월DD일 HH:MM:SS")}</td>
              <td>읽는중</td>
              <td
                className={cx("settings reading")}
                onClick={e =>
                  this.handleSettings(e.target, item, this.checkType(item))
                }
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
        const tags = read.map(item => {
          return (
            <tr key={item._id}>
              <td>
                <Link to={`/book/${item.isbn}`}>
                  <img src={item.thumbnail} alt={item.thumbnail}></img>
                </Link>
              </td>
              <td>
                <Link to={`/book/${item.isbn}`}>{item.title}</Link>
              </td>
              <td>
                {item.authors.length > 1
                  ? item.authors[0] + "*"
                  : item.authors[0]}
              </td>
              <td>{0.0}</td>
              <td>{moment(item.createdAt).format("YY년MM월DD일 HH:MM:SS")}</td>
              <td>읽음</td>
              <td
                className={cx("settings")}
                onClick={e =>
                  this.handleSettings(e.target, item, this.checkType(item))
                }
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
    return <Fragment></Fragment>;
  };
  deleteShelve = async (uid, bid, type) => {
    const { deleteShelve } = this.props;
    try {
      const response = await deleteShelve(uid, bid, type);
      const {
        value: { status }
      } = response;
      if (status === 200) {
        this.getUser(uid);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleClick = e => {
    const { target } = e;
    const val = target.getAttribute("data-value");
    this.setState({
      type: val
    });
    if (currentItem) {
      inactive(currentItem);
    }
    active(target);
  };
  handleSettings = (target, item, type) => {
    if (target.innerText === "수정") {
      this.setState({
        openModal: true,
        item,
        status: type
      });
    }
    if (target.innerText === "X") {
      const {
        profile: { profile }
      } = this.props;
      this.deleteShelve(profile._id, item._id, convertType[type]);
    }
  };
  handleCancel = e => {
    this.setState({
      openModal: false
    });
  };
  handleChange = async (book, value) => {
    const {
      postShelve,
      profile: { profile }
    } = this.props;
    //서버에 수정 요청 전송 코드입력
    try {
      const response = await postShelve(
        profile.email,
        book.isbn,
        book.title,
        book.authors,
        value,
        book.thumbnail
      );
      const {
        value: { status }
      } = response;
      if (status === 200) {
        this.getUser(profile.id);
        this.setState({
          openModal: false
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      user: { user },
      profile: { profile }
    } = this.props;
    const { type, openModal, item, status } = this.state;
    const uid = window.location.pathname.substring(1).split("/")[1];
    return (
      <div className={cx("book-shelve")}>
        {openModal ? (
          <Modal
            handleCancel={this.handleCancel}
            handleChange={this.handleChange}
            item={item}
            type={status}
          />
        ) : (
          <Fragment />
        )}
        <div>
          <p className={cx("shelve-header")}>
            <span>{user ? user.email : ""}'s </span> <span>책장</span>
          </p>
          <ul className={cx("menu-ul")}>
            <li data-value={1}>전체</li>
            <li data-value={3}>읽기 ({user ? user.want_read.length : 0})</li>
            <li data-value={4}>읽는중 ({user ? user.reading.length : 0})</li>
            <li data-value={5}>읽음 ({user ? user.read.length : 0})</li>
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
                <th>평균 평점</th>
                <th>생성 날짜</th>
                <th>상태</th>
                {profile && uid === profile._id ? (
                  <th>설정</th>
                ) : (
                  <Fragment></Fragment>
                )}
              </tr>
            </thead>
            <tbody>{this.getBooks(type)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    profile: state.login.profile,
    user: state.user.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUser: uid => dispatch(userActions.getUser(uid)),
    postShelve: (email, isbn, title, authors, type, thumbnail) =>
      dispatch(
        loginActions.postShelve(email, isbn, title, authors, type, thumbnail)
      ),
    deleteShelve: (uid, bid, type) =>
      dispatch(loginActions.deleteShelve(uid, bid, type))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookShelve);
