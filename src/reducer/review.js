import { handleActions } from "redux-actions";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : "https://happread.herokuapp.com/";

export const GET_REVIEWS = "GET_REVIEWS";
export const GET_REVIEWS_PENDING = "GET_REVIEWS_PENDING";
export const GET_REVIEWS_SUCCESS = "GET_REVIEWS_SUCCESS";
export const GET_REVIEWS_FAILURE = "GET_REVIEWS_FAILURE";

export const GET_REVIEW = "GET_REVIEW";
export const GET_REVIEW_PENDING = "GET_REVIEW_PENDING";
export const GET_REVIEW_SUCCESS = "GET_REVIEW_SUCCESS";
export const GET_REVIEW_FAILURE = "GET_REVIEW_FAILURE";

export const POST_REVIEW = "POST_REVIEW";
export const POST_REVIEW_PENDING = "POST_REVIEW_PENDING";
export const POST_REVIEW_SUCCESS = "POST_REVIEW_SUCCESS";
export const POST_REVIEW_FAILURE = "POST_REVIEW_FAILURE";

export const EDIT_REVIEW = "EDIT_REVIEW";
export const EDIT_REVIEW_PENDING = "EDIT_REVIEW_PENDING";
export const EDIT_REVIEW_SUCCESS = "EDIT_REVIEW_SUCCESS";
export const EDIT_REVIEW_FAILURE = "EDIT_REVIEW_FAILURE";

export const LIKE_REVIEW = "LIKE_REVIEW";
export const LIKE_REVIEW_PENDING = "LIKE_REVIEW_PENDING";
export const LIKE_REVIEW_SUCCESS = "LIKE_REVIEW_SUCCESS";
export const LIKE_REVIEW_FAILURE = "LIKE_REVIEW_FAILURE";

const requestGetReviews = (limit = 1, page = 1) => {
  return axios.get(`reviews?limit=${limit}&page=${page}`);
};
const requestGetReview = (id) => {
  //console.log(id);
  return axios.get(`book/${id}/review`);
};
const requestPostReview = (id, name, content, book) => {
  //console.log(isbn, name, content);
  return axios.post(`book/${id}/review`, {
    name,
    content,
    book,
  });
};

const requestEditReview = (rid, content) => {
  return axios.post(`book/review/${rid}`, {
    content,
  });
};

const requestLikeReview = (type, id, uid) => {
  return axios.post(`review/like`, {
    type,
    id,
    uid,
  });
};
export const getReviews = (data) => ({
  type: GET_REVIEWS,
  payload: requestGetReviews(data.limit, data.page),
});
export const getReview = (isbn) => ({
  type: GET_REVIEW,
  payload: requestGetReview(isbn),
});
export const postReview = (isbn, name, content, book) => ({
  type: POST_REVIEW,
  payload: requestPostReview(isbn, name, content, book),
});

export const editReview = (rid, content) => ({
  type: EDIT_REVIEW,
  payload: requestEditReview(rid, content),
});
export const postLike = (type, id, uid) => ({
  type: LIKE_REVIEW,
  payload: requestLikeReview(type, id, uid),
});

const initialState = {
  reviews: [],
  pending: false,
  success: false,
  error: false,
  loadReviewsPending: false,
  loadReviewsError: false,
  loadReviewsSuccess: false,
  loadReviewsDone: false,
  postReviewPending: false,
  postReviewSuccess: false,
  postReviewError: false,
};
export default handleActions(
  {
    [GET_REVIEWS_PENDING]: (state, action) => {
      return {
        ...state,
        loadReviewsPending: true,
        loadReviewsError: false,
        loadReviewsSuccess: false,
        loadReviewsDone: false,
      };
    },
    [GET_REVIEWS_SUCCESS]: (state, action) => {
      const {
        data: { reviews, page },
      } = action.payload;
      return {
        ...state,
        reviews:
          parseInt(page) !== 1 ? [...state.reviews, ...reviews] : [...reviews],
        loadReviewsPending: false,
        loadReviewsSuccess: true,
        loadReviewsDone: reviews.length % 5 !== 0 ? true : false,
      };
    },
    [GET_REVIEWS_FAILURE]: (state, action) => {
      return {
        ...state,
        loadReviewsPending: false,
        loadReviewsError: true,
        loadReviewsDone: false,
      };
    },
    [POST_REVIEW_PENDING]: (state, action) => {
      return {
        ...state,
        postReviewPending: true,
        postReviewSuccess: false,
        postReviewError: false,
      };
    },
    [POST_REVIEW_SUCCESS]: (state, action) => {
      return {
        ...state,
        reviews: action.payload.data.reviews,
        postReviewPending: false,
        postReviewSuccess: true,
      };
    },
    [POST_REVIEW_FAILURE]: (state, action) => {
      return {
        ...state,
        postReviewPending: false,
        postReviewError: true,
      };
    },
    [GET_REVIEW_PENDING]: (state, action) => {
      return {
        ...state,
        error: false,
        pending: true,
        success: false,
      };
    },
    [GET_REVIEW_SUCCESS]: (state, action) => {
      return {
        reviews: action.payload.data.reviews,
        error: false,
        pending: false,
        success: true,
      };
    },
    [GET_REVIEW_FAILURE]: (state, action) => {
      return {
        error: true,
        pending: false,
        success: false,
      };
    },
    [EDIT_REVIEW_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
      };
    },
    [EDIT_REVIEW_SUCCESS]: (state, action) => {
      return {
        ...state,
        reviews: action.payload.data.reviews,
        pending: false,
        error: false,
        success: true,
      };
    },
    [EDIT_REVIEW_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
      };
    },
    ///LIKE_REVIEW
    [LIKE_REVIEW_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [LIKE_REVIEW_SUCCESS]: (state, action) => {
      const {
        data: { review },
      } = action.payload;
      //console.log(data.profile);
      let idx = -1;
      state.reviews.forEach((item, i) => {
        if (item._id === review._id) {
          idx = i;
        }
      });
      state.reviews[idx] = review;
      const updatedReviews = state.reviews;
      return {
        ...state,
        pending: false,
        error: false,
        success: true,
        reviews: [...updatedReviews],
      };
    },
    [LIKE_REVIEW_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
