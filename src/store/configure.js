import { createStore, applyMiddleware } from "redux";
import reducer from "../reducer";
import logger from "redux-logger";
import { createPromise } from "redux-promise-middleware";
const customizePromiseMiddleware = createPromise({
  promiseTypeSuffixes: ["PENDING", "SUCCESS", "FAILURE"]
});
const store = createStore(
  reducer,
  applyMiddleware(logger, customizePromiseMiddleware)
);
export default store;
