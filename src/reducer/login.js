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
    }
  },
  initialState
);
