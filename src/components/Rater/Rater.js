import React, { Component } from "react";
import { FaStar } from "react-icons/fa";
import style from "./Rater.scss";
import classnames from "classnames/bind";
import { connect } from "react-redux";
const cx = classnames.bind(style);
const values = ["1", "2", "3", "4", "5"];
const starStyle = {
  color: "#f1c40f"
};
class Rater extends Component {
  state = {
    hoveredRating: "0",
    currentRating: ""
  };
  handleOnClick = e => {
    const { isLoggedIn } = this.props;
    const rating = e.target.parentNode.dataset.rating;
    if (isLoggedIn) this.postVote(rating);
    else alert("Please Login");
  };
  postVote = async vote => {
    const {
      book: { title, authors, thumbnail },
      profile: {
        profile: { email }
      },
      postVote
    } = this.props;
    const isbn = window.location.pathname.substring(1).split("/")[1];
    await postVote(title, authors, vote, isbn, email, thumbnail);
  };
  render() {
    const { currentRating } = this.state;
    return (
      <div className={cx("rater")}>
        {values.map((value, idx) => {
          return (
            <FaStar
              key={idx}
              data-rating={idx + 1}
              onClick={this.handleOnClick}
              style={currentRating >= idx + 1 ? starStyle : {}}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    profile: state.login.profile
  };
};
export default connect(mapStateToProps)(Rater);
