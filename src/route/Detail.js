import React, { Component, Fragment } from "react";
import BookDetail from "../components/BookDetail";
import { connect } from "react-redux";
import * as bookActions from "../reducer/books";
import * as reviewActions from "../reducer/review";
//import * as reviewActions from "../reducer/review";

class Detail extends Component {
  state = {
    avg_vote: 0.0,
  };
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    window.scrollTo(0, 0);
    this.getBook(id);
  }
  getBook = async (id) => {
    const { getBook, getReview } = this.props;
    try {
      await getBook(id); //.then(info => {console.log("Done");});
      await getReview(id);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      match: {
        params: { id },
      },
      book,
      reviews,
      postVote,
      profile,
    } = this.props;
    return (
      <Fragment>
        <main className="main-container">
          <BookDetail
            book={book}
            id={id}
            postVote={postVote}
            votes={book?.votes || []}
            reviews={reviews}
            profile={profile}
          />
        </main>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pending: state.books.pending,
    error: state.books.error,
    book: state.books.book,
    vote_error: state.books.vote_error,
    vote_pending: state.books.vote_pending,
    vote_success: state.books.vote_success,
    reviews: state.review.reviews,
    profile: state.login.profile,
  };
};
const mapDispathToProps = (dispatch) => {
  return {
    getReview: (id) => dispatch(reviewActions.getReview(id)),
    getBook: (id) => dispatch(bookActions.getDetail(id)),
    postVote: (id, vote, name) =>
      dispatch(bookActions.postRate(id, vote, name)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Detail);
