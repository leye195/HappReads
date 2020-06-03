import { handleActions } from "redux-actions";
import axios from "axios";

export const USER_CHECK = "USER_CHECK";
export const USER_CHECK_PENDING = "USER_CHECK_PENDING";
export const USER_CHECK_SUCCESS = "USER_CHECK_SUCCESS";
export const USER_CHECK_FAILURE = "USER_CHECK_FAILURE";

export const LOGIN = "LOGIN";
export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";
export const LOGOUT_PENDING = "LOGOUT_PENDING";
export const LOGOUT_SUCCESS = "LOGOUR_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

const POST_SHELVE = "POST_SHELVE";
const POST_SHELVE_PENDING = "POST_SHELVE_PENDING";
const POST_SHELVE_SUCCESS = "POST_SHELVE_SUCCESS";
const POST_SHELVE_FAILURE = "POST_SHELVE_FAILURE";

const LIKE_REVIEW = "LIKE_REVIEW";
const LIKE_REVIEW_PENDING = "LIKE_REVIEW_PENDING";
const LIKE_REVIEW_SUCCESS = "LIKE_REVIEW_SUCCESS";
const LIKE_REVIEW_FAILURE = "LIKE_REVIEW_FAILURE";

const DELETE_SHELVE = "DELETE_SHELVE";
const DELETE_SHELVE_PENDING = "DELETE_SHELVE_PENDING";
const DELETE_SHELVE_SUCCESS = "DELETE_SHELVE_SUCCESS";
const DELETE_SHELVE_FAILURE = "DELETE_SHELVE_FAILURE";

const requestLogin = (id, pw) => {
  return axios.post(`http://localhost:8080/login`, {
    email: id,
    password: pw,
  });
};
const requestLogout = () => {
  return axios.post(`http://localhost:8080/logout`);
};
const requestCheck = (atk) => {
  const api = axios.create({
    headers: {
      Authorization: `${atk}`,
    },
  });
  return api.post(`http://localhost:8080/profile`);
};

const requsetPostShelve = (uid, id, type) => {
  return axios.post(`http://localhost:8080/shelve`, {
    uid,
    id,
    type,
  });
};
const requestLikeReview = (type, id, uid, m_id) => {
  return axios.post(`http://localhost:8080/review/like`, {
    type,
    id,
    uid,
    m_id,
  });
};
const requestDeleteShelve = (uid, id, type) => {
  console.log(uid, id, type);
  return axios.delete(`http://localhost:8080/shelve`, {
    data: { uid, id, type },
  });
};
export const check = (atk) => ({
  type: USER_CHECK,
  payload: requestCheck(atk),
});
export const logout = () => ({
  type: LOGOUT,
  payload: requestLogout(),
});
export const login = (id, pw) => ({
  type: LOGIN,
  payload: requestLogin(id, pw),
});
export const postShelve = (email, isbn, title, authors, type, thumbnail) => ({
  type: POST_SHELVE,
  payload: requsetPostShelve(email, isbn, title, authors, type, thumbnail),
});
export const postLike = (type, id, uid, m_id) => ({
  type: LIKE_REVIEW,
  payload: requestLikeReview(type, id, uid, m_id),
});
export const deleteShelve = (uid, bid, type) => ({
  type: DELETE_SHELVE,
  payload: requestDeleteShelve(uid, bid, type),
});
const initialState = {
  pending: true,
  error: false,
  success: false,
  profile: {},
  isLoggedIn: false,
};

export default handleActions(
  {
    //LOGIN
    [LOGIN_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [LOGIN_SUCCESS]: (state, action) => {
      console.log(action.payload.data);
      return {
        profile: action.payload.data,
        pending: false,
        error: false,
        isLoggedIn: true,
      };
    },
    [LOGIN_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
        isLoggedIn: false,
      };
    },
    //USER_CHECK
    [USER_CHECK_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
        isLoggedIn: false,
      };
    },
    [USER_CHECK_SUCCESS]: (state, action) => {
      return {
        pending: false,
        error: false,
        isLoggedIn: true,
        profile: action.payload.data,
      };
    },
    [USER_CHECK_FAILURE]: (state, action) => {
      return {
        pending: false,
        error: true,
        isLoggedIn: false,
      };
    },
    //LOGOUT
    [LOGOUT_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
        isLoggedIn: false,
      };
    },
    [LOGOUT_SUCCESS]: (state, action) => {
      return {
        pending: false,
        error: false,
        isLoggedIn: false,
        profile: {},
      };
    },
    [LOGOUT_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
    //POST_SHELVE
    [POST_SHELVE_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [POST_SHELVE_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        pending: false,
        error: false,
        profile: data,
      };
    },
    [POST_SHELVE_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
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
      const { data } = action.payload;
      return {
        ...state,
        pending: false,
        error: false,
        success: true,
        profile: data,
      };
    },
    [LIKE_REVIEW_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
    [DELETE_SHELVE_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [DELETE_SHELVE_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        profile: data,
        pending: false,
        error: false,
      };
    },
    [DELETE_SHELVE_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
