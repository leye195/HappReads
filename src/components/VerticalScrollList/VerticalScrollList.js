import React, { Component } from "react";
import style from "./VerticalScrollList.scss";
import classnames from "classnames/bind";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ScrollItem from "../ScrollItem";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
const cx = classnames.bind(style);
class VerticalScrollList extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };
    const { books } = this.props;
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
  }
}
export default VerticalScrollList;
