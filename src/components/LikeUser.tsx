import Avatar from "./Avatar";
import { FollowUser as userInterface } from "../helpers/interfaces";
import { axiosAuth } from "../axios/axios";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Link } from "react-router-dom";
import { useState } from "react";
import { setError, setSuccess } from "../features/SnackbarSlice";
import { useSocket } from "../contexts/socket";

type Props = {
  user: userInterface;
  onFetch: Function;
  onClose: Function;
};

const LikeUser = ({ user, onFetch, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const { _id } = useAppSelector((state) => state.auth);
  const mainUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const followUser = () => {
    setLoading(true);
    axiosAuth
      .post("/users/" + user._id)
      .then(() => onFetch())
      .then(() => {
        dispatch(
          setSuccess({
            show: true,
            message: user?.followers.includes(_id!)
              ? `Succesfully unfollowed ${user?.name}`
              : `You are now following ${user?.name}`,
          })
        );
        if (!user.followers.includes(_id!)) {
          socket?.emit("follow", { _id: user._id, name: mainUser.name });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(setError({ show: true, message: "Something went wrong" }));
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="user">
      <div className="flex-between">
        <div className="flex">
          <Avatar name={user.name} />
          <Link
            onClick={() => onClose()}
            to={"/profile/" + user._id}
            className="name"
            style={{ fontWeight: "500" }}
          >
            {user.name}
          </Link>
        </div>
        {user._id !== _id ? (
          user.followers.includes(_id!) ? (
            <button
              disabled={loading}
              className="following"
              onClick={followUser}
            >
              following
            </button>
          ) : (
            <button disabled={loading} className="follow" onClick={followUser}>
              follow
            </button>
          )
        ) : (
          <></>
        )}
      </div>
      <p className="question-count">
        {user.questions.length}{" "}
        {user.questions.length === 1 ? "question" : "questions"}
      </p>
    </div>
  );
};

export default LikeUser;