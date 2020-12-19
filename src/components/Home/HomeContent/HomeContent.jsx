import React, { useState } from "react";
import style from "./HomeContent.scss";
import classnames from "classnames/bind";
import SlickList from "../../SlickList";
import BookList from "../../BookList";
import VerticalScroll from "../../VerticalScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { v4 } from "uuid";

const category = [
  "전체",
  "소설",
  "IT",
  "경제",
  "교양",
  "자기계발",
  "과학",
  "역사",
  "정치",
  "기타",
]

const cx = classnames.bind(style);
const HomeContent = ({
  booklist,
  handleClick,
  handleMore,
  sliderBooks,
  recentBooks,
  popularBooks,
  type,
  done,
}) => {
  //const [isMobile, setIsMobile] = useState(false);
  const [hide, setHide] = useState(true);

  const toggleHide = () => {
    setHide((cur) => !cur);
  };

  return (
    <section className={cx("home-content")}>
      <SlickList books={sliderBooks} />
      <VerticalScroll
        title={"최근 공유된 책"}
        books={recentBooks.slice(0, 15)}
      />
      <VerticalScroll title={"평점 좋은 책"} books={popularBooks} />
      <section className={cx("books-wrapper")}>
        <section className={cx("book-category-section")}>
          <div
            className={cx(["book-category-div", `${hide ? `hide` : `more`}`])}
          >
            <ul className={cx("book-category-ul")}>
              {hide
                ? category.slice(0, 7).map((item) => (
                    <li
                      key={v4()}
                      className={cx(
                        `book-category-li`,
                        `${type === item ? `selected` : ""}`
                      )}
                      onClick={handleClick}
                      data-value={item}
                    >
                      {item}
                    </li>
                  ))
                : category.map((item) => (
                    <li
                      key={v4()}
                      className={cx(
                        `book-category-li`,
                        `${type === item ? `selected` : ""}`
                      )}
                      onClick={handleClick}
                      data-value={item}
                    >
                      {item}
                    </li>
                  ))}
            </ul>
          </div>
          <div className={cx("more-container")} onClick={toggleHide}>
            {hide ? "더 보기" : "숨기기"}
            <FontAwesomeIcon
              className={cx("more")}
              icon={hide ? faAngleDown : faAngleUp}
            />
          </div>
        </section>
        <BookList
          booklist={booklist}
          handleMore={handleMore}
          from={"home"}
          type={type}
          done={done}
        />
      </section>
    </section>
  );
};

export default HomeContent;
