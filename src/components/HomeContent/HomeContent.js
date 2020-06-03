import React from "react";
import style from "./HomeContent.scss";
import classnames from "classnames/bind";
import VerticalScroll from "../VerticalScrollList";
import BookList from "../BookList";
const cx = classnames.bind(style);
const HomeContent = ({ booklist, handleClick, type, filterBookList }) => {
  return (
    <section className={cx("home-content")}>
      <VerticalScroll books={booklist} />
      <div className={cx("books-wrapper")}>
        <ul className={cx("book-category-ul")}>
          <li
            className={cx(
              `book-category-li`,
              `${type === "전체" ? `selected` : ""}`
            )}
            onClick={handleClick}
            data-value="전체"
          >
            전체
          </li>
          <li
            className={cx(
              "book-category-li",
              `${type === "소설" ? `selected` : ""}`
            )}
            onClick={handleClick}
            data-value="소설"
          >
            소설
          </li>
          <li
            className={cx(
              "book-category-li",
              `${type === "IT" ? `selected` : ""}`
            )}
            onClick={handleClick}
            data-value="IT"
          >
            IT
          </li>
          <li
            className={cx(
              "book-category-li",
              `${type === "경제" ? `selected` : ""}`
            )}
            onClick={handleClick}
            data-value="경제"
          >
            경제
          </li>
          <li
            className={cx(
              "book-category-li",
              `${type === "교양" ? `selected` : ""}`
            )}
            onClick={handleClick}
            data-value="교양"
          >
            교양
          </li>
          <li
            className={cx(
              "book-category-li",
              `${type === "자기계발" ? `selected` : ""}`
            )}
            onClick={handleClick}
            data-value="자기계발"
          >
            자기계발
          </li>
          <li
            className={cx(
              "book-category-li",
              `${type === "과학" ? `selected` : ""}`
            )}
            onClick={handleClick}
            data-value="과학"
          >
            과학
          </li>
        </ul>
        <BookList booklist={filterBookList(booklist)} from={"home"} />
      </div>
    </section>
  );
};

export default HomeContent;
