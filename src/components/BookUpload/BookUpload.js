import React, { Component } from "react";
import classnames from "classnames/bind";
import style from "./BookUpload.scss";
import { connect } from "react-redux";
import { v4 } from "uuid";
import * as actions from "../../reducer/upload";
const cx = classnames.bind(style);
const authorTag = (authors, handleDeleteTag) => {
  return authors.map(author => {
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
class BookUpload extends Component {
  state = {
    selected: null,
    title: "",
    authors: [],
    author: "",
    isbn: "",
    contents: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    const { selected, title, authors, isbn, contents } = this.state;
    const {
      profile: {
        profile: { _id }
      }
    } = this.props;
    const formData = new FormData();
    formData.append("thumbnail", selected);
    formData.append("title", title);
    formData.append("authors", authors);
    formData.append("isbn", isbn);
    formData.append("contents", contents);
    formData.append("uid", _id);
    //console.log(title, authors, isbn, contents);
    this.submitData(formData);
  };
  handleAuthorChange = input => {
    this.setState({
      author: input
    });
  };
  handleKeyPress = key => {
    const { author, authors } = this.state;
    if (author !== "") {
      if (key === 13) {
        this.setState({
          authors: [...authors, author],
          author: ""
        });
      }
    }
  };
  handleDeleteTag = e => {
    const { authors } = this.state;
    const target = e.target.previousSibling.innerHTML;
    let newAuthors = authors.filter(author => {
      return author !== target;
    });
    //console.log(newAuthors);
    this.setState({
      authors: newAuthors
    });
  };
  handleFile = e => {
    const {
      target: { files }
    } = e;
    this.setState({
      selected: files[0]
    });
    const imgURL = URL.createObjectURL(files[0]);
    document.querySelector(".preview-img").src = imgURL;
  };
  handleTitle = title => {
    this.setState({
      title: title
    });
  };
  handleContents = contents => {
    this.setState({
      contents: contents
    });
  };
  handleIsbn = isbn => {
    this.setState({
      isbn: isbn
    });
  };
  submitData = async data => {
    const { postUpload } = this.props;
    try {
      await postUpload(data);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { title, isbn, contents, author, authors, selected } = this.state;
    return (
      <div className={cx("book-upload")}>
        <div className={cx("form-container")}>
          <form onSubmit={this.handleSubmit}>
            <div className={cx("upload-btn-wrapper")}>
              <img className={cx("preview-img")} alt="" />
              <div style={{ position: "relative" }}>
                <button className={cx("btn")}>이미지 선택</button>
                <input type="file" onChange={this.handleFile} required />
              </div>
            </div>

            <input
              type="text"
              value={title}
              onChange={e => this.handleTitle(e.target.value)}
              placeholder="책 이름"
              required
            />
            <div className={cx("authors")}>
              {authorTag(authors, this.handleDeleteTag)}
              <input
                className={cx("author-input")}
                type="text"
                placeholder="저자 +"
                value={author}
                onChange={e => this.handleAuthorChange(e.target.value)}
                onKeyDown={e => this.handleKeyPress(e.keyCode)}
              />
            </div>
            <input
              type="text"
              value={isbn}
              onChange={e => this.handleIsbn(e.target.value)}
              placeholder="ISBN"
              required
            />
            <textarea
              placeholder="요약"
              value={contents}
              onChange={e => this.handleContents(e.target.value)}
              required
            />
            <input type="submit" value="제출" />
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    pending: state.upload.pending,
    error: state.upload.error,
    success: state.upload.success,
    profile: state.login.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postUpload: data => dispatch(actions.postUpload(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookUpload);
