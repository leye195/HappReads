import React, { Component, Fragment } from "react";
import classnames from "classnames/bind";
import style from "./CommunityContainer.scss";
import img1 from "../../img/1.jpg";
import { Link } from "react-router-dom";
const cx = classnames.bind(style);
const content = path => {
  if (path === "top-readers") {
    return (
      <Fragment>
        <div className={cx("range-container")}>
          <span>이번 주</span>
          <span> | </span>
          <span>이번 달</span>
          <span> | </span>
          <span>전체</span>
        </div>
        <table className={cx("table")}>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img src={img1} />
              </td>
              <td>
                <p>Ryan Dash</p>
                <p>책: 68 권</p>
              </td>
              <td>
                <p>
                  <span>이번 주: </span>
                  <span>10권</span>
                </p>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <img src={img1} />
              </td>
              <td>
                <p>Ryan Dash</p>
                <p>책: 68 권</p>
              </td>
              <td>
                <p>
                  <span>이번 주: </span>
                  <span>10권</span>
                </p>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <img src={img1} />
              </td>
              <td>
                <p>Ryan Dash</p>
                <p>책: 68 권</p>
              </td>
              <td>
                <p>
                  <span>이번 주: </span>
                  <span>10권</span>
                </p>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                <img src={img1} />
              </td>
              <td>
                <p>Ryan Dash</p>
                <p>책: 68 권</p>
              </td>
              <td>
                <p>
                  <span>이번 주: </span>
                  <span>10권</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
  if (path === "top-reviewers") {
    return (
      <Fragment>
        <div className={cx("range-container")}>
          <span>이번 주</span>
          <span> | </span>
          <span>이번 달</span>
          <span> | </span>
          <span>전체</span>
        </div>
        <table className={cx("table")}>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img src={img1} />
              </td>
              <td>
                <p>Ryan Dash</p>
                <p>10 리뷰</p>
              </td>
              <td>
                <p>
                  <span>이번 주: </span>
                  <span>10 리뷰</span>
                </p>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <img src={img1} />
              </td>
              <td>
                <p>Ryan Dash</p>
                <p>9 리뷰</p>
              </td>
              <td>
                <p>
                  <span>이번 주: </span>
                  <span>9 리뷰</span>
                </p>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <img src={img1} />
              </td>
              <td>
                <p>Ryan Dash</p>
                <p>8 리뷰</p>
              </td>
              <td>
                <p>
                  <span>이번 주: </span>
                  <span> 리뷰</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
  if (path === "reviews") {
    return (
      <Fragment>
        <div className={cx(["card", "row"])}>
          <div className={cx("first-col")}>
            <img src={img1} />
          </div>
          <div className={cx("second-col")}>
            <p className={cx("date")}>03/07</p>
            <p className={cx("reviewer")}>Nico</p>
            <h4 className={cx("title")}>Title</h4>
            <div className={cx("content")}>
              <img src={img1} />
              <p>
                Verloren sind nur wir allein" sprach mich rein optisch schon auf
                den ersten Blick an, der Klappentext verstärkte dies noch. Da
                ich schon Bücher von Mila Summers gelesen habe, war mir der
                moderne und fließende Schreibstil bekannt, ich hätte mir mehr
              </p>
            </div>
          </div>
        </div>
        <div className={cx(["card", "row"])}>
          <div className={cx("first-col")}>
            <img src={img1} />
          </div>
          <div className={cx("second-col")}>
            <p className={cx("reviewer")}>Nico</p>
            <h4 className={cx("title")}>Title</h4>
            <div className={cx("content")}>
              <img src={img1} />
              <p>
                Verloren sind nur wir allein" sprach mich rein optisch schon auf
                den ersten Blick an, der Klappentext verstärkte dies noch. Da
                ich schon Bücher von Mila Summers gelesen habe, war mir der
                moderne und fließende Schreibstil bekannt, ich hätte mir mehr
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};
class CommunityContainer extends Component {
  render() {
    const { path } = this.props;
    return (
      <div className={cx("community-container")}>
        {path === "reviews" && (
          <div className={cx("reviews")}>{content("reviews")}</div>
        )}
        {path === "top-readers" && <div>{content("top-readers")}</div>}
        {path === "top-reviewers" && <div>{content("top-reviewers")}</div>}
      </div>
    );
  }
}

export default CommunityContainer;
