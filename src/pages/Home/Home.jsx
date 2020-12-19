import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Helmet from "../../components/Helmet";
import HomeSection from "../../components/Home/HomeSection";
import HomeContent from "../../components/Home/HomeContent";
import {
  getAllBooks,
  getSliderBooks,
  getRecentBooks,
  getPopularBooks,
} from "../../reducer/books";
import Loading from "../../components/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState("전체");
  const dispatch = useDispatch();
  const {
    allBookDone,
    sliderPending,
    recentPending,
    popularPending,
    books,
    sliderBooks,
    recentBooks,
    popularBooks,
  } = useSelector((state) => state.books);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllBooks("전체", 1));
    dispatch(getSliderBooks());
    dispatch(getRecentBooks());
    dispatch(getPopularBooks());
    setIsLoading(false);
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

  return (
    <main>
      <Helmet
        title={`Home | HappReads`}
        description={
          "책들을 공유 그리고 리뷰하며 읽어보지 못한 새로운 책을 발견하세요!!"
        }
        keywords={`책, 책 공유, 책 리뷰, HappReads, happreads`}
      />
      {isLoading || sliderPending || recentPending || popularPending ? (
        <Loading />
      ) : (
        <>
          <HomeSection />
          <HomeContent
            booklist={books}
            sliderBooks={sliderBooks}
            recentBooks={recentBooks}
            popularBooks={popularBooks}
            handleClick={handleClick}
            done={allBookDone}
            type={type}
          />
        </>
      )}
    </main>
  );
};
export default Home;
