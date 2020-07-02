import { handleActions } from "redux-actions";
import axios from "axios";

export const GET_BOOKS = "GET_BOOKS";
export const GET_BOOKS_PENGIND = "GET_BOOKS_PENDING";
export const GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS";
export const GET_BOOKS_FAILURE = "GET_BOOKS_FAILURE";

export const GET_SLIDER_BOOKS = "GET_SLIDER_BOOKS";
export const GET_SLIDER_BOOKS_PENGIND = "GET_SLIDER_BOOKS_PENDING";
export const GET_SLIDER_BOOKS_SUCCESS = "GET_SLIDER_BOOKS_SUCCESS";
export const GET_SLIDER_BOOKS_FAILURE = "GET_SLIDER_BOOKS_FAILURE";

export const GET_SEARCH_BOOKS = "GET_SEARCH_BOOKS"; //검색 요청
export const GET_SEARCH_BOOKS_PENGIND = "GET_SEARCH_BOOKS_PENDING";
export const GET_SEARCH_BOOKS_SUCCESS = "GET_SEARCH_BOOKS_SUCCESS";
export const GET_SEARCH_BOOKS_FAILURE = "GET_SEARCH_BOOKS_FAILURE";

export const GET_MORE_BOOKS = "GET_MORE_BOOKS";
export const GET_MORE_BOOKS_PENGIND = "GET_MORE_BOOKS_PENDING";
export const GET_MORE_BOOKS_SUCCESS = "GET_MORE_BOOKS_SUCCESS";
export const GET_MORE_BOOKS_FAILURE = "GET_MORE_BOOKS_FAILURE";

export const POST_BOOK = "POST_BOOK";
export const POST_BOOK_PENDING = "POST_BOOK_PENDING";
export const POST_BOOK_SUCCESS = "POST_BOOK_SUCCESS";
export const POST_BOOK_FAILURE = "POST_BOOK_FAILURE";

export const GET_VOTE_REVIEW = "GET_VOTE_REVIEW";
export const GET_VOTE_REVIEW_PENDING = "GET_VOTE_REVIEW_PENDING";
export const GET_VOTE_REVIEW_SUCCESS = "GET_VOTE_REVIEW_SUCCESS";
export const GET_VOTE_REVIEW_FAILURE = "GET_VOTE_REVIEW_FAILURE";

export const GET_DETAIL = "GET_DETAIL";
export const GET_DETAIL_PENDING = "GET_DETAIL_PENDING";
export const GET_DETAIL_SUCCESS = "GET_DETAIL_SUCCESS";
export const GET_DETAIL_FAILURE = "GET_DETAIL_FAILURE";

export const POST_RATE = "POST_RATE";
export const POST_RATE_PENDING = "POST_RATE_PENDING";
export const POST_RATE_SUCCESS = "POST_RATE_SUCCESS";
export const POST_RATE_FAILURE = "POST_RATE_FAILURE";

const requestAllBooks = (type, page) => {
  return axios.get(
    `http://localhost:8080/books/${decodeURI(type)}?page=${page}`
  );
};
const requestSliderBooks = () => {
  return axios.get(`http://localhost:8080/sliders`);
};

const requestgetBooks = (query, type, page) => {
  return axios.get(
    `http://localhost:8080/search?q=${decodeURI(query)}&type=${0}`
  );
};
const requestInfo = (id) => {
  return axios.get(`http://localhost:8080/book/${id}`);
};
const requestPostRate = (id, name, vote) => {
  return axios.post(`http://localhost:8080/book/${id}`, {
    vote,
    name,
  });
};

export const getAllBooks = (type, page) => ({
  type: GET_BOOKS,
  payload: requestAllBooks(type, page),
});
export const getSliderBooks = () => ({
  type: GET_SLIDER_BOOKS,
  payload: requestSliderBooks(),
});

export const getBooks = (query = " ", type = 0, page = 1) => ({
  type: GET_SEARCH_BOOKS,
  payload: requestgetBooks(query, type, page),
});
export const getMore = (query = "", type = 0, page = 1) => ({
  type: GET_MORE_BOOKS,
  payload: requestgetBooks(query, type, page),
});
export const getDetail = (id) => ({
  type: GET_DETAIL,
  payload: requestInfo(id),
});
export const postRate = (id, name, vote) => ({
  type: POST_RATE,
  payload: requestPostRate(id, name, vote),
});

const initialState = {
  allBookPending: false,
  allBookPerror: false,
  allBookDone: false,
  books: [],
  morePending: false,
  moreError: "",
  sliderBooks: [],
  sliderPending: false,
  sliderError: "",
  total: 0,
  vote_pending: false,
  vote_error: false,
  vote_success: false,
  term: "",
  book: {},
};

export default handleActions(
  {
    [GET_SLIDER_BOOKS_PENGIND]: (state, action) => {
      return {
        ...state,
        sliderPending: true,
      };
    },
    [GET_SLIDER_BOOKS_SUCCESS]: (state, action) => {
      const {
        data: { books },
      } = action.payload;
      return {
        ...state,
        sliderBooks: books,
        sliderPending: true,
      };
    },
    [GET_SLIDER_BOOKS_FAILURE]: (state, action) => {
      return {
        ...state,
        sliderPending: false,
      };
    },

    [GET_BOOKS_PENGIND]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_BOOKS_SUCCESS]: (state, action) => {
      const {
        data: { books, page },
      } = action.payload;
      console.log(books);
      return {
        ...state,
        allBookPending: false,
        allBookError: false,
        allBookDone: books.length < 15 ? true : false,
        books:
          state.books === undefined || parseInt(page, 10) === 1
            ? books
            : [...state.books, ...books],
      };
    },
    [GET_BOOKS_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
    [GET_SEARCH_BOOKS_PENGIND]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_SEARCH_BOOKS_SUCCESS]: (state, action) => {
      const {
        data: { books },
      } = action.payload;
      return {
        ...state,
        pending: false,
        error: false,
        books: books,
      };
    },
    [GET_MORE_BOOKS_PENGIND]: (state, action) => {
      return {
        ...state,
        morePending: true,
        moreError: false,
      };
    },
    [GET_MORE_BOOKS_SUCCESS]: (state, action) => {
      const {
        data: { documents },
      } = action.payload;
      return {
        ...state,
        morePending: false,
        moreError: false,
        books: [...state.books, ...documents],
      };
    },
    [GET_MORE_BOOKS_FAILURE]: (state, action) => {
      return {
        ...state,
        morePending: false,
        moreError: true,
      };
    },
    [POST_RATE_PENDING]: (state, action) => {
      return {
        ...state,
        vote_pending: true,
        vote_error: false,
        vote_success: false,
      };
    },
    [POST_RATE_SUCCESS]: (state, action) => {
      const {
        data: { book },
      } = action.payload;
      console.log(book);
      return {
        ...state,
        vote_pending: false,
        vote_error: false,
        vote_success: true,
        book,
      };
    },
    [POST_RATE_FAILURE]: (state, action) => {
      return {
        ...state,
        vote_pending: false,
        vote_error: true,
        vote_success: false,
      };
    },
    [GET_DETAIL_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_DETAIL_SUCCESS]: (state, action) => {
      const {
        data: { book },
      } = action.payload;
      return {
        ...state,
        pending: true,
        error: false,
        book,
        votes: book.votes,
      };
    },
    [GET_DETAIL_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
