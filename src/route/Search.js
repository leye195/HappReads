import React, { Component, Fragment } from "react";
import BookList from "../components/BookList";
import * as actions from "../reducer/books";
import { connect } from "react-redux";
const searchResult = (books) => {
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
    margin: "0 auto",
  },
  text: {
    width: "100%",
    padding: "5px",
    fontSize: "12px",
  },
};
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      type: 0,
      q: "",
      page: 1,
      isSubmited: false,
    };
  }
  componentDidMount() {
    const {
      location: { search },
    } = this.props;
    const q = decodeURI(search)
      .split("=")[1]
      .replace(/[%20]/gi, " ")
      .split("&")[0];
    this.getBooks(q, 0);
    this.setState({
      q,
    });
    window.addEventListener("scroll", this.handleScroll); //스크롤 이벤트 추가
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll); //스크롤 이벤트 제거
  }
  getBooks = async (q, type, page = 1) => {
    const { getBooks } = this.props;
    try {
      await getBooks(q, type, page);
      //console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  getMoreBooks = async (q, type, page = 1) => {
    const { getMoreBooks } = this.props;
    try {
      await getMoreBooks(q, type, page);
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
      location: { search },
    } = this.props;
    const { page } = this.state;
    const q = decodeURI(search)
      .split("=")[1]
      .replace(/[%20]/gi, " ")
      .split("&")[0];
    if (scrollHeight - innerHeight - scrollTop < 100) {
      //스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
      // this.getMoreBooks(q, type, page + 1);
      this.setState({
        page: page + 1,
      });
      //console.log("Search Next");
    }
  };
  render() {
    const { books } = this.props;
    const { q } = this.state;
    return (
      <Fragment>
        <div style={{ marginTop: "73px" }}>
          <h1 style={{ marginLeft: "10px", paddingTop: "10px" }}>
            <span style={{ fontWeight: "800" }}>검색: {q}</span>
          </h1>
          {searchResult(books)}
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pending: state.books.pending,
    error: state.books.error,
    books: state.books.books,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMoreBooks: (q, type = 0, page = 1) =>
      dispatch(actions.getMore(q, type, page)),
    getBooks: (q, type = 0, page = 1) =>
      dispatch(actions.getBooks(q, type, page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
