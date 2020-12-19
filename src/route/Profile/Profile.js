import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserProfile from "../../components/UserProfile";
import { getUser } from "../../reducer/user";
import Helmet from "../../components/Helmet";
import Loading from "../../components/Loading";

const Profile = ({ history: { location } }) => {
  const [loading, setIsLoading] = useState(true);
  const { isLoggedIn, profile, pending } = useSelector((state) => state.login);
  const { profile: user, pending: userPending } = useSelector(
    (state) => state.user
  );
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
    setIsLoading(true);
    if (location.pathname !== "/me") {
      const uid = location.pathname.substring(1).split("/")[1];
      getProfile(uid);
    }
    setIsLoading(false);
  }, [getProfile, location.pathname]);

  return (
    <>
      <Helmet title={`Profile | HappReads`} />
      {loading || pending || userPending ? (
        <Loading />
      ) : (
        <UserProfile
          isLoggedIn={isLoggedIn}
          profile={location.pathname === "/me" ? profile?.user : user}
          from={location.pathname}
          type={location.search}
        />
      )}
    </>
  );
};
export default Profile;
