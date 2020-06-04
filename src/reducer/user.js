import { handleActions } from "redux-actions";
import axios from "axios";

const URL = `http://localhost:8080`;

export const GET_USER = "GET_USER";
export const GET_USER_PENDING = "GET_USER_PENDING";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const GET_TOP_READERS = "GET_TOP_READERS";
export const GET_TOP_READERS_PENDING = "GET_TOP_READERS_PENDING";
export const GET_TOP_READERS_SUCCESS = "GET_TOP_READERS_SUCCESS";
export const GET_TOP_READERS_FAILURE = "GET_TOP_READERS_FAILURE";

export const GET_TOP_REVIEWERS = "GET_TOP_REVIEWERS";
export const GET_TOP_REVIEWERS_PENDING = "GET_TOP_REVIEWERS_PENDING";
export const GET_TOP_REVIEWERS_SUCCESS = "GET_TOP_REVIEWERS_SUCCESS";
export const GET_TOP_REVIEWERS_FAILURE = "GET_TOP_REVIEWERS_FAILURE";

const requestUser = (id) => {
  return axios.get(`${URL}/profile/${id}`);
};
const requestTopReaders = (type) => {
  return axios.get(`${URL}/rank/reader/${type}`);
};
const requestTopReviewers = (type) => {
  return axios.get(`${URL}/rank/reviewer/${type}`);
};

export const getUser = (id) => ({
  type: GET_USER,
  payload: requestUser(id),
});
export const getTopReaders = (type = 0) => ({
  type: GET_TOP_READERS,
  payload: requestTopReaders(type),
});
export const getTopReviewers = (type) => ({
  type: GET_TOP_REVIEWERS,
  payload: requestTopReviewers(type),
});
const initialState = {
  pending: false,
  error: false,
  profile: {},
  topReaders: [],
  topReviewers: [],
};
export default handleActions(
  {
    [GET_USER_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_USER_SUCCESS]: (state, action) => {
      console.log(action.payload.data.user);
      return {
        pending: false,
        error: false,
        profile: action.payload.data.user,
      };
    },
    [GET_USER_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
    [GET_TOP_READERS_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_TOP_READERS_SUCCESS]: (state, action) => {
      const {
        data: { readers },
      } = action.payload;
      return {
        ...state,
        topReaders: readers,
        pending: false,
        error: false,
      };
    },
    [GET_TOP_READERS_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
    [GET_TOP_REVIEWERS_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_TOP_REVIEWERS_SUCCESS]: (state, action) => {
      const {
        data: { reviewers },
      } = action.payload;
      return {
        ...state,
        topReviewers: reviewers,
        pending: false,
        error: false,
      };
    },
    [GET_TOP_REVIEWERS_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
