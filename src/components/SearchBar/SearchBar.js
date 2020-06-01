import React, { useState, Fragment } from "react";
import { withRouter } from "react-router";
import style from "./SearchBar.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);
const SearchBar = ({ match, location, history, getBooks }) => {
  const [keyword, setKeyword] = useState("");
  const handleChangeKeyword = (query) => {
    setKeyword(query);
  };
  const handleSubmit = (e) => {
    getBooks(keyword, 0, 1);
    history.push(`/search?p=${keyword}`);
    e.preventDefault();
  };
  //console.log(match, location, history);
  return (
    <Fragment>
      <div className={cx("search-bar")}>
        <form className={cx("form-container")} onSubmit={handleSubmit}>
          <input
            type="input"
            placeholder="책 검색..."
            value={keyword}
            name="q"
            onChange={(e) => handleChangeKeyword(e.target.value)}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default withRouter(SearchBar);
