import React, { Component, Fragment } from "react";
import BookDetail from "../components/BookDetail";
import { connect } from "react-redux";
import * as actions from "../reducer/books";
//import * as reviewActions from "../reducer/review";

class Detail extends Component {
  state = {
    avg_vote: 0.0
  };
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    window.scrollTo(0, 0);
    // console.log(id);
    this.getBook(id);
  }
  getBook = async id => {
    const { getBook, getAvg_Reviews } = this.props;
    try {
      Promise.all([await getBook(id), await getAvg_Reviews(id)]); //.then(info => {console.log("Done");});
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      match: {
        params: { id }
      },
      books,
      votes,
      reviews,
      postVote,
      profile
    } = this.props;
    return (
      <Fragment>
        <div className="main-container">
          <BookDetail
            book={books[0]}
            id={id}
            postVote={postVote}
            votes={votes}
            reviews={reviews}
            profile={profile}
          />
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    pending: state.books.pending,
    error: state.books.error,
    books: state.books.books,
    vote_error: state.books.vote_error,
    vote_pending: state.books.vote_pending,
    vote_success: state.books.vote_success,
    votes: state.books.votes,
    reviews: state.review.reviews,
    profile: state.login.profile
  };
};
const mapDispathToProps = dispatch => {
  return {
    getBook: q => dispatch(actions.getDetail(q)),
    getAvg_Reviews: isbn => dispatch(actions.getInfo(isbn)),
    postVote: (title, authors, vote, isbn, name, thumbnail) =>
      dispatch(actions.postBook(title, authors, vote, isbn, name, thumbnail))
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Detail);
