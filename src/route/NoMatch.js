import React, { Component } from "react";
import goBack from "../img/go_back.png";
const style = {
  padding: "80px",
  textAlign: "center"
};

class NoMatch extends Component {
  render() {
    return (
      <div style={style}>
        <h1
          style={{
            fontSize: "2.0rem",
            fontWeight: "700",
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
          404 Not Found
        </h1>
        <img
          src={goBack}
          style={{ height: "250px", marginBottom: "10px" }}
          alt={"404"}
        />
      </div>
    );
  }
}

export default NoMatch;
