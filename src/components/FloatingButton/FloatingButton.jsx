import React, { useEffect, useCallback, useState } from "react";
import classnames from "classnames/bind";
import style from "./FloatingButton.scss";
const cx = classnames.bind(style);
const FloatingButton = () => {
  const [hide, setHide] = useState(true);
  const handleToTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleScroll = useCallback(() => {
    const pageYOffset = window.pageYOffset;
    if (pageYOffset <= 600) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <button
      className={cx(["floating-button", hide ? "hide" : "show"])}
      onClick={handleToTop}
    >
      위로
    </button>
  );
};
export default FloatingButton;
