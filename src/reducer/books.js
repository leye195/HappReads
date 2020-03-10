import { handleActions } from "redux-actions";
import axios from "axios";

const GET_BOOKS = "GET_BOOKS";
const GET_BOOKS_PENGIND = "GET_BOOKS_PENDING";
const GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS";
const GET_BOOKS_FAILURE = "GET_BOOKS_FAILURE";

const GET_SEARCH_BOOKS = "GET_SEARCH_BOOKS"; //검색 요청
const GET_SEARCH_BOOKS_PENGIND = "GET_SEARCH_BOOKS_PENDING";
const GET_SEARCH_BOOKS_SUCCESS = "GET_SEARCH_BOOKS_SUCCESS";
const GET_SEARCH_BOOKS_FAILURE = "GET_SEARCH_BOOKS_FAILURE";

const GET_MORE_BOOKS = "GET_MORE_BOOKS";
const GET_MORE_BOOKS_PENGIND = "GET_MORE_BOOKS_PENDING";
const GET_MORE_BOOKS_SUCCESS = "GET_MORE_BOOKS_SUCCESS";
const GET_MORE_BOOKS_FAILURE = "GET_MORE_BOOKS_FAILURE";

const POST_BOOK = "POST_BOOK";
const POST_BOOK_PENDING = "POST_BOOK_PENDING";
const POST_BOOK_SUCCESS = "POST_BOOK_SUCCESS";
const POST_BOOK_FAILURE = "POST_BOOK_FAILURE";

const GET_VOTE_REVIEW = "GET_VOTE_REVIEW";
const GET_VOTE_REVIEW_PENDING = "GET_VOTE_REVIEW_PENDING";
const GET_VOTE_REVIEW_SUCCESS = "GET_VOTE_REVIEW_SUCCESS";
const GET_VOTE_REVIEW_FAILURE = "GET_VOTE_REVIEW_FAILURE";

const GET_DETAIL = "GET_DETAIL";
const GET_DETAIL_PENDING = "GET_DETAIL_PENDING";
const GET_DETAIL_SUCCESS = "GET_DETAIL_SUCCESS";
const GET_DETAIL_FAILURE = "GET_DETAIL_FAILURE";

const requestAllBooks = () => {
  return axios.get(`http://localhost:8080/books`);
};

const requestpostBook = (title, authors, vote, isbn, name, thumbnail) => {
  return axios.post(`http://localhost:8080/book/${isbn}`, {
    title,
    authors,
    vote,
    isbn,
    name,
    thumbnail
  });
};

const requestgetBooks = (query, type, page) => {
  const api = axios.create({
    headers: {
      Authorization: `KakaoAK ${"dcf8990c616ed7f54a7a2fe1ab632c0b"}`
    }
  });
  if (parseInt(type) === 0)
    return api.get(
      `https://dapi.kakao.com/v3/search/book?query=${query}&page=${page}`
    );
  else if (parseInt(type) === 1)
    return api.get(
      `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&page=${page}`
    );
  else if (parseInt(type) === 2)
    return api.get(
      `https://dapi.kakao.com/v3/search/book?target=person&query=${query}&page=${page}`
    );
  else if (parseInt(type) === 3) {
    return api.get(
      `https://dapi.kakao.com/v3/search/book?target=isbn&query=${query}`
    );
  }
};

const requestInfo = isbn => {
  return axios.get(`http://localhost:8080/book/${isbn}`);
};

export const getAllBooks = () => ({
  type: GET_BOOKS,
  payload: requestAllBooks()
});

export const postBook = (title, authors, vote, isbn, name, thumbnail) => ({
  type: POST_BOOK,
  payload: requestpostBook(title, authors, vote, isbn, name, thumbnail)
});

export const getBooks = (query = " ", type = 0, page = 1) => ({
  type: GET_SEARCH_BOOKS,
  payload: requestgetBooks(query, type, page)
});
export const getMore = (query = "", type = 0, page = 1) => ({
  type: GET_MORE_BOOKS,
  payload: requestgetBooks(query, type, page)
});

export const getDetail = query => ({
  type: GET_DETAIL,
  payload: requestgetBooks(query, 3, 1)
});
export const getInfo = isbn => ({
  //getVote
  type: GET_VOTE_REVIEW,
  payload: requestInfo(isbn)
});

const initialState = {
  pending: false,
  error: false,
  books: [],
  total: 0,
  vote_pending: false,
  vote_error: false,
  vote_success: false,
  votes: []
};

export default handleActions(
  {
    [GET_BOOKS_PENGIND]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },
    [GET_BOOKS_SUCCESS]: (state, action) => {
      //console.log(action.payload);
      const { data } = action.payload;
      return {
        pending: false,
        error: false,
        books: data.books
      };
    },
    [GET_BOOKS_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true
      };
    },
    [GET_SEARCH_BOOKS_PENGIND]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },
    [GET_SEARCH_BOOKS_SUCCESS]: (state, action) => {
      const {
        data: { documents }
      } = action.payload;
      return {
        ...state,
        pending: false,
        error: false,
        books: [...documents]
      };
    },
    [GET_MORE_BOOKS_PENGIND]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },
    [GET_MORE_BOOKS_SUCCESS]: (state, action) => {
      const {
        data: { documents }
      } = action.payload;
      return {
        ...state,
        pending: false,
        error: false,
        books: [...state.books, ...documents]
      };
    },
    [GET_MORE_BOOKS_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true
      };
    },
    [POST_BOOK_PENDING]: (state, action) => {
      return {
        ...state,
        vote_pending: true,
        vote_error: false,
        vote_success: false
      };
    },
    [POST_BOOK_SUCCESS]: (state, action) => {
      return {
        ...state,
        vote_pending: false,
        vote_error: false,
        vote_success: true
      };
    },
    [POST_BOOK_FAILURE]: (state, action) => {
      return {
        ...state,
        vote_pending: false,
        vote_error: true,
        vote_success: false
      };
    },
    [GET_VOTE_REVIEW_PENDING]: (state, action) => {
      return {
        ...state
      };
    },
    [GET_VOTE_REVIEW_SUCCESS]: (state, action) => {
      const {
        data: { votes }
      } = action.payload;
      console.log(action.payload);
      return {
        ...state,
        votes
      };
    },
    [GET_VOTE_REVIEW_FAILURE]: (state, action) => {
      return {
        ...state,
        votes: []
      };
    },
    [GET_DETAIL_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },
    [GET_DETAIL_SUCCESS]: (state, action) => {
      const {
        data: { documents }
      } = action.payload;
      return {
        pending: true,
        error: false,
        books: documents
      };
    },
    [GET_DETAIL_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true
      };
    }
  },
  initialState
);
