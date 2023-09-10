import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import {
  AnswerIcon,
  EllipsisVertical,
  LikeIcon,
  PencilIcon,
  TrashIcon,
} from "../assets/icons";
import { useState } from "react";
import { setQuestions } from "../features/QuestionsSlice";
import { formatRFC7231 } from "date-fns";
import EditQuestionForm from "./EditQuestionForm";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { axiosAuth } from "../axios/axios";
import { QuestionInterface } from "../helpers/interfaces";
import { setSuccess, setWarning } from "../features/SnackbarSlice";
import { useSocket } from "../contexts/socket";

type QuestionProps = {
  question: QuestionInterface;
  onFetch: Function;
  onLike?: Function;
};

const Question = ({ question, onFetch, onLike }: QuestionProps) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { _id } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const socket = useSocket();

  const showEditForm = () => {
    setShowForm(true);
    setShow(false);
  };

  const likeQuestion = async () => {
    if (!_id) {
      dispatch(setWarning({ show: true, message: "You need to be logged in" }));
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosAuth.post("/questions/like/" + question._id);
      dispatch(setQuestions(data));
      if (onLike) {
        onLike();
      }
      if (question.user._id !== _id) {
        if (!question.likes.includes(_id)) {
          socket?.emit("like", {
            _id: question.user._id,
            type: "question",
            name: user?.name,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async () => {
    setLoading(true);
    try {
      const { data } = await axiosAuth.delete("/questions/" + question._id);
      dispatch(setQuestions(data));
      dispatch(
        setSuccess({ show: true, message: "Question deleted successfully" })
      );
      socket?.emit("questionCreated");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="question">
      {showForm && (
        <EditQuestionForm
          onFetch={onFetch}
          onClose={() => setShowForm(false)}
          closeModal={() => setShowForm(false)}
          question={question}
        />
      )}
      <div className="question-header">
        <div className="flex">
          <Link to={"/profile/" + question.user._id} className="user">
            <Avatar name={question.user?.name} />
            <span>{question.user.name}</span>
          </Link>
          <div className="user-actions">
            <div className="follow-edit-div">
              {_id && question.user._id === _id && (
                <div className="ellipsis">
                  <div
                    className="ellipsis-div"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    <EllipsisVertical className="icon" />
                  </div>
                  <div className={`ellipsis-content ${show && "active"}`}>
                    <p onClick={showEditForm}>
                      Edit
                      <PencilIcon className="icon edit-icon" />
                    </p>

                    <p
                      onClick={deleteQuestion}
                      className={loading ? "pointer-events" : ""}
                    >
                      Delete
                      <TrashIcon className="icon trash-icon" />
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <span className="category">
          in{" "}
          <Link to={"/categories/" + question.category._id}>
            {question.category.title}
          </Link>
        </span>
      </div>
      <div className="question-body">
        <Link to={"/question/" + question._id}>
          <h2 className="title">{question.title}</h2>
        </Link>
        <p className="body">
          {question.body.substring(0, 120) +
            [
              question.body.length > question.body.substring(0, 120).length
                ? "..."
                : "",
            ]}
        </p>
        <span className="time">
          Asked: {formatRFC7231(new Date(question.createdAt))}
        </span>
      </div>
      <div className="question-footer">
        <div className="question-info">
          <div className="likes action">
            <button disabled={loading} onClick={likeQuestion}>
              <LikeIcon
                className="icon like-icon"
                fill={_id && question.likes.includes(_id) ? "crimson" : "none"}
              />
            </button>
            <span>{question.likes.length}</span>
          </div>
          <Link to={"/question/" + question._id} className="answers action">
            <AnswerIcon className="icon answer-icon" />
            <span>{question.answers.length}</span>
          </Link>
        </div>
        <Link to={"/question/" + question._id} className="answer">
          Answer
        </Link>
      </div>
    </div>
  );
};

export default Question;
