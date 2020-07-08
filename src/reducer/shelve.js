import { handleActions } from "redux-actions";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : "https://happread.herokuapp.com/";

const POST_SHELVE = "POST_SHELVE";
const POST_SHELVE_PENDING = "POST_SHELVE_PENDING";
const POST_SHELVE_SUCCESS = "POST_SHELVE_SUCCESS";
const POST_SHELVE_FAILURE = "POST_SHELVE_FAILURE";

const requsetPostShelve = (email, id, type) => {
  return axios.post(`shelve`, {
    email,
    id,
    type,
  });
};
export const postShelve = (email, id, type) => ({
  type: POST_SHELVE,
  payload: requsetPostShelve(email, id, type),
});
const initialState = {
  pending: false,
  error: false,
};
export default handleActions(
  {
    [POST_SHELVE_PENDING]: (state, action) => {
      return {
        pending: true,
        error: false,
      };
    },
    [POST_SHELVE_SUCCESS]: (state, action) => {},
    [POST_SHELVE_FAILURE]: (state, action) => {
      return {
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
