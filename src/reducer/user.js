import { handleActions } from "redux-actions";
import axios from "axios";

const GET_USER = "GET_USER";
const GET_USER_PENDING = "GET_USER_PENDING";
const GET_USER_SUCCESS = "GET_USER_SUCCESS";
const GET_USER_FAILURE = "GET_USER_FAILURE";

const requestUser = id => {
  return axios.get(`http://localhost:8080/profile/${id}`);
};
export const getUser = id => ({
  type: GET_USER,
  payload: requestUser(id)
});
const initialState = {
  pending: false,
  error: false,
  profile: {}
};
export default handleActions(
  {
    [GET_USER_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },
    [GET_USER_SUCCESS]: (state, action) => {
      return {
        pending: false,
        error: false,
        profile: action.payload.data
      };
    },
    [GET_USER_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true
      };
    }
  },
  initialState
);
