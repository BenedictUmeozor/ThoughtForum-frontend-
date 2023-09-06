import { Link } from "react-router-dom";
import { QuestionIcon } from "../assets/icons";
import Avatar from "./Avatar";
import { useState } from "react";
import { axiosAuth } from "../axios/axios";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setSuccess } from "../features/SnackbarSlice";

interface UserInterface {
  _id: string;
  name: string;
  followers: string[];
  questions: string[];
}

type PropTypes = {
  user: UserInterface;
  onFetch: Function;
};

const User = ({ user, onFetch }: PropTypes) => {
  const { _id } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const followUser = () => {
    setLoading(true);
    axiosAuth
      .post("/users/" + user._id)
      .then(() => onFetch())
      .then(() =>
        dispatch(
          setSuccess({
            show: true,
            message: !user?.followers.includes(_id!)
              ? `Succesfully unfollowed ${user?.name}`
              : `You are now following ${user?.name}`,
          })
        )
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="user">
      <div className="left">
        <Avatar />
      </div>
      <div className="right">
        <div className="flex-between">
          <Link to={"/profile/" + user._id} className="name">
            {user.name}
          </Link>
          {_id &&
            _id !== user._id &&
            (user.followers.includes(_id) ? (
              <button
                disabled={loading}
                className="following"
                onClick={followUser}
              >
                following
              </button>
            ) : (
              <button
                disabled={loading}
                className="follow"
                onClick={followUser}
              >
                follow
              </button>
            ))}
        </div>
        <div className="questions">
          <QuestionIcon className="icon" />
          <span>
            {user.questions.length}{" "}
            {user.questions.length === 1 ? "question" : "questions"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default User;
