import { handleActions } from "redux-actions";
import axios from "axios";

const USER_CHECK = "USER_CHECK";
const USER_CHECK_PENDING = "USER_CHECK_PENDING";
const USER_CHECK_SUCCESS = "USER_CHECK_SUCCESS";
const USER_CHECK_FAILURE = "USER_CHECK_FAILURE";

const LOGIN = "LOGIN";
const LOGIN_PENDING = "LOGIN_PENDING";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

const LOGOUT = "LOGOUT";
const LOGOUT_PENDING = "LOGOUT_PENDING";
const LOGOUT_SUCCESS = "LOGOUR_SUCCESS";
const LOGOUT_FAILURE = "LOGOUT_FAILURE";

const POST_SHELVE = "POST_SHELVE";
const POST_SHELVE_PENDING = "POST_SHELVE_PENDING";
const POST_SHELVE_SUCCESS = "POST_SHELVE_SUCCESS";
const POST_SHELVE_FAILURE = "POST_SHELVE_FAILURE";

const requestLogin = (id, pw) => {
  return axios.post(`http://localhost:8080/login`, {
    email: id,
    password: pw
  });
};
const requestLogout = () => {
  return axios.post(`http://localhost:8080/logout`);
};
const requestCheck = atk => {
  const api = axios.create({
    headers: {
      Authorization: `${atk}`
    }
  });
  return api.post(`http://localhost:8080/profile`);
};

const requsetPostShelve = (email, isbn, title, authors, type, thumbnail) => {
  return axios.post(`http://localhost:8080/shelve`, {
    email,
    isbn,
    title,
    authors,
    type,
    thumbnail
  });
};

export const check = atk => ({
  type: USER_CHECK,
  payload: requestCheck(atk)
});
export const logout = () => ({
  type: LOGOUT,
  payload: requestLogout()
});
export const login = (id, pw) => ({
  type: LOGIN,
  payload: requestLogin(id, pw)
});
export const postShelve = (email, isbn, title, authors, type, thumbnail) => ({
  type: POST_SHELVE,
  payload: requsetPostShelve(email, isbn, title, authors, type, thumbnail)
});
const initialState = {
  pending: false,
  error: false,
  profile: {},
  isLoggedIn: false
};

export default handleActions(
  {
    [LOGIN_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },
    [LOGIN_SUCCESS]: (state, action) => {
      return {
        profile: action.payload.data,
        pending: false,
        error: false,
        isLoggedIn: true
      };
    },
    [LOGIN_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
        isLoggedIn: false
      };
    },
    //USER_CHECK
    [USER_CHECK_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
        isLoggedIn: false
      };
    },
    [USER_CHECK_SUCCESS]: (state, action) => {
      return {
        pending: false,
        error: false,
        isLoggedIn: true,
        profile: action.payload.data
      };
    },
    [USER_CHECK_FAILURE]: (state, action) => {
      return {
        pending: false,
        error: true,
        isLoggedIn: false
      };
    },
    [LOGOUT_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
        isLoggedIn: false
      };
    },
    [LOGOUT_SUCCESS]: (state, action) => {
      return {
        pending: false,
        error: false,
        isLoggedIn: false,
        profile: {}
      };
    },
    [LOGOUT_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true
      };
    },
    [POST_SHELVE_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },
    [POST_SHELVE_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        pending: false,
        error: false,
        profile: data
      };
    },
    [POST_SHELVE_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true
      };
    }
  },
  initialState
);
