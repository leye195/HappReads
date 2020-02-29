import React, { Component, Fragment } from "react";
import style from "./BookShelve.scss";
import classnames from "classnames/bind";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../reducer/user";
import { Link } from "react-router-dom";
const cx = classnames.bind(style);
let currentItem = null;
const active = target => {
  target.classList.add("show");
  currentItem = target;
};
const inactive = currentItem => {
  currentItem.classList.remove("show");
};
class BookShelve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      openModal: false
    };
  }
  componentDidMount() {
    const menu_ul = document.querySelector(".menu-ul");
    menu_ul.addEventListener("click", this.handleClick);
    active(document.querySelector(".menu-ul li:nth-child(1)"));
    this.getUser();
  }
  componentWillUnmount() {
    const menu_ul = document.querySelector(".menu-ul");
    menu_ul.removeEventListener("click", this.handleClick);
  }
  getUser = async () => {
    const { getUser } = this.props;
    const uid = window.location.pathname.substring(1).split("/")[1];
    try {
      await getUser(uid);
    } catch (error) {
      console.log(error);
    }
  };
  getBooks = val => {
    const {
      user: { user }
    } = this.props;
    const type = parseInt(val, 10);
    if (user) {
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
            <tr>
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
              <td> </td>
              <td>수정</td>
            </tr>
          );
        });
        return tags;
      } else if (type === 2) {
        const uploaded = user.uploaded;
        const tags = uploaded.map(item => {
          return (
            <tr>
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
              <td>수정</td>
            </tr>
          );
        });
        return tags;
      } else if (type === 3) {
        const want_read = user.want_read;
        const tags = want_read.map(item => {
          return (
            <tr>
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
              <td>수정</td>
            </tr>
          );
        });
        return tags;
      } else if (type === 4) {
        const reading = user.reading;
        const tags = reading.map(item => {
          return (
            <tr>
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
              <td>수정</td>
            </tr>
          );
        });
        return tags;
      } else if (type === 5) {
        const read = user.read;
        const tags = read.map(item => {
          return (
            <tr>
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
              <td>수정</td>
            </tr>
          );
        });
        return tags;
      }
    }
    return <Fragment></Fragment>;
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
  render() {
    const {
      user: { user }
    } = this.props;
    const { type } = this.state;
    return (
      <div className={cx("book-shelve")}>
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
                <th>설정</th>
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
    user: state.user.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUser: uid => dispatch(actions.getUser(uid))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookShelve);
