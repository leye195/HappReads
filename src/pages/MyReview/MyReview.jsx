import React from 'react';
import cx from "classnames";
import UserReview from '../../components/UserReview';

const MyReview = ({profile,from}) => {
    return (
      <section>
        <section className={cx("recent-update")}>
          <div className={cx("recent-head")}>
            <h2>리뷰</h2>
          </div>
          <div className={cx("recent-body")}>
            {profile ? (
              <UserReview profile={profile} isMe={from.includes("/me")?true:false} />
            ) : (
              "리뷰 없음"
            )}
          </div>
        </section>
      </section>
    )
};

export default MyReview;