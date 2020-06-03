import React, { Component, Fragment } from "react";
import Category from "../components/Category";
import CommunityContainer from "../components/CommunityContainer/CommunityContainer";
class Community extends Component {
  render() {
    const {
      history: {
        location: { pathname },
      },
    } = this.props;
    const path = pathname.substr(1).split("/")[1];
    return (
      <Fragment>
        <div style={{ paddingTop: "11vh" }}>
          <Category path={path} />
          <CommunityContainer path={path} />
        </div>
      </Fragment>
    );
  }
}

export default Community;
