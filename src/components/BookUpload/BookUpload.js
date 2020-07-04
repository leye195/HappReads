import React, { useState, useCallback } from "react";
import classnames from "classnames/bind";
import style from "./BookUpload.scss";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { postUpload } from "../../reducer/upload";
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
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.login);
  const { pending, error, success } = useSelector((state) => state.upload);
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
    //console.log(newAuthors);
    setContent({
      ...content,
      authors: newAuthors,
    });
  };
  const handleFile = (e) => {
    const {
      target: { files },
    } = e;
    setContent({
      ...content,
      selected: files[0],
    });
    const imgURL = URL.createObjectURL(files[0]);
    document.querySelector(".preview-img").src = imgURL;
  };
  const handleTitle = useCallback(
    (e) => {
      const { target } = e;
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
      setContent({
        ...content,
        contents: target.value,
      });
    },
    [content]
  );
  const handleGenres = useCallback(
    (e) => {
      const { target } = e;
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
      const {
        user: { _id },
      } = profile;
      const { selected, contents, title, authors, genres } = content;
      const formData = new FormData();
      formData.append("thumbnail", selected);
      formData.append("title", title);
      formData.append("authors", authors);
      formData.append("contents", contents);
      formData.append("uid", _id);
      formData.append("genres", genres);
      const {
        value: { status },
      } = await dispatch(postUpload(formData));
      if (status === 200) {
        window.location.href = "/";
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
  const { title, authors, author, contents, genres } = content;
  return (
    <section className={cx("book-upload")}>
      <section className={cx("form-container")}>
        <form onSubmit={handleSubmit}>
          <div className={cx("upload-btn-wrapper")}>
            <img className={cx("preview-img")} alt="" />
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
          />
          <div className={cx("authors")}>
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
          />
          <textarea
            placeholder="요약"
            value={contents}
            onChange={handleContents}
            required
          />
          <input type="submit" value="제출" />
        </form>
      </section>
    </section>
  );
};
export default BookUpload;
