import React, { Component } from "react";
import { FaStar } from "react-icons/fa";
import style from "./Rater.scss";
import classnames from "classnames/bind";
import { connect } from "react-redux";
const cx = classnames.bind(style);
const values = ["1", "2", "3", "4", "5"];
const starStyle = {
  color: "#f1c40f",
  cursor: "pointer",
};
class Rater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredRating: "0",
      currentRating: "0",
    };
  }

  handleOnClick = (e) => {
    const { isLoggedIn } = this.props;
    let currentItem = e.target;
    while (currentItem.nodeName !== "svg") {
      currentItem = currentItem.parentNode;
    }
    const rating = currentItem.dataset.rating;
    if (isLoggedIn) this.postVote(rating);
    else alert("Please Login");
  };
  postVote = async (vote) => {
    const {
      book: { _id },
      profile: {
        profile: { email },
      },
      postVote,
    } = this.props;
    await postVote(_id, email, vote);
  };
  render() {
    const { votes } = this.props;
    return (
      <div className={cx("rater")}>
        {values.map((value, idx) => {
          return (
            <FaStar
              key={idx}
              data-rating={idx + 1}
              onClick={this.handleOnClick}
              style={votes >= idx + 1 ? starStyle : {}}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    profile: state.login.profile,
  };
};
export default connect(mapStateToProps)(Rater);
