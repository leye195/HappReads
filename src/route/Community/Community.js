import React, { useState, useEffect, useCallback } from "react";
import Category from "../../components/Category";
import CommunityContainer from "../../components/CommunityContainer/CommunityContainer";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, postLike } from "../../reducer/review";
const Community = ({ history: { location } }) => {
  const { pathname } = location;
  const path = pathname.substr(1).split("/")[1];
  const [isLoading, setIsLoading] = useState(true);
  const [more, setMore] = useState(false);
  const [page, setPage] = useState(1);
  const { reviews, loadReviewsPending, loadReviewsDone } = useSelector(
    (state) => state.review
  );
  const { profile, isLoggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const loadReviews = useCallback(
    async (page = 1) => {
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
  const toggleMore = useCallback(() => {
    setMore((cur) => !cur);
  }, []);
  const loadMore = useCallback(
    (e) => {
      console.log("lood more");
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
  }, [loadReviews, dispatch, page]);
  return (
    <>
      <Category path={path} />
      <CommunityContainer
        path={path}
        isLoading={isLoading}
        reviews={reviews}
        loadingReviewsDone={loadReviewsDone}
        loadReviewsPending={loadReviewsPending}
        loadMore={loadMore}
        more={more}
        toggleMore={toggleMore}
        handleLike={handleLike}
      />
    </>
  );
};

export default Community;
