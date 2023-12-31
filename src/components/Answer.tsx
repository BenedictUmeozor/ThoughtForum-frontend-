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
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import EditAnswer from "./EditAnswer";
import { axiosAuth } from "../axios/axios";
import { setSuccess, setWarning } from "../features/SnackbarSlice";
import { formatRFC7231 } from "date-fns";
import { useSocket } from "../contexts/socket";
import LikesModal from "./LikesModal";

type PropTypes = {
  answer: AnswerInterface;
  onFetch: Function;
};

const Answer = ({ answer, onFetch }: PropTypes) => {
  const [showActions, setShowActions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { _id } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();
  const dispatch = useAppDispatch();

  const showEditForm = () => {
    setShowForm(true);
    setShowActions(false);
  };

  const likeAnswer = () => {
    if (!_id) {
      dispatch(setWarning({ show: true, message: "You need to be logged in" }));
      return;
    }
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
      .then(() => {
        dispatch(
          setSuccess({
            show: true,
            message: `Answer deleted successfully`,
          })
        );
        socket?.emit("answerCreated");
      })
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
      {showModal && <LikesModal title="answers" closeModal={() => setShowModal(false)} onClose={() => setShowModal(false)} id={answer._id}  />}
      <div className="answer-header">
        <Link to={"/profile/" + answer.user._id} className="user">
          <Avatar name={answer.user?.name} />
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
          {formatRFC7231(new Date(answer.createdAt))}
        </span>
      </div>
      <div className="answer-footer">
        <div className={loading ? "pointer-events" : ""} onClick={likeAnswer}>
          <LikeIcon
            className="icon"
            fill={_id && answer.likes.includes(_id) ? "crimson" : "none"}
          />
        </div>
        <span style={{ cursor: "pointer" }} onClick={() => setShowModal(true)}>
          {answer.likes.length}
        </span>
      </div>
    </div>
  );
};

export default Answer;
