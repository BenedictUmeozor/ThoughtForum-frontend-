import { useState } from "react";
import Avatar from "./Avatar";

const FollowUser = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <div className="user">
      <div className="flex-between">
        <div className="flex">
          <Avatar />
          <p className="name">Benedict Umeozor</p>
        </div>
        {isFollowing ? (
          <button className="following" onClick={() => setIsFollowing(false)}>
            following
          </button>
        ) : (
          <button className="follow" onClick={() => setIsFollowing(true)}>
            follow
          </button>
        )}
      </div>
      <p className="question-count">20 questions</p>
    </div>
  );
};

export default FollowUser;
