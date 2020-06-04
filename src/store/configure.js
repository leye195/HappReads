import { createStore, applyMiddleware } from "redux";
import reducer from "../reducer";
import logger from "redux-logger";
//import createSagaMiddleware from "redux-saga";
import { createPromise } from "redux-promise-middleware";
const customizePromiseMiddleware = createPromise({
  promiseTypeSuffixes: ["PENDING", "SUCCESS", "FAILURE"],
});
//const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(customizePromiseMiddleware));
//sagaMiddleware.run();
export default store;
