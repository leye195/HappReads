import { handleActions } from "redux-actions";
import axios from "axios";

const GET_REVIEWS = "GET_REVIEWS";
const GET_REVIEWS_PENDING = "GET_REVIEWS_PENDING";
const GET_REVIEWS_SUCCESS = "GET_REVIEWS_SUCCESS";
const GET_REVIEWS_FAILURE = "GET_REVIEWS_FAILURE";

const GET_REVIEW = "GET_REVIEW";
const GET_REVIEW_PENDING = "GET_REVIEW_PENDING";
const GET_REVIEW_SUCCESS = "GET_REVIEW_SUCCESS";
const GET_REVIEW_FAILURE = "GET_REVIEW_FAILURE";

const POST_REVIEW = "POST_REVIEW";
const POST_REVIEW_PENDING = "POST_REVIEW_PENDING";
const POST_REVIEW_SUCCESS = "POST_REVIEW_SUCCESS";
const POST_REVIEW_FAILURE = "POST_REVIEW_FAILURE";

const DELETE_REVIEW = "DELETE_REVIEW";
const DELETE_REVIEW_PENDING = "DELETE_REVIEW_PENDING";
const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
const DELETE_REVIEW_FAILURE = "DELETE_REVIEW_FAILURE";

const EDIT_REVIEW = "EDIT_REVIEW";
const EDIT_REVIEW_PENDING = "EDIT_REVIEW_PENDING";
const EDIT_REVIEW_SUCCESS = "EDIT_REVIEW_SUCCESS";
const EDIT_REVIEW_FAILURE = "EDIT_REVIEW_FAILURE";
const requestGetReviews = () => {
  return axios.get(`http://localhost:8080/reviews`);
};
const requestGetReview = isbn => {
  return axios.get(`http://localhost:8080/book/${isbn}/review`);
};
const requestPostReview = (isbn, name, content, book) => {
  //console.log(isbn, name, content);
  return axios.post(`http://localhost:8080/book/${isbn}/review`, {
    name,
    isbn,
    content,
    book
  });
};
const requestDeleteReview = (uid, isbn, rid, from) => {
  return axios.post(`http://localhost:8080/book/${isbn}/review/${rid}`, {
    uid,
    from
  });
};
const requestEditReview = (rid, content) => {
  return axios.post(`http://localhost:8080/book/review/${rid}`, {
    content
  });
};

export const getReviews = () => ({
  type: GET_REVIEWS,
  payload: requestGetReviews()
});
export const getReview = isbn => ({
  type: GET_REVIEW,
  payload: requestGetReview(isbn)
});
export const postReview = (isbn, name, content, book) => ({
  type: POST_REVIEW,
  payload: requestPostReview(isbn, name, content, book)
});
export const deleteReview = (uid, isbn, rid, from) => ({
  type: DELETE_REVIEW,
  payload: requestDeleteReview(uid, isbn, rid, from)
});
export const editReview = (rid, content) => ({
  type: EDIT_REVIEW,
  payload: requestEditReview(rid, content)
});
const initialState = {
  reviews: [],
  pending: false,
  error: false,
  success: false
};
export default handleActions(
  {
    [GET_REVIEWS_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
        success: false
      };
    },
    [GET_REVIEWS_SUCCESS]: (state, action) => {
      const {
        data: { reviews }
      } = action.payload;
      return {
        reviews: reviews,
        pending: false,
        error: false,
        success: true
      };
    },
    [GET_REVIEWS_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
        success: false
      };
    },
    [POST_REVIEW_PENDING]: (state, action) => {
      return {
        ...state,
        error: false,
        pending: true,
        success: false
      };
    },
    [POST_REVIEW_SUCCESS]: (state, action) => {
      return {
        reviews: action.payload.data.reviews,
        error: false,
        pending: false,
        success: true
      };
    },
    [POST_REVIEW_FAILURE]: (state, action) => {
      return {
        ...state,
        error: true,
        pending: false,
        success: false
      };
    },
    [GET_REVIEW_PENDING]: (state, action) => {
      return {
        ...state,
        error: false,
        pending: true,
        success: false
      };
    },
    [GET_REVIEW_SUCCESS]: (state, action) => {
      return {
        reviews: action.payload.data.reviews,
        error: false,
        pending: false,
        success: true
      };
    },
    [GET_REVIEW_FAILURE]: (state, action) => {
      return {
        error: true,
        pending: false,
        success: false
      };
    },
    [DELETE_REVIEW_PENDING]: (state, action) => {
      return {
        reviews: action.payload.data.reviews,
        pending: true,
        error: false,
        success: false
      };
    },
    [DELETE_REVIEW_SUCCESS]: (state, action) => {
      return {
        pending: true,
        error: false,
        success: false
      };
    },
    [DELETE_REVIEW_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
        success: false
      };
    },
    [EDIT_REVIEW_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
        success: false
      };
    },
    [EDIT_REVIEW_SUCCESS]: (state, action) => {
      return {
        ...state,
        reviews: action.payload.data.reviews,
        pending: false,
        error: false,
        success: true
      };
    },
    [EDIT_REVIEW_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
        success: false
      };
    }
  },
  initialState
);
