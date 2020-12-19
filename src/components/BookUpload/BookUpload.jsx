import React, { useState, useCallback, useRef, useLayoutEffect } from "react";
import classnames from "classnames/bind";
import style from "./BookUpload.scss";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { postUpload } from "../../reducer/upload";
import dotenv from "dotenv";
dotenv.config();
const cx = classnames.bind(style);
const BookUpload = () => {
  const [content, setContent] = useState({
    selected: null,
    title: "",
    authors: [],
    author: "",
    isbn: "",
    contents: "",
    genres: "",
  });
  const previewRef = useRef(null);
  const progressRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const genresRef = useRef(null);
  const contentsRef = useRef(null);
  const selectedRef = useRef(null);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.login);
  const { progress, isUploaded } = useSelector((state) => state.upload);
  const handleAuthorChange = useCallback(
    (e) => {
      const { target } = e;
      setContent({
        ...content,
        author: target.value,
      });
    },
    [content]
  );
  const handleKeyPress = useCallback(
    (e) => {
      const { author, authors } = content;
      const { keyCode } = e;
      if (author !== "") {
        authorRef.current.classList.remove("empty");
        if (keyCode === 13) {
          setContent({
            ...content,
            authors: [...authors, author],
            author: "",
          });
        }
      }
    },
    [content]
  );
  const handleDeleteTag = (e) => {
    const { authors } = content;
    const target = e.target.previousSibling.innerHTML;
    let newAuthors = authors.filter((author) => {
      return author !== target;
    });

    setContent({
      ...content,
      authors: newAuthors,
    });
  };
  const handleFile = (e) => {
    const {
      target: { files },
    } = e;
    const imgURL = URL.createObjectURL(files[0]);
    previewRef.current.src = imgURL;
    setContent({
      ...content,
      selected: files[0],
    });
  };
  const handleTitle = useCallback(
    (e) => {
      const { target } = e;
      if (target.value.length > 0)
        titleRef.current.classList.remove("input-empty");
      setContent({
        ...content,
        title: target.value,
      });
    },
    [content]
  );
  const handleContents = useCallback(
    (e) => {
      const { target } = e;
      if (target.value.length > 0)
        contentsRef.current.classList.remove("input-empty");
      setContent({
        ...content,
        contents: target.value,
      });
    },
    [content]
  );
  const handleGenres = useCallback(
    (e) => {
      e.preventDefault();
      const { target } = e;
      if (target.value.length > 0)
        genresRef.current.classList.remove("input-empty");
      setContent({
        ...content,
        genres: target.value,
      });
    },
    [content]
  );
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (e.keyCode !== 13) {
        const {
          user: { _id },
        } = profile;
        const { selected, contents, title, authors, genres } = content;
        if (
          selected !== null &&
          contents.length > 0 &&
          title.length > 0 &&
          authors.length > 0 &&
          genres.length > 0
        ) {
          const formData = new FormData();
          formData.append("thumbnail", selected);
          formData.append("title", title);
          formData.append("authors", authors);
          formData.append("contents", contents);
          formData.append("uid", _id);
          formData.append("genres", genres);
          await dispatch(postUpload(dispatch)(formData));
        } else {
          if (contents.length === 0) {
            contentsRef.current.classList.add("input-empty");
          }
          if (title.length === 0) {
            titleRef.current.classList.add("input-empty");
          }
          if (authors.length === 0) {
            authorRef.current.classList.add("input-empty");
          }
          if (genres.length === 0) {
            genresRef.current.classList.add("input-empty");
          }
        }
      }
    },
    [content, profile, dispatch]
  );
  const authorTag = (authors, handleDeleteTag) => {
    return authors?.map((author) => {
      const uid = v4();
      return (
        <div className={cx("author-tag")} key={uid}>
          <span className={cx("author-name")}>{author}</span>
          <span className={cx("author-x")} onClick={handleDeleteTag}>
            x
          </span>
        </div>
      );
    });
  };

  useLayoutEffect(() => {
    if (isUploaded) {
      progressRef.current.style.width = `${0}%`;
      window.location.href = `${
        process.env.NODE_ENV === "development" ? `/` : `/HappReads-front`
      }`;
    } else {
      progressRef.current.style.width = `${progress}%`;
    }
  }, [progress, isUploaded]);
  const { title, authors, author, contents, genres } = content;
  return (
    <>
      <section className={cx("progress-container")}>
        <div className={cx("progress")} ref={progressRef}></div>
      </section>
      <section className={cx("book-upload")}>
        <section className={cx("form-container")}>
          <section className={cx("form")}>
            <div className={cx("upload-btn-wrapper")}>
              <img className={cx("preview-img")} alt="" ref={previewRef} />
              <div
                className={cx("btn-container")}
                style={{ position: "relative" }}
              >
                <button className={cx("btn")}>이미지 선택</button>
                <input type="file" onChange={handleFile} required />
              </div>
            </div>
            <input
              type="text"
              value={title}
              onChange={handleTitle}
              placeholder="책 이름"
              required
              ref={titleRef}
            />
            <div className={cx("authors")} ref={authorRef}>
              {authorTag(authors, handleDeleteTag)}
              <input
                className={cx("author-input")}
                type="text"
                placeholder="저자 +"
                value={author}
                onChange={handleAuthorChange}
                onKeyDown={handleKeyPress}
              />
            </div>
            <input
              type="text"
              value={genres}
              placeholder="책 장르 ( ,구분진행)"
              onChange={handleGenres}
              required
              ref={genresRef}
            />
            <textarea
              placeholder="요약"
              value={contents}
              onChange={handleContents}
              required
              ref={contentsRef}
            />
            <button className={"submit"} onClick={handleSubmit}>
              업로드
            </button>
          </section>
        </section>
      </section>
    </>
  );
};
export default BookUpload;
