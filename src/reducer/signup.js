import { handleActions } from "redux-actions";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : "https://happread.herokuapp.com/";

export const SIGNUP = "SIGNUP";
export const SIGNUP_PENDING = "SIGNUP_PENDING";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

const requestSignUp = (email, password) => {
  return axios.post("signup", {
    email: email,
    password: password,
  });
};
export const userSignup = (email, password) => ({
  type: SIGNUP,
  payload: requestSignUp(email, password),
});
const initialState = {
  signup_pending: false,
  signup_success: false,
  signup_error: false,
};
export default handleActions(
  {
    [SIGNUP_PENDING]: (state, action) => {
      return {
        signup_pending: true,
        signup_success: false,
        signup_error: false,
      };
    },
    [SIGNUP_SUCCESS]: (state, action) => {
      return {
        signup_pending: false,
        signup_success: true,
      };
    },
    [SIGNUP_FAILURE]: (state, action) => {
      return {
        signup_pending: false,
        signup_error: true,
      };
    },
  },
  initialState
);
