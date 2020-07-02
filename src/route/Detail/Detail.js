import React, { useEffect, useCallback } from "react";
import BookDetail from "../../components/BookDetail";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, postRate } from "../../reducer/books";
import { getReview } from "../../reducer/review";

const Detail = ({ match }) => {
  //const [avgVote, setAvgVote] = useState(0.0);
  const dispatch = useDispatch();
  const { book, vote_error, vote_pending, vote_success } = useSelector(
    (state) => state.books
  );
  const { reviews } = useSelector((state) => state.review);
  const {
    profile,
    isLoggedIn,
    postShelveSuccess,
    postShelveError,
  } = useSelector((state) => state.login);
  const getBook = useCallback(
    async (id) => {
      try {
        dispatch(getDetail(id));
        dispatch(getReview(id));
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );
  const postVote = (id, name, vote) => {
    dispatch(postRate(id, name, vote));
  };
  useEffect(() => {
    const {
      params: { id },
    } = match;
    window.scrollTo(0, 0);
    getBook(id);
  }, [getBook, match]);
  return (
    <>
      <main className="main-container">
        <BookDetail
          book={book}
          id={match.params.id}
          postVote={postVote}
          votes={book?.votes || []}
          reviews={reviews}
          profile={profile}
          postShelveSuccess={postShelveSuccess}
          postShelveError={postShelveError}
          isLoggedIn={isLoggedIn}
        />
      </main>
    </>
  );
};
export default Detail;
