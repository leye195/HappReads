import React,{useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Route, useLocation} from 'react-router-dom';
import Helmet from "../../components/Helmet";
import UserProfile from '../../components/UserProfile';
import { getUser } from '../../reducer/user';

const ProfileRoute = ({ component: Component, ...params}) =>{
    const { isLoggedIn, profile } = useSelector((state) => state.login);
    const { profile: user } = useSelector(
      (state) => state.user
    );
    const location = useLocation();

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
      if (!location.pathname.startsWith("/me")) {
        const uid = location.pathname.substring(1).split("/")[1];
        getProfile(uid);
      }
    }, [getProfile, location.pathname]);

    return (
        <Route 
          {...params} 
          render={(props) => (<>
            <Helmet title={`Profile | HappReads`} />
            <UserProfile 
              isLoggedIn={isLoggedIn}
              profile={location.pathname.startsWith("/me") ? profile?.user : user}
              from={location.pathname}>
                <Component {...props}           
                  isLoggedIn={isLoggedIn}
                  profile={location.pathname.startsWith("/me") ? profile?.user : user}
                  from={location.pathname}/>
            </UserProfile>)
          </>)} 
        />
    )
}

export default ProfileRoute;