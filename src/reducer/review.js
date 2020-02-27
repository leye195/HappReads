import { handleActions } from "redux-actions";
import axios from "axios";

const GET_REVIEW = "GET_REVIEW";
const GET_REVIEW_PENDING = "GET_REVIEW_PENDING";
const GET_REVIEW_SUCCESS = "GET_REVIEW_SUCCESS";
const GET_REVIEW_FAILURE = "GET_REVIEW_FAILURE";

const POST_REVIEW = "POST_REVIEW";
const POST_REVIEW_PENDING = "POST_REVIEW_PENDING";
const POST_REVIEW_SUCCESS = "POST_REVIEW_SUCCESS";
const POST_REVIEW_FAILURE = "POST_REVIEW_FAILURE";

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
export const getReview = isbn => ({
  type: GET_REVIEW,
  payload: requestGetReview(isbn)
});
export const postReview = (isbn, name, content, book) => ({
  type: POST_REVIEW,
  payload: requestPostReview(isbn, name, content, book)
});
const initialState = {
  pending: false,
  error: false,
  success: false,
  reviews: []
};
export default handleActions(
  {
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
    }
  },
  initialState
);
