import React, { Component, Fragment } from "react";
import HomeSection from "../components/HomeSection";
import HomeContent from "../components/HomeContent";
import { ChasingDots } from "better-react-spinkit";
import { connect } from "react-redux";

import * as actions from "../reducer/books";
class Home extends Component {
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
  render() {
    const { books, pending } = this.props;
    return (
      <Fragment>
        <HomeSection />
        <main className="mainContainer">
          {pending ? (
            <ChasingDots color="white" size={60} />
          ) : (
            <HomeContent booklist={books} />
          )}
        </main>
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
    getBooks: () => dispatch(actions.getAllBooks())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
