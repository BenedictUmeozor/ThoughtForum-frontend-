import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import {
  EllipsisVertical,
  LikeIcon,
  PencilIcon,
  TrashIcon,
} from "../assets/icons";
import { useState } from "react";
import { AnswerInterface } from "../helpers/interfaces";
import { lightFormat } from "date-fns";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import EditAnswer from "./EditAnswer";
import { axiosAuth } from "../axios/axios";
import { setSuccess } from "../features/SnackbarSlice";

type PropTypes = {
  answer: AnswerInterface;
  onFetch: Function;
};

const Answer = ({ answer, onFetch }: PropTypes) => {
  const [showActions, setShowActions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { _id } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const showEditForm = () => {
    setShowForm(true);
    setShowActions(false);
  };

  const likeAnswer = () => {
    setLoading(true);
    axiosAuth
      .post("/answers/" + answer._id)
      .then(() => onFetch())
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const deleteAnswer = () => {
    setLoading(true);
    axiosAuth
      .delete("/answers/" + answer._id)
      .then(() => onFetch())
      .then(() =>
        dispatch(
          setSuccess({
            show: true,
            message: `Answer deleted successfully`,
          })
        )
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="answer">
      {showForm && (
        <EditAnswer
          answer={answer}
          onFetch={onFetch}
          onClose={() => setShowForm(false)}
          closeModal={() => setShowForm(false)}
        />
      )}
      <div className="answer-header">
        <Link to={"/profile/" + answer.user._id} className="user">
          <Avatar />
          <span>{answer.user.name}</span>
        </Link>
        {_id && answer.user._id === _id && (
          <div className="edit">
            <div onClick={() => setShowActions((prev) => !prev)}>
              <EllipsisVertical className="icon" />
            </div>
            <div className={`user-actions ${showActions && "active"}`}>
              <p onClick={showEditForm}>
                edit
                <PencilIcon className="icon" />
              </p>
              <p
                className={loading ? "pointer-events" : ""}
                onClick={deleteAnswer}
              >
                delete
                <TrashIcon className="icon" />
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="answer-body">
        <p>{answer.text}</p>

        <span className="time">
          {lightFormat(new Date(answer.createdAt), "yyyy-MMM-dd h:m a")}
        </span>
      </div>
      <div className="answer-footer">
        <div className={loading ? "pointer-events" : ""} onClick={likeAnswer}>
          <LikeIcon
            className="icon"
            fill={_id && answer.likes.includes(_id) ? "crimson" : "none"}
          />
        </div>
        <span>{answer.likes.length}</span>
      </div>
    </div>
  );
};

export default Answer;
