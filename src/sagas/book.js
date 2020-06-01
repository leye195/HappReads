import { all, fork, call, put, takeLatest } from "redux-saga/effects";
import {
  POST_BOOKS,
  POST_BOOK_SUCCESS,
  POST_BOOK_FAILURE,
  GET_MORE_BOOKS,
  GET_MORE_BOOKS_FAILURE,
  GET_MORE_BOOKS_SUCCESS,
  GET_BOOKS,
  GET_SEARCH_BOOKS,
  GET_SEARCH_BOOKS_FAILURE,
  GET_SEARCH_BOOKS_SUCCESS,
  GET_VOTE_REVIEW,
  GET_VOTE_REVIEW_SUCCESS,
  GET_VOTE_REVIEW_FAILURE,
  GET_DETAIL,
  GET_DETAIL_FAILURE,
  GET_DETAIL_SUCCESS
} from "../reducer/books";
import { UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAILURE } from "../reducer/upload";
import {
  GET_REVIEWS,
  GET_REVIEW,
  POST_REVIEW,
  DELETE_REVIEW,
  EDIT_REVIEW,
  GET_REVIEWS_FAILURE,
  GET_REVIEWS_SUCCESS,
  POST_REVIEW_FAILURE,
  POST_REVIEW_SUCCESS,
  EDIT_REVIEW_FAILURE,
  EDIT_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
  DELETE_REVIEW_SUCCESS
} from "../reducer/review";
import axios from "axios";
function mainBooksAPI() {
  return axios.get(`/books`, { withCredentials: true });
}
function* mainBooks() {
  try {
    const result = yield call(mainBooksAPI);
    yield put({
      type: GET_MORE_BOOKS_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_MORE_BOOKS_FAILURE,
      error: e
    });
  }
}
function* watchMainBooks() {
  yield takeLatest(GET_BOOKS, mainBooks);
}

function searchBooksAPI(data) {
  const { query, type, page } = data;
  const api = axios.create({
    headers: {
      Authorization: `KakaoAK ${"dcf8990c616ed7f54a7a2fe1ab632c0b"}`
    }
  });
  if (parseInt(type) === 0)
    return api.get(
      `https://dapi.kakao.com/v3/search/book?query=${query}&page=${page}`,
      { withCredentials: true }
    );
  else if (parseInt(type) === 1)
    return api.get(
      `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&page=${page}`,
      { withCredentials: true }
    );
  else if (parseInt(type) === 2)
    return api.get(
      `https://dapi.kakao.com/v3/search/book?target=person&query=${query}&page=${page}`,
      { withCredentials: true }
    );
  else if (parseInt(type) === 3) {
    return api.get(
      `https://dapi.kakao.com/v3/search/book?target=isbn&query=${query}`,
      { withCredentials: true }
    );
  }
}
function* searchBooks(action) {
  try {
    const result = yield call(searchBooksAPI, action.payload);
    yield put({
      type: GET_SEARCH_BOOKS_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_SEARCH_BOOKS_FAILURE,
      error: e
    });
  }
}
function* watchSearchBooks() {
  yield takeLatest(GET_SEARCH_BOOKS, searchBooks);
}

function moreBooksAPI(data) {
  const { query, type, page } = data;
  const api = axios.create({
    headers: {
      Authorization: `KakaoAK ${"dcf8990c616ed7f54a7a2fe1ab632c0b"}`
    }
  });
  if (parseInt(type) === 0)
    return api.get(
      `https://dapi.kakao.com/v3/search/book?query=${query}&page=${page}`,
      { withCredentials: true }
    );
  else if (parseInt(type) === 1)
    return api.get(
      `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&page=${page}`,
      { withCredentials: true }
    );
  else if (parseInt(type) === 2)
    return api.get(
      `https://dapi.kakao.com/v3/search/book?target=person&query=${query}&page=${page}`,
      { withCredentials: true }
    );
  else if (parseInt(type) === 3) {
    return api.get(
      `https://dapi.kakao.com/v3/search/book?target=isbn&query=${query}`,
      { withCredentials: true }
    );
  }
}
function* moreBooks(action) {
  try {
    const result = yield call(moreBooksAPI, action.payload);
    yield put({
      type: GET_MORE_BOOKS_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_MORE_BOOKS_FAILURE,
      error: e
    });
  }
}
function* watchMoreBooks() {
  yield takeLatest(GET_MORE_BOOKS, moreBooks);
}

function addBooksAPI(data) {
  const { title, authors, vote, isbn, name, thumbnail } = data;
  return axios.post(
    `/book/${data.isbn}`,
    { title, authors, vote, isbn, name, thumbnail },
    { withCredentials: true }
  );
}
function* addBooks(action) {
  try {
    const result = yield call(addBooksAPI, action.payload);
    yield put({
      type: POST_BOOK_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: POST_BOOK_FAILURE,
      error: e
    });
  }
}
function* watchAddBooks() {
  yield takeLatest(POST_BOOKS, addBooks);
}

function getVoteReviewAPI(data) {
  return axios.get(`http://localhost:8080/book/${data.isbn}`);
}
function* getVoteReview(action) {
  try {
    const result = yield call(getVoteReviewAPI, action.payload);
    yield put({
      type: GET_VOTE_REVIEW_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_VOTE_REVIEW_FAILURE,
      error: e
    });
  }
}
function* watchVoteReview() {
  yield takeLatest(GET_VOTE_REVIEW, getVoteReview);
}

function loadDetailAPI(data) {
  const { query } = data;
  const api = axios.create({
    headers: {
      Authorization: `KakaoAK ${"dcf8990c616ed7f54a7a2fe1ab632c0b"}`
    }
  });
  return api.get(
    `https://dapi.kakao.com/v3/search/book?target=isbn&query=${query}`,
    { withCredentials: true }
  );
}
function* loadDetail(action) {
  try {
    const result = yield call(loadDetailAPI, action.payload);
    yield put({
      type: GET_DETAIL_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_DETAIL_FAILURE,
      error: e
    });
  }
}
function* watchLoadDetail() {
  yield takeLatest(GET_DETAIL, loadDetail);
}

function uploadAPI(data) {
  return axios.post(`/upload`, data, { withCredentials: true });
}
function* upload(action) {
  try {
    const result = yield call(uploadAPI, action.payload);
    yield put({
      type: UPLOAD_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_FAILURE,
      error: e
    });
  }
}
function* watchUpload() {
  yield takeLatest(UPLOAD, upload);
}

function loadReviewsAPI() {
  return axios.get(`/reviews`, { withCredentials: true });
}
function* loadReviews() {
  try {
    const result = yield call(loadReviewsAPI);
    yield put({
      type: GET_REVIEWS_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_REVIEWS_FAILURE,
      error: e
    });
  }
}
function* watchLoadReviews() {
  yield takeLatest(GET_REVIEWS, loadReviews);
}

function loadReviewAPI(data) {
  return axios.get(`/book/${data.isbn}/review`, { withCredentials: true });
}
function* loadReview(action) {
  try {
    const result = yield call(loadReviewAPI, action.payload);
    yield put({
      type: GET_REVIEWS_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: GET_REVIEWS_FAILURE,
      error: e
    });
  }
}
function* watchLoadReview() {
  yield takeLatest(GET_REVIEW, loadReview);
}

function addReviewAPI(data) {
  const { name, isbn, content, book } = data;
  return axios.post(
    `/book/${isbn}/review`,
    {
      name,
      isbn,
      content,
      book
    },
    { withCredentials: true }
  );
}
function* addReview(action) {
  try {
    const result = yield call(addReviewAPI, action.payload);
    yield put({
      type: POST_REVIEW_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: POST_REVIEW_FAILURE,
      error: e
    });
  }
}
function* watchAddReview() {
  yield takeLatest(POST_REVIEW, addReview);
}

function removeReviewAPI(data) {
  const { isbn, rid, uid, from } = data;
  return axios.post(`/book/${isbn}/review/${rid}`, {
    uid,
    from
  });
}
function* removeReview(action) {
  try {
    const result = yield call(removeReviewAPI, action.payload);
    yield put({
      type: DELETE_REVIEW_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: DELETE_REVIEW_FAILURE,
      error: e
    });
  }
}
function* watchRemoveReview() {
  yield takeLatest(DELETE_REVIEW, removeReview);
}

function editReviewAPI(data) {
  const { rid, content } = data;
  return axios.post(
    `/book/review/${rid}`,
    { content },
    { withCredentials: true }
  );
}
function* editReview(action) {
  try {
    const result = yield call(editReviewAPI, action.payload);
    yield put({
      type: EDIT_REVIEW_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: EDIT_REVIEW_FAILURE,
      error: e
    });
  }
}
function* watchEditReview() {
  yield takeLatest(EDIT_REVIEW, editReview);
}

export function* bookSaga() {
  yield all([
    fork(watchMainBooks),
    fork(watchSearchBooks),
    fork(watchMoreBooks),
    fork(watchAddBooks),
    fork(watchVoteReview),
    fork(watchLoadDetail),
    fork(watchUpload),
    fork(watchLoadReview),
    fork(watchLoadReviews),
    fork(watchAddReview),
    fork(watchEditReview),
    fork(watchRemoveReview)
  ]);
}
