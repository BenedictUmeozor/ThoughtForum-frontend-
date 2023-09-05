import Avatar from "./Avatar";
import { FollowUser as userInterface } from "../helpers/interfaces";
import { axiosAuth } from "../axios/axios";
import { useAppSelector } from "../hooks/hooks";
import { Link } from "react-router-dom";
import { useState } from "react";

type Props = {
  user: userInterface;
  onFetch: Function;
  title: string;
  onClose: Function;
};

const FollowUser = ({ user, onFetch, title, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const { _id } = useAppSelector((state) => state.auth);
  const followUser = () => {
    setLoading(true);
    axiosAuth
      .post("/users/" + user._id)
      .then(() => onFetch())
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="user">
      <div className="flex-between">
        <div className="flex">
          <Avatar />
          <Link
            onClick={() => onClose()}
            to={"/profile/" + user._id}
            className="name"
            style={{ fontWeight: "500" }}
          >
            {user.name}
          </Link>
        </div>
        {title === "followers"
          ? user.followers.includes(_id!)
            ? user._id != _id && (
                <button
                  disabled={loading}
                  className="following"
                  onClick={followUser}
                >
                  following
                </button>
              )
            : user._id != _id && (
                <button
                  disabled={loading}
                  className="follow"
                  onClick={followUser}
                >
                  follow
                </button>
              )
          : user.followers.includes(_id!) && user._id !== _id
          ? user._id != _id && (
              <button
                disabled={loading}
                className="following"
                onClick={followUser}
              >
                following
              </button>
            )
          : user._id != _id && (
              <button
                disabled={loading}
                className="follow"
                onClick={followUser}
              >
                follow
              </button>
            )}
      </div>
      <p className="question-count">
        {user.questions.length}{" "}
        {user.questions.length === 1 ? "question" : "questions"}
      </p>
    </div>
  );
};

export default FollowUser;
