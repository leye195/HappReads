import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { check } from "../reducer/login";

export default (SpecificComponent, option) => {
  const AuthenticationCheck = (props) => {
    let user = useSelector((state) => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(check()).then((response) => {
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          if (option === false) props.history.push("/");
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  };
  return AuthenticationCheck;
};
