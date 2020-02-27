import { combineReducers } from "redux";
import books from "./books";
import signup from "./signup";
import login from "./login";
import review from "./review";
import shelve from "./shelve";
import user from "./user";
import upload from "./upload";
const reducer = combineReducers({
  books,
  signup,
  login,
  review,
  shelve,
  user,
  upload
});
export default reducer;
