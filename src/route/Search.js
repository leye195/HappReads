import React, { Component, Fragment } from "react";
import BookList from "../components/BookList";
import * as actions from "../reducer/books";
import { connect } from "react-redux";
const searchResult = books => {
  return (
    <Fragment>
      <BookList booklist={books} from="search" />
    </Fragment>
  );
};
const style = {
  form: {
    height: "80px",
    width: "450px",
    margin: "0 auto"
  },
  text: {
    width: "100%",
    padding: "5px",
    fontSize: "12px"
  }
};
class Search extends Component {
  constructor(props) {
    super(props);
    const type = window.location.search.split("type=")[1];
    this.state = {
      keyword: "",
      type: type ? type : "0",
      page: 1
    };
  }
  componentDidMount() {
    const {
      location: { search }
    } = this.props;
    const q = decodeURI(search)
      .split("=")[1]
      .replace(/[%20]/gi, " ")
      .split("&")[0];
    const type = window.location.search.split("type=")[1];
    console.log(q, type);
    this.getBooks(q, type);
    window.addEventListener("scroll", this.handleScroll); //스크롤 이벤트 추가
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll); //스크롤 이벤트 제거
  }
  getBooks = async (q, type, page = 1) => {
    const { getBooks } = this.props;
    try {
      const response = await getBooks(q, type, page);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  handleScroll = () => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const {
      location: { search }
    } = this.props;
    const { page } = this.state;
    const q = decodeURI(search)
      .split("=")[1]
      .replace(/[%20]/gi, " ")
      .split("&")[0];
    const type = window.location.search.split("type=")[1];
    if (scrollHeight - innerHeight - scrollTop < 100) {
      //스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
      this.getBooks(q, type, page + 1);
      this.setState({
        page: page + 1
      });
      //console.log("Search Next");
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const { keyword, type } = this.state;
    window.location.href = `/search?p=${keyword}&type=${type} `;
  };
  handleChange = query => {
    this.setState({
      keyword: query
    });
  };
  handleAll = () => {
    this.setState({
      type: "0"
    });
  };
  handleBook = () => {
    this.setState({
      type: "1"
    });
  };
  handleAuthor = () => {
    this.setState({
      type: "2"
    });
  };
  render() {
    const {
      history,
      location: { search },
      books,
      keyword
    } = this.props;
    const { type } = this.state;
    const q = decodeURI(search)
      .split("=")[1]
      .replace(/[%20]/gi, " ");
    return (
      <Fragment>
        <div style={{ marginTop: "73px" }}>
          <h1 style={{ marginLeft: "10px", paddingTop: "10px" }}>
            <span style={{ fontWeight: "800" }}>검색</span> >{" "}
            {q.substring(0, q.length - 5)}
          </h1>
          <div className="form-container" style={style.form}>
            <form style={{ width: "100%" }} onSubmit={this.handleSubmit}>
              <input
                type="text"
                style={style.text}
                placeholder="책/저자 검색"
                value={keyword}
                onChange={e => this.handleChange(e.target.value)}
              />
              <div style={{ marginTop: "10px" }}>
                <input
                  type="radio"
                  name="check"
                  value="all"
                  onChange={this.handleAll}
                  checked={type === "0"}
                />
                <label>모든</label>
                <input
                  type="radio"
                  name="check"
                  value="book"
                  onChange={this.handleBook}
                  checked={type === "1"}
                />
                <label>책</label>
                <input
                  type="radio"
                  name="check"
                  value="author"
                  onChange={this.handleAuthor}
                  checked={type === "2"}
                />
                <label> 작가</label>
              </div>
            </form>
          </div>
          {searchResult(books)}
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    pending: state.books.pending,
    error: state.books.error,
    books: state.books.books
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getBooks: (q, type = 0, page = 1) =>
      dispatch(actions.getBooks(q, type, page))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
