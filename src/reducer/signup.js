import { handleActions } from "redux-actions";
import axios from "axios";
export const SIGNUP = "SIGNUP";
export const SIGNUP_PENDING = "SIGNUP_PENDING";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

const requestSignUp = (email, password) => {
  return axios.post("http://localhost:8080/signup", {
    email: email,
    password: password,
  });
};
export const userSignup = (email, password) => ({
  type: SIGNUP,
  payload: requestSignUp(email, password),
});
const initialState = {
  error: false,
  pending: false,
  success: false,
};
export default handleActions(
  {
    [SIGNUP_PENDING]: (state, action) => {
      return {
        pending: true,
        error: false,
        success: false,
      };
    },
    [SIGNUP_SUCCESS]: (state, action) => {
      return {
        pending: false,
        error: false,
        success: true,
      };
    },
    [SIGNUP_FAILURE]: (state, action) => {
      return {
        pending: false,
        error: true,
        success: false,
      };
    },
  },
  initialState
);
