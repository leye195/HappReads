import { handleActions } from "redux-actions";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : "https://happread.herokuapp.com/";

export const GET_BOOKS = "GET_BOOKS"; //책 리스트
export const GET_BOOKS_PENGIND = "GET_BOOKS_PENDING";
export const GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS";
export const GET_BOOKS_FAILURE = "GET_BOOKS_FAILURE";

export const GET_SLIDER_BOOKS = "GET_SLIDER_BOOKS";
export const GET_SLIDER_BOOKS_PENGIND = "GET_SLIDER_BOOKS_PENDING";
export const GET_SLIDER_BOOKS_SUCCESS = "GET_SLIDER_BOOKS_SUCCESS";
export const GET_SLIDER_BOOKS_FAILURE = "GET_SLIDER_BOOKS_FAILURE";

export const GET_POPULAR_BOOKS = "GET_POPULAR_BOOKS"; //최근 공유 목록
export const GET_POPULAR_BOOKS_PENGIND = "GET_POPULAR_BOOKS_PENDING";
export const GET_POPULAR_BOOKS_SUCCESS = "GET_POPULAR_BOOKS_SUCCESS";
export const GET_POPULAR_BOOKS_FAILURE = "GET_POPULAR_BOOKS_FAILURE";

export const GET_RECENT_BOOKS = "GET_RECENT_BOOKS"; //최근 공유 목록
export const GET_RECENT_BOOKS_PENGIND = "GET_RECENT_BOOKS_PENDING";
export const GET_RECENT_BOOKS_SUCCESS = "GET_RECENT_BOOKS_SUCCESS";
export const GET_RECENT_BOOKS_FAILURE = "GET_RECENT_BOOKS_FAILURE";

export const GET_SEARCH_BOOKS = "GET_SEARCH_BOOKS"; //검색 요청
export const GET_SEARCH_BOOKS_PENGIND = "GET_SEARCH_BOOKS_PENDING";
export const GET_SEARCH_BOOKS_SUCCESS = "GET_SEARCH_BOOKS_SUCCESS";
export const GET_SEARCH_BOOKS_FAILURE = "GET_SEARCH_BOOKS_FAILURE";

export const GET_MORE_BOOKS = "GET_MORE_BOOKS";
export const GET_MORE_BOOKS_PENGIND = "GET_MORE_BOOKS_PENDING";
export const GET_MORE_BOOKS_SUCCESS = "GET_MORE_BOOKS_SUCCESS";
export const GET_MORE_BOOKS_FAILURE = "GET_MORE_BOOKS_FAILURE";

export const POST_BOOK = "POST_BOOK"; //책 업로드
export const POST_BOOK_PENDING = "POST_BOOK_PENDING";
export const POST_BOOK_SUCCESS = "POST_BOOK_SUCCESS";
export const POST_BOOK_FAILURE = "POST_BOOK_FAILURE";

export const EDIT_BOOK = "EDIT_BOOK"; //책 수정
export const EDIT_BOOK_PENDING = "EDIT_BOOK_PENDING";
export const EDIT_BOOK_SUCCESS = "EDIT_BOOK_SUCCESS";
export const EDIT_BOOK_FAILURE = "EDIT_BOOK_FAILURE";

export const GET_VOTE_REVIEW = "GET_VOTE_REVIEW"; //리뷰 작성
export const GET_VOTE_REVIEW_PENDING = "GET_VOTE_REVIEW_PENDING";
export const GET_VOTE_REVIEW_SUCCESS = "GET_VOTE_REVIEW_SUCCESS";
export const GET_VOTE_REVIEW_FAILURE = "GET_VOTE_REVIEW_FAILURE";

export const GET_DETAIL = "GET_DETAIL"; //상세목록
export const GET_DETAIL_PENDING = "GET_DETAIL_PENDING";
export const GET_DETAIL_SUCCESS = "GET_DETAIL_SUCCESS";
export const GET_DETAIL_FAILURE = "GET_DETAIL_FAILURE";

export const POST_RATE = "POST_RATE"; //평점
export const POST_RATE_PENDING = "POST_RATE_PENDING";
export const POST_RATE_SUCCESS = "POST_RATE_SUCCESS";
export const POST_RATE_FAILURE = "POST_RATE_FAILURE";

console.log(URL);
const requestAllBooks = (type, page) => {
  return axios.get(`${URL}books/type/${decodeURI(type)}?page=${page}`);
};
const requestSliderBooks = () => {
  return axios.get(`${URL}book/sliders`);
};
const requestgetBooks = (query, type=1, page=1) => {
  return axios.get(`${URL}book/search?q=${decodeURI(query)}&type=${type}&page=${page}`);
};
const requestInfo = (id) => {
  return axios.get(`${URL}book/${id}`);
};
const requestPostRate = (id, name, vote) => {
  return axios.post(`${URL}book/${id}`, {
    vote,
    name,
  });
};
const requestRecentBooks = () => {
  return axios.get(`${URL}books/recent`);
};
const requestPopularBooks = () => {
  return axios.get(`${URL}books/popular`);
};
const requestEditBook = (data) => {
  const { _id, title, contents, genres } = data;
  return axios.put(`${URL}book/${_id}`, {
    title,
    contents,
    genres,
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
export const getRecentBooks = () => ({
  type: GET_RECENT_BOOKS,
  payload: requestRecentBooks(),
});
export const getPopularBooks = () => ({
  type: GET_POPULAR_BOOKS,
  payload: requestPopularBooks(),
});
export const editBook = (data) => ({
  type: EDIT_BOOK,
  payload: requestEditBook(data),
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
  allBookSuccess: false,
  allBookError: false,
  allBookDone: false,
  books: [],
  morePending: false,
  moreError: "",
  moreDone: false,
  sliderBooks: [],
  sliderPending: false,
  sliderError: false,
  sliderSuccess: false,
  total: 0,
  vote_pending: false,
  vote_error: false,
  vote_success: false,
  term: "",
  book: {},
  bookPending: false,
  bookSuccess: false,
  bookFailure: false,
  recentBooks: [],
  recentPending: false,
  recentError: false,
  recentSuccess: false,
  popularBooks: [],
  popularPending: false,
  popularError: false,
  popularSuccess: false,
  editBookPending: false,
  editBookSuccess: false,
  editBookFailure: false,
  searchPending: false,
  searchSuccess: false,
  searchFailure: false,
};

export default handleActions(
  {
    [GET_SLIDER_BOOKS_PENGIND]: (state, action) => {
      return {
        ...state,
        sliderPending: true,
        sliderError: false,
        sliderSuccess: false,
      };
    },
    [GET_SLIDER_BOOKS_SUCCESS]: (state, action) => {
      const {
        data: { books },
      } = action.payload;
      return {
        ...state,
        sliderBooks: books,
        sliderPending: false,
        sliderSuccess: true,
      };
    },
    [GET_SLIDER_BOOKS_FAILURE]: (state, action) => {
      return {
        ...state,
        sliderPending: false,
        sliderError: true,
      };
    },

    [GET_BOOKS_PENGIND]: (state, action) => {
      return {
        ...state,
        allBookPending: true,
        allBookError: false,
        allBookSuccess: false,
        allBookDone: false,
      };
    },
    [GET_BOOKS_SUCCESS]: (state, action) => {
      const {
        data: { books, page },
      } = action.payload;
      return {
        ...state,
        allBookPending: false,
        allBookSuccess: true,
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
        allBookPending: false,
        allBookError: true,
      };
    },
    [GET_SEARCH_BOOKS_PENGIND]: (state, action) => {
      return {
        ...state,
        books: [],
        searchPending: true,
        searchSuccess: false,
        searchFailure: false,
      };
    },
    [GET_SEARCH_BOOKS_SUCCESS]: (state, action) => {
      const {
        data: { books },
      } = action.payload;
      return {
        ...state,
        searchPending: false,
        searchSuccess: true,
        books: books,
      };
    },
    [GET_SEARCH_BOOKS_FAILURE]: (state, action) => {
      return {
        ...state,
        searchPending: false,
        searchFailure: true,
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
        data: { books },
      } = action.payload;

      return {
        ...state,
        morePending: false,
        moreError: false,
        moreDone: books.length < 10,
        books: [...state.books, ...books],
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
      //console.log(book);
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
        bookPending: true,
        bookError: false,
      };
    },
    [GET_DETAIL_SUCCESS]: (state, action) => {
      const {
        data: { book },
      } = action.payload;
      return {
        ...state,
        bookPending: false,
        bookSuccess: true,
        book,
        votes: book.votes,
      };
    },
    [GET_DETAIL_FAILURE]: (state, action) => {
      return {
        ...state,
        bookPending: false,
        bookError: true,
      };
    },
    [GET_RECENT_BOOKS_PENGIND]: (state, action) => {
      return {
        ...state,
        recentPending: true,
        recentError: false,
        recentSuccess: false,
      };
    },
    [GET_RECENT_BOOKS_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      //console.log(",", data);
      return {
        ...state,
        recentBooks: data,
        recentPending: false,
        recentSuccess: true,
      };
    },
    [GET_RECENT_BOOKS_FAILURE]: (state, action) => {
      return {
        ...state,
        recentPending: true,
        recentError: true,
      };
    },
    [GET_POPULAR_BOOKS_PENGIND]: (state, action) => {
      return {
        ...state,
        popularPending: true,
        popularError: false,
        popularSuccess: false,
      };
    },
    [GET_POPULAR_BOOKS_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        popularBooks: data,
        popularPending: false,
        popularSuccess: true,
      };
    },
    [GET_POPULAR_BOOKS_FAILURE]: (state, action) => {
      return {
        ...state,
        popularPending: true,
        popularError: true,
      };
    },
    [EDIT_BOOK_PENDING]: (state, action) => {
      return {
        ...state,
        editBookPending: true,
        editBookSuccess: false,
        editBookFailure: false,
      };
    },
    [EDIT_BOOK_SUCCESS]: (state, action) => {
      return {
        ...state,
        editBookPending: false,
        editBookSuccess: true,
      };
    },
    [EDIT_BOOK_FAILURE]: (state, action) => {
      return {
        ...state,
        editBookPending: false,
        editBookFailure: true,
      };
    },
  },
  initialState
);
