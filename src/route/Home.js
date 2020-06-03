import React, { Component, Fragment } from "react";
import HomeSection from "../components/HomeSection";
import HomeContent from "../components/HomeContent";
import { ChasingDots } from "better-react-spinkit";
import { connect } from "react-redux";

import * as actions from "../reducer/books";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "전체",
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getBooks();
  }
  getBooks = async () => {
    try {
      await this.props.getBooks();
      //console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  onhandleClick = (e) => {
    const {
      target: { dataset },
    } = e;
    this.setState({ type: dataset.value });
  };
  filterBookList = (books) => {
    const { type } = this.state;
    if (type === "전체") return books;
    else {
      return books.filter((book) => book?.genres?.includes(type));
    }
  };
  render() {
    const { books, pending } = this.props;
    return (
      <Fragment>
        <HomeSection />
        <main className="mainContainer">
          {pending ? (
            <ChasingDots color="white" size={60} />
          ) : (
            <HomeContent
              booklist={books}
              filterBookList={this.filterBookList}
              handleClick={this.onhandleClick}
              type={this.state.type}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: () => dispatch(actions.getAllBooks()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
