import React, { useEffect } from "react";
import Helmet from "../../components/Helmet";
import BookShelve from "../../components/BookShelve/BookShelve";
const Books = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Helmet title={`책장 | HappReads`} />
      <BookShelve />;
    </>
  );
};

export default Books;
