import React, { useEffect, useCallback } from "react";
import UserProfile from "../../components/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../reducer/user";
import Helmet from "../../components/Helmet";
const Profile = ({ history: { location } }) => {
  const { isLoggedIn, profile } = useSelector((state) => state.login);
  const { profile: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getProfile = useCallback(
    async (id) => {
      try {
        dispatch(getUser(id));
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );
  useEffect(() => {
    if (location.pathname !== "/me") {
      const uid = location.pathname.substring(1).split("/")[1];
      getProfile(uid);
    }
  }, [getProfile, location.pathname]);
  return (
    <>
      <Helmet title={`Profile | HappReads`} />
      <UserProfile
        isLoggedIn={isLoggedIn}
        profile={location.pathname === "/me" ? profile?.user : user}
        from={location.pathname}
      />
    </>
  );
};
export default Profile;
