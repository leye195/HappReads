import React from "react";
import BookUpload from "../../components/BookUpload/BookUpload";
import Helmet from "../../components/Helmet";
const Upload = () => {
  return (
    <>
      <Helmet title={`Upload | HappReads`} />
      <BookUpload />
    </>
  );
};

export default Upload;
