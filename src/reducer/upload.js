import { handleActions } from "redux-actions";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : "https://happread.herokuapp.com/";
export const UPLOAD = "UPLOAD";
export const UPLOAD_PENDING = "UPLOAD_PENDING";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILURE = "UPLOAD_FAILURE";
const UPLOAD_PROGRESS = "UPLOAD_PROGRESS";
const UPLOAD_PROGRESS_PENDING = "UPLOAD_PROGRESS_PENDING";
const UPLOAD_PROGRESS_SUCCESS = "UPLOAD_PROGRESS_SUCCESS";

const requestUpload = (data, dispatch) => {
  return axios.post(`upload`, data, {
    onUploadProgress: (e) => {
      const { loaded, total } = e;
      let progress = Math.floor((loaded * 100) / total);
      dispatch(uploadProgress(progress));
    },
  });
};
export const postUpload = (dispatch) => (data) => ({
  type: UPLOAD,
  payload: requestUpload(data, dispatch),
});
const uploadProgress = (progress) => {
  return {
    type: UPLOAD_PROGRESS,
    payload: {
      progress,
    },
  };
};

const initialState = {
  pending: false,
  error: false,
  success: false,
  progress: 0,
  isUploaded: false,
};
export default handleActions(
  {
    [UPLOAD_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        progress: 0,
      };
    },
    [UPLOAD_SUCCESS]: (state, action) => {
      return {
        ...state,
        success: true,
        pending: false,
        error: false,
        isUploaded: state.progress === 100,
        progress: 0,
      };
    },
    [UPLOAD_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
    [UPLOAD_PROGRESS]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        progress: payload.progress,
      };
    },
  },
  initialState
);
