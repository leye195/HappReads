import React, { useState, useEffect, useRef } from "react";
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
  const { books, searchPending, moreDone } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const loadMoreRef = useRef(null);

  const handleLoadMore = () => {
    setPage(page+1);
    if(loadMoreRef.current) {
      console.log(loadMoreRef.current);
      loadMoreRef.current.blur();
    }
  }

  useEffect(() => {
    const { search } = location;
    const q = decodeURI(search)
      .split("=")[1]
      .replace(/[%20]/gi, " ")
      .split("&")[0];
    setQuery(q);
    if(page===1){
      setIsLoading(true);
      dispatch(getBooks(q, 0, page));
      setIsLoading(false);
    } else {
      dispatch(getMore(q,0,page))
    }
  }, [dispatch, location, page]);

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
            <BookList booklist={books} done={moreDone} from="search" ref={loadMoreRef} handleMore={handleLoadMore} />
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
