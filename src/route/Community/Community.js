import React, { useState, useEffect, useCallback } from "react";
import Category from "../../components/Category";
import CommunityContainer from "../../components/CommunityContainer/CommunityContainer";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, postLike } from "../../reducer/review";
import Helmet from "../../components/Helmet";
const Community = ({ history: { location } }) => {
  const { pathname } = location;
  const path = pathname.substr(1).split("/")[1];
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState(1);
  const { hasMore } = useSelector((state) => state.review);
  const { profile, isLoggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const loadReviews = useCallback(
    (page = 1) => {
      try {
        dispatch(
          getReviews({
            limit: 5,
            page,
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );
  const toggleMore = useCallback(
    (e) => {
      const {
        target: { dataset },
      } = e;
      if (
        selected[dataset["id"]] === undefined ||
        selected[dataset["id"]] === false
      ) {
        const tmp = { ...selected, [dataset["id"]]: true };
        setSelected(tmp);
      } else {
        const tmp = { ...selected, [dataset["id"]]: false };
        setSelected(tmp);
      }
    },
    [selected]
  );
  const loadMore = useCallback(
    (e) => {
      loadReviews(page + 1);
      setPage((cur) => cur + 1);
    },
    [loadReviews, page]
  );
  const handleLike = useCallback(
    (review) => () => {
      const { user } = profile;
      if (isLoggedIn) {
        dispatch(postLike("like", review._id, user._id));
      } else {
        alert("로그인이 필요합니다");
      }
    },
    [profile, isLoggedIn, dispatch]
  );
  useEffect(() => {
    setIsLoading(true);
    loadReviews();
    setIsLoading(false);
    return () => {};
  }, [loadReviews, dispatch]);
  return (
    <>
      <Helmet
        title={"Book Reviews | HappReads"}
        keywords={"책 리뷰, 리뷰, 최근 리뷰"}
      />
      <Category path={path} />
      <CommunityContainer
        path={path}
        hasMore={hasMore}
        loadMore={loadMore}
        selected={selected}
        toggleMore={toggleMore}
        handleLike={handleLike}
      />
    </>
  );
};

export default Community;
