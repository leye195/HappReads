import { handleActions } from "redux-actions";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : "https://happread.herokuapp.com/";

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

export const POST_SHELVE_INIT = "POST_SHELVE_INIT";
export const POST_SHELVE = "POST_SHELVE";
export const POST_SHELVE_PENDING = "POST_SHELVE_PENDING";
export const POST_SHELVE_SUCCESS = "POST_SHELVE_SUCCESS";
export const POST_SHELVE_FAILURE = "POST_SHELVE_FAILURE";

export const DELETE_SHELVE = "DELETE_SHELVE";
export const DELETE_SHELVE_PENDING = "DELETE_SHELVE_PENDING";
export const DELETE_SHELVE_SUCCESS = "DELETE_SHELVE_SUCCESS";
export const DELETE_SHELVE_FAILURE = "DELETE_SHELVE_FAILURE";

export const DELETE_REVIEW = "DELETE_REVIEW";
export const DELETE_REVIEW_PENDING = "DELETE_REVIEW_PENDING";
export const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_FAILURE = "DELETE_REVIEW_FAILURE";

export const EDIT_PROFILE = "EDIT_PROFILE";
export const EDIT_PROFILE_PENDING = "EDIT_PROFILE_PENDING";
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS";
export const EDIT_PROFILE_FAILURE = "EDIT_PROFILE_FAILURE";

const requestLogin = (id, pw) => {
  return axios.post(`login`, {
    email: id,
    password: pw,
  });
};
const requestLogout = () => {
  return axios.post(`logout`);
};
const requestCheck = (atk) => {
  const api = axios.create({
    headers: {
      Authorization: `${atk}`,
    },
  });
  return api.post(`profile`);
};

const requsetPostShelve = (email, id, type) => {
  return axios.post(`shelve`, {
    email,
    id,
    type,
  });
};
const requestDeleteShelve = (uid, id, type = null) => {
  //console.log(uid, id, type);
  return axios.delete(`shelve`, {
    data: { uid, id, type },
  });
};
const requestDeleteReview = (id, rid, uid) => {
  return axios.delete(`book/${id}/review/${rid}`, {
    data: {
      uid,
    },
  });
};
const requestEditProfile = (data) => {
  return axios.post(`edit`, data);
};

export const check = (atk) => ({
  type: USER_CHECK,
  payload: requestCheck(atk),
});
export const editProfile = (data) => ({
  type: EDIT_PROFILE,
  payload: requestEditProfile(data),
});
export const logout = () => ({
  type: LOGOUT,
  payload: requestLogout(),
});
export const login = (id, pw) => ({
  type: LOGIN,
  payload: requestLogin(id, pw),
});
export const postShelve = (email, id, type) => ({
  type: POST_SHELVE,
  payload: requsetPostShelve(email, id, type),
});
export const deleteShelve = (uid, bid, type) => ({
  type: DELETE_SHELVE,
  payload: requestDeleteShelve(uid, bid, type),
});
export const deleteReview = (id, rid, uid) => ({
  type: DELETE_REVIEW,
  payload: requestDeleteReview(id, rid, uid),
});
export const initPostShelve = () => ({
  type: POST_SHELVE_INIT,
  payload: {
    postShelvePending: false,
    postShelveSuccess: false,
    postShelveError: false,
  },
});

const initialState = {
  pending: true,
  error: false,
  success: false,
  profile: {},
  isLoggedIn: false,
  loginPending: false,
  loginError: false,
  loginSuccess: false,
  logoutPending: false,
  logoutSuccess: false,
  logoutError: false,
  postShelvePending: false,
  postShelveSuccess: false,
  postShelveError: false,
};

export default handleActions(
  {
    //LOGIN
    [LOGIN_PENDING]: (state, action) => {
      return {
        ...state,
        loginPending: true,
        loginError: false,
        loginSuccess: false,
      };
    },
    [LOGIN_SUCCESS]: (state, action) => {
      return {
        profile: action.payload.data,
        loginPending: false,
        loginError: false,
        loginSuccess: true,
        isLoggedIn: true,
      };
    },
    [LOGIN_FAILURE]: (state, action) => {
      console.log();
      return {
        ...state,
        loginPending: false,
        loginError: true,
        loginSuccess: false,
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
      // const { data } = action.payload;
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
        logoutPending: true,
        logoutError: false,
        logoutSuccess: false,
      };
    },
    [LOGOUT_SUCCESS]: (state, action) => {
      //console.log(action.payload);
      return {
        ...state,
        logoutPending: false,
        logoutError: false,
        logoutSuccess: true,
        isLoggedIn: false,
        profile: {},
      };
    },
    [LOGOUT_FAILURE]: (state, action) => {
      return {
        ...state,
        logoutPending: false,
        logoutError: true,
        logoutSuccess: false,
      };
    },
    [POST_SHELVE_INIT]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        postShelveSuccess: false,
        postShelveError: false,
        postShelvePending: false,
      };
    },
    //POST_SHELVE
    [POST_SHELVE_PENDING]: (state, action) => {
      return {
        ...state,
        postShelvePending: true,
        postShelveSuccess: false,
        postShelveError: false,
      };
    },
    [POST_SHELVE_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        postShelvePending: false,
        postShelveSuccess: true,
        profile: data,
      };
    },
    [POST_SHELVE_FAILURE]: (state, action) => {
      return {
        ...state,
        postShelvePending: false,
        postShelveError: true,
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
    [DELETE_REVIEW_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [DELETE_REVIEW_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        pending: false,
        error: true,
        profile: data,
      };
    },
    [DELETE_REVIEW_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
