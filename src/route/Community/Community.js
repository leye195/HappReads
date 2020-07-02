import React from "react";
import Category from "../../components/Category";
import CommunityContainer from "../../components/CommunityContainer/CommunityContainer";
const Community = ({ history: { location } }) => {
  const { pathname } = location;
  const path = pathname.substr(1).split("/")[1];
  return (
    <>
      <Category path={path} />
      <CommunityContainer path={path} />
    </>
  );
};

export default Community;
