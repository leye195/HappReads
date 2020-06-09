import React, { Component, Fragment } from "react";
import HomeSection from "../components/HomeSection";
import HomeContent from "../components/HomeContent";
import { ChasingDots } from "better-react-spinkit";
import { connect } from "react-redux";

import * as actions from "../reducer/books";
let timer = null;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "전체",
      page: 1,
      books: [],
    };
  }
  componentDidMount() {
    this.getBooks("전체", 1);
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    timer = null;
    window.removeEventListener("scroll", this.handleScroll);
  }
  getBooks = async (type = "전체", page = 1) => {
    const { getBooks } = this.props;
    try {
      await getBooks(type, page);
    } catch (error) {
      console.log(error);
    }
  };
  handleScroll = (e) => {
    const { books, getBooks } = this.props;
    const { type, page } = this.state;
    const innerHeight = window.innerHeight,
      scrollHeight = document.body.scrollHeight,
      scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
    if (scrollHeight - innerHeight - scrollTop < 10) {
      //console.log(scrollHeight - innerHeight - scrollTop);
      if (books && books.length >= 15 * page) {
        if (timer === null) {
          timer = setTimeout((e) => {
            timer = null;
            //console.log(type, page);
            getBooks(type, page + 1);
            this.setState({
              page: page + 1,
            });
          }, 1500);
        }
      }
    }
  };
  onhandleClick = (e) => {
    const {
      target: { dataset },
    } = e;
    const { getBooks } = this.props;
    this.setState({ type: dataset.value, page: 1 });
    getBooks(dataset.value, 1);
  };
  filterBookList = (books) => {
    const { type } = this.state;
    if (type === "전체") return books;
    else {
      return books.filter((book) => book?.genres?.includes(type));
    }
  };
  render() {
    const { books, pending, sliderBooks } = this.props;
    const { page, type } = this.state;
    return (
      <Fragment>
        <HomeSection />
        <main className="mainContainer">
          {pending ? (
            <ChasingDots color="white" size={60} />
          ) : (
            <HomeContent
              booklist={books}
              sliderBooks={sliderBooks}
              handleClick={this.onhandleClick}
              type={type}
              page={page}
            />
          )}
        </main>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pending: state.books.pending,
    error: state.books.error,
    books: state.books.books,
    sliderBooks: state.books.sliderBooks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: (type, page) => dispatch(actions.getAllBooks(type, page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
