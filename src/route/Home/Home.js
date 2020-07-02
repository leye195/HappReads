import React, { useState, useEffect, useCallback } from "react";
import style from "./Home.scss";
import classnames from "classnames/bind";
import HomeSection from "../../components/HomeSection";
import HomeContent from "../../components/HomeContent";
import { ChasingDots } from "better-react-spinkit";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getSliderBooks } from "../../reducer/books";
const cx = classnames.bind(style);
const Home = () => {
  const [type, setType] = useState("전체");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { allBookPending, allBookDone, books, sliderBooks } = useSelector(
    (state) => state.books
  );
  useEffect(() => {
    dispatch(getAllBooks("전체", 1));
    dispatch(getSliderBooks());
  }, [dispatch]);
  const handleClick = useCallback(
    (e) => {
      const {
        target: { dataset },
      } = e;
      setType(dataset.value);
    },
    [setType]
  );
  const handleMore = useCallback(() => {
    if (!allBookDone) {
      dispatch(getAllBooks("전체", page + 1));
      setPage(page + 1);
    }
  }, [dispatch, page, allBookDone]);
  return (
    <>
      <main className={cx("main-cotainer")}>
        <HomeSection />
        {allBookPending ? (
          <ChasingDots color="white" size={60} />
        ) : (
          <HomeContent
            booklist={books}
            sliderBooks={sliderBooks}
            handleClick={handleClick}
            handleMore={handleMore}
            done={allBookDone}
            type={type}
            page={page}
          />
        )}
      </main>
    </>
  );
};
export default Home;
