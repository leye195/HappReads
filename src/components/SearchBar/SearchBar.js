import React, { useState, useCallback } from "react";
import { withRouter } from "react-router";
import style from "./SearchBar.scss";
import classnames from "classnames/bind";
import { FaSearch } from "react-icons/fa";

const cx = classnames.bind(style);
const SearchBar = ({ history, getBooks }) => {
  const [keyword, setKeyword] = useState("");
  const handleChangeKeyword = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    getBooks(keyword, 0, 1);
    history.push(`/search?p=${keyword}`);
  };
  return (
    <div className={cx("search-bar")}>
      <form className={cx("form-container")} onSubmit={handleSubmit}>
        <FaSearch className={cx("search-icon")} onClick={handleSubmit} />
        <input
          type="input"
          placeholder="책 검색..."
          value={keyword}
          name="q"
          onChange={handleChangeKeyword}
        />
      </form>
    </div>
  );
};

export default withRouter(SearchBar);
