import { createStore, applyMiddleware } from "redux";
import reducer from "../reducer";
import { createPromise } from "redux-promise-middleware";
const customizePromiseMiddleware = createPromise({
  promiseTypeSuffixes: ["PENDING", "SUCCESS", "FAILURE"],
});
const store = createStore(reducer, applyMiddleware(customizePromiseMiddleware));
export default store;
