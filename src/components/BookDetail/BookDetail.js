import React, { Component, Fragment } from "react";
import { FaPlusCircle, FaStar, FaAngleDown } from "react-icons/fa";
import style from "./BookDetail.scss";
import classnames from "classnames/bind";
import { ChasingDots } from "better-react-spinkit";
import Select from "react-select";
import Rater from "../Rater";
import Review from "../Review";
import { connect } from "react-redux";
import * as actions from "../../reducer/shelve";
const cx = classnames.bind(style);
const formatAuthors = authors => {
  let s = "";
  for (let i = 0; i < authors.length; i++) {
    s += `${authors[i]} `;
  }
  return s;
};
const getAvg = votes => {
  if (votes && votes.length > 0) {
    const total = votes.reduce((a, b) => a + b, 0);
    return (total / votes.length).toFixed(2);
  } else {
    return 0;
  }
};
const options = [
  {
    value: "want_read",
    label: "읽기"
  },
  {
    value: "reading",
    label: "읽는중"
  },
  {
    value: "read",
    label: "읽음"
  }
];
class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      status: "읽기"
    };
  }
  async componentDidMount() {
    this.getStatus();
  }
  checkStatus = (arr, isbn) => {
    if (arr.filter(item => item.isbn === isbn).length > 0) return true;
    return false;
  };
  getStatus = () => {
    const {
      profile: { profile },
      id: isbn
    } = this.props;
    if (profile) {
      if (this.checkStatus(profile.want_read, isbn)) {
        this.setState({
          selected: options[0],
          status: options[0].label
        });
        return;
      }
      if (this.checkStatus(profile.reading, isbn)) {
        this.setState({
          selected: options[1],
          status: options[1].label
        });
        return;
      }
      if (this.checkStatus(profile.read, isbn)) {
        this.setState({
          selected: options[2],
          status: options[2].label
        });
        return;
      }
    }
  };
  handleOnClick = async () => {
    const {
      selected: { value }
    } = this.state;
    const {
      postShelve,
      book: { title, authors, isbn, thumbnail },
      profile: {
        profile: { email }
      }
    } = this.props;
    try {
      await postShelve(email, isbn, title, authors, value, thumbnail);
    } catch (error) {}
  };
  handleRadio = selected => {
    this.setState({ selected }, () =>
      console.log(`Selected: ${this.state.selected}`)
    );
  };
  render() {
    const { book, votes, postVote, id, reviews } = this.props;
    const { selected, status } = this.state;
    return (
      <Fragment>
        {book ? (
          <Fragment>
            <div className={cx("book-detail")}>
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
                  <span className={cx("discription")}>{book.contents}</span>
                  <div>
                    <div className={cx("rate-wrapper")}>
                      <span>책 평가하기</span>
                      <Rater postVote={postVote} book={book} id={id} />
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
            </div>
            <Review id={id} />
          </Fragment>
        ) : (
          <ChasingDots color="white" size={60} />
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postShelve: (email, isbn, title, authors, type, thumbnail) =>
      dispatch(actions.postShelve(email, isbn, title, authors, type, thumbnail))
  };
};
export default connect(null, mapDispatchToProps)(BookDetail);
