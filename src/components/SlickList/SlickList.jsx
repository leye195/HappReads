import React, { useState, useEffect, useCallback } from "react";
import style from "./SlickList.scss";
import classnames from "classnames/bind";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ScrollItem from "../ScrollItem";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
const cx = classnames.bind(style);
const SlickList = ({ books }) => {
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 4000,
  });

  const checkSize = useCallback(() => {
    const innerWidth = window.innerWidth;
    if (innerWidth >= 0 && innerWidth <= 425) {
      setSettings({
        ...settings,
        slidesToShow: 2,
        slidesToScroll: 2,
      });
    } else {
      setSettings({
        ...settings,
        slidesToShow: 4,
        slidesToScroll: 4,
      });
    } 
  }, [settings]);

  useEffect(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  return (
    <section className={cx("slider-container")}>
      <Slider {...settings}>
        {books?.slice(0, 8)?.map((book) => (
          <ScrollItem key={v4()}>
            <Link to={`/book/${book._id}`}>
              <img src={book.thumbnail} alt={book.title} />
            </Link>
          </ScrollItem>
        ))}
      </Slider>
    </section>
  );
};
export default SlickList;
