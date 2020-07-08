import React, { useState, useEffect, useCallback } from "react";
import style from "./Search.scss";
import classnames from "classnames/bind";
import BookList from "../../components/BookList";
import { getBooks, getMore } from "../../reducer/books";
import { useDispatch, useSelector } from "react-redux";
import Helmet from "../../components/Helmet";
import Loading from "../../components/Loading";
const cx = classnames.bind(style);
const Search = ({ location }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { books, searchPending } = useSelector((state) => state.books);

  const getMoreBooks = useCallback(
    async (q, type, page = 1) => {
      try {
        dispatch(getMore(q, type, page));
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );
  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const { search } = location;
    const q = decodeURI(search)
      .split("=")[1]
      .replace(/[%20]/gi, " ")
      .split("&")[0];
    if (scrollHeight - innerHeight - scrollTop < 100) {
      //스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
      setPage(page + 1);
      //console.log(q);
      //console.log("Search Next");
    }
  }, [location, setPage, page]);
  useEffect(() => {
    setIsLoading(true);
    const { search } = location;
    const q = decodeURI(search)
      .split("=")[1]
      .replace(/[%20]/gi, " ")
      .split("&")[0];
    setQuery(q);
    dispatch(getBooks(q, 0, page));
    setIsLoading(false);
  }, [dispatch, location, handleScroll, page]);
  return (
    <>
      <Helmet title={`검색 | HappReads`} />
      {isLoading || searchPending ? (
        <Loading />
      ) : (
        <section className={cx("search-result-container")}>
          <h1 className="search-keyword">검색 키워드: {query}</h1>
          <BookList booklist={books} from="search" />
        </section>
      )}
    </>
  );
};
export default Search;
