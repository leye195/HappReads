import React, { useEffect } from "react";
import BookShelve from "../../components/BookShelve/BookShelve";
const Books = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return <BookShelve />;
};

export default Books;
