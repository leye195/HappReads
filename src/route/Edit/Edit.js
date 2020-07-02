import React from "react";
import UserEdit from "../../components/UserEdit";
import { useSelector } from "react-redux";
const Edit = ({ history }) => {
  const { isLoggedIn, profile } = useSelector((state) => state.login);
  return (
    <UserEdit history={history} profile={profile} isLoggedIn={isLoggedIn} />
  );
};
export default Edit;
