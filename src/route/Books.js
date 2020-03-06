import React, { Component } from "react";
import BookShelve from "../components/BookShelve/BookShelve";
class Books extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <BookShelve />
      </div>
    );
  }
}

export default Books;
