import { handleActions } from "redux-actions";
import axios from "axios";

const POST_SHELVE = "POST_SHELVE";
const POST_SHELVE_PENDING = "POST_SHELVE_PENDING";
const POST_SHELVE_SUCCESS = "POST_SHELVE_SUCCESS";
const POST_SHELVE_FAILURE = "POST_SHELVE_FAILURE";

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
export const postShelve = (email, isbn, title, authors, type, thumbnail) => ({
  type: POST_SHELVE,
  payload: requsetPostShelve(email, isbn, title, authors, type, thumbnail)
});
const initialState = {
  pending: false,
  error: false
};
export default handleActions(
  {
    [POST_SHELVE_PENDING]: (state, action) => {
      return {
        pending: true,
        error: false
      };
    },
    [POST_SHELVE_SUCCESS]: (state, action) => {},
    [POST_SHELVE_FAILURE]: (state, action) => {
      return {
        pending: false,
        error: true
      };
    }
  },
  initialState
);
