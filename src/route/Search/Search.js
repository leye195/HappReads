import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames/bind";
import BookList from "../../components/BookList";
import Helmet from "../../components/Helmet";
import Loading from "../../components/Loading";
import { getBooks, getMore } from "../../reducer/books";

import style from "./Search.scss";

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
        <>
        <h1 className="search-keyword"> {query? `검색 키워드: ${query}`:`도서 목록`}</h1>
        <section className={cx("search-result-container")}>
          {books.length > 0 ? (
            <BookList booklist={books} from="search" />
          ) : (
            <>
              <div className="empty">
                <p>검색 결과가 없습니다.</p>
              </div>
            </>
          )}
        </section>
        </>
      )}
    </>
  );
};

export default Search;
