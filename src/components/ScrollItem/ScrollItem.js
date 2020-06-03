import React, { Component } from "react";
import style from "./ScrollItem.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);

class ScrollItem extends Component {
  render() {
    const { children } = this.props;
    return <div className={cx("scroll-item")}>{children}</div>;
  }
}
export default ScrollItem;
