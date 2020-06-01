import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  USER_CHECK,
  USER_CHECK_SUCCESS,
  USER_CHECK_FAILURE
} from "../reducer/login";
import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "../reducer/signup";
import {
  GET_TOP_READERS,
  GET_TOP_READERS_SUCCESS,
  GET_TOP_READERS_FAILURE,
  GET_TOP_REVIEWERS,
  GET_TOP_REVIEWERS_SUCCESS,
  GET_TOP_REVIEWERS_FAILURE,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from "../reducer/user";

function signupAPI(data) {
  return axios.post(`/signup`, data);
}
function* signup(action) {
  try {
    yield call(signupAPI, action.payload);
    yield put({
      type: SIGNUP_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGNUP_FAILURE,
      error: e
    });
  }
}
function* watchSignUp() {
  yield takeLatest(SIGNUP, signup);
}

function loginAPI(data) {
  return axios.post(
    `/login`,
    {
      email: data.id,
      password: data.pw
    },
    {
      withCredentials: true
    }
  );
}
function* login(action) {
  try {
    const result = yield call(loginAPI, action.payload);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOGIN_FAILURE,
      error: e
    });
  }
}
function* watchLogin() {
  yield takeLatest(LOGIN, login);
}

function logoutAPI() {
  return axios.post(`/logout`, {}, { withCredentials: true });
}
function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOGOUT_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOGOUT_FAILURE,
      error: e
    });
  }
}
function* watchLogout() {
  yield takeLatest(LOGOUT, logout);
}

function loadUserAPI() {
  return axios.get(`/profile`, {
    withCredentials: true
  });
}
function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    put({
      type: USER_CHECK_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: USER_CHECK_FAILURE,
      error: e
    });
  }
}
function* watchLoadUser() {
  yield takeLatest(USER_CHECK, loadUser);
}

function loadTopReadersAPI(data) {
  return axios.get(`/rank/reader/${data.type}`);
}
function* loadTopReaders(action) {
  try {
    const result = yield call(loadTopReadersAPI, action.payload);
    yield put({
      type: GET_TOP_READERS_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_TOP_READERS_FAILURE,
      error: e
    });
  }
}
function* watchLoadTopReaders() {
  yield takeLatest(GET_TOP_READERS, loadTopReaders);
}

function loadTopReviewersAPI(data) {
  return axios.get(`/rank/reviewer/${data.type}`);
}
function* loadTopReviewers(action) {
  try {
    const result = yield call(loadTopReviewersAPI, action.payload);
    yield put({
      type: GET_TOP_REVIEWERS_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_TOP_REVIEWERS_FAILURE,
      error: e
    });
  }
}
function* watchLoadTopReviewes() {
  yield takeLatest(GET_TOP_REVIEWERS, loadTopReviewers);
}

function loadProfileAPI(data) {
  return axios.get(`/profile/${data.id}`);
}
function* loadProfile(action) {
  try {
    const result = yield call(loadProfileAPI, action.payload);
    yield put({
      type: GET_USER_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_USER_FAILURE,
      error: e
    });
  }
}
function* watchLoadProfile() {
  yield takeLatest(GET_USER, loadProfile);
}
export function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchLoadProfile),
    fork(watchLoadTopReaders),
    fork(watchLoadTopReviewes)
  ]);
}
