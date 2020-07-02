import React, { useState } from "react";
import { withRouter } from "react-router";
import style from "./SearchBar.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);
const SearchBar = ({ history, getBooks }) => {
  const [keyword, setKeyword] = useState("");
  const handleChangeKeyword = (query) => {
    setKeyword(query);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getBooks(keyword, 0, 1);
    history.push(`/search?p=${keyword}`);
  };
  return (
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
  );
};

export default withRouter(SearchBar);
