import { call, all } from "redux-saga/effects";
import { userSaga } from "./user";
import { bookSaga } from "./book";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";
export default function* rootSaga() {
  yield all[(call(userSaga), call(bookSaga))];
}
