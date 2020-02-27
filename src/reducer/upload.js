import { handleActions } from "redux-actions";
import axios from "axios";

const UPLOAD = "UPLOAD";
const UPLOAD_PENDING = "UPLOAD_PENDING";
const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
const UPLOAD_FAILURE = "UPLOAD_FAILURE";
const requestUpload = data => {
  return axios.post(`http://localhost:8080/upload`, data);
};
export const postUpload = data => ({
  type: UPLOAD,
  payload: requestUpload(data)
});
const initialState = {
  pending: false,
  error: false,
  success: false
};
export default handleActions(
  {
    [UPLOAD_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },
    [UPLOAD_SUCCESS]: (state, action) => {
      return {
        success: true,
        pending: false,
        error: false
      };
    },
    [UPLOAD_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true
      };
    }
  },
  initialState
);
