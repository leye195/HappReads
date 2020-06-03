import React, { Component, Fragment } from "react";
import { FaPlusCircle, FaStar, FaAngleDown } from "react-icons/fa";
import style from "./BookDetail.scss";
import classnames from "classnames/bind";
import { ChasingDots } from "better-react-spinkit";
import Select from "react-select";
import Rater from "../Rater";
import Review from "../Review";
import { connect } from "react-redux";
import * as actions from "../../reducer/login";
import * as bookActions from "../../reducer/books";

const cx = classnames.bind(style);
const formatAuthors = (authors) => {
  let s = "";
  if (authors) {
    for (let i = 0; i < authors.length; i++) {
      s += `${authors[i]} `;
    }
  }
  return s;
};
const getAvg = (votes) => {
  if (votes) {
    let total = 0;
    if (votes.length > 0) {
      for (let i = 0; i < votes.length; i++) {
        total += parseInt(votes[i].vote);
      }
      console.log(total);
      return (total / votes.length).toFixed(2);
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

const options = [
  {
    value: "want_read",
    label: "읽기",
  },
  {
    value: "reading",
    label: "읽는중",
  },
  {
    value: "read",
    label: "읽음",
  },
];
class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: { value: "want_read", label: "읽기" },
      status: "읽기",
    };
  }
  async componentDidMount() {
    this.getStatus();
  }
  checkStatus = (arr, isbn) => {
    if (arr.filter((item) => item.isbn === isbn).length > 0) return true;
    return false;
  };
  checkUserVote = () => {
    const {
      votes,
      profile: { profile },
    } = this.props;
    let cur = "0";
    if (votes) {
      for (let i = 0; i < votes.length; i++) {
        if (votes[i]?._id === profile?._id) {
          cur = String(votes[i].vote);
          break;
        }
      }
    }
    return cur;
  };
  getStatus = () => {
    const {
      profile: { profile },
      id: isbn,
    } = this.props;
    if (profile) {
      if (this.checkStatus(profile.want_read, isbn)) {
        this.setState({
          selected: options[0],
          status: options[0].label,
        });
        return;
      }
      if (this.checkStatus(profile.reading, isbn)) {
        this.setState({
          selected: options[1],
          status: options[1].label,
        });
        return;
      }
      if (this.checkStatus(profile.read, isbn)) {
        this.setState({
          selected: options[2],
          status: options[2].label,
        });
        return;
      }
    }
  };
  handleOnClick = async () => {
    const {
      selected: { value },
    } = this.state;
    const {
      postShelve,
      book,
      profile: {
        profile: { email },
      },
    } = this.props;
    try {
      await postShelve(email, book._id, value);
    } catch (error) {}
  };
  handleRadio = (selected) => {
    console.log(selected);
    this.setState({ selected });
  };
  render() {
    const { book, votes, postVote, id, reviews } = this.props;
    const { selected, status } = this.state;
    return (
      <Fragment>
        {book ? (
          <Fragment>
            <section className={cx("book-detail")}>
              <div className={cx("book-info-wrapper")}>
                <div className={cx("img-col")}>
                  <img src={book.thumbnail} alt="geisha" />
                </div>
                <div className={cx("book-content")}>
                  <h2 className={cx("title")}>{book.title}</h2>
                  <p className={cx("author")}>{formatAuthors(book.authors)}</p>
                  <div className={cx("bookmeta")}>
                    <span className={cx("score")}>
                      <FaStar />
                      {getAvg(votes)}
                      <FaAngleDown className={cx("angle-down")} />
                    </span>
                    <span className={cx("rate-cnt")}>
                      {votes ? votes.length : 0} 평가
                    </span>
                    <span className={cx("review-cnt")}>
                      {reviews ? reviews.length : 0} 리뷰
                    </span>
                  </div>
                  <p className={cx("discription")}>
                    {book.contents !== undefined ? book.contents : "내용 없음"}
                  </p>
                  <div>
                    <div className={cx("rate-wrapper")}>
                      <span>책 평가하기</span>
                      <Rater
                        postVote={postVote}
                        book={book}
                        id={id}
                        votes={
                          votes && votes.length > 0 ? this.checkUserVote() : "0"
                        }
                      />
                    </div>
                    <div className={cx("add")}>
                      <Select
                        className={cx("select")}
                        options={options}
                        onChange={this.handleRadio}
                        value={selected}
                        isSearchable={false}
                        placeholder={status}
                      />
                      <button
                        className={cx("want-read")}
                        onClick={this.handleOnClick}
                      >
                        <span>
                          <FaPlusCircle />
                        </span>
                        등록
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Review />
          </Fragment>
        ) : (
          <ChasingDots color="white" size={60} />
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postShelve: (email, id, type) =>
      dispatch(actions.postShelve(email, id, type)),
  };
};
export default connect(null, mapDispatchToProps)(BookDetail);
