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
import { lightFormat } from "date-fns";
import EditQuestionForm from "./EditQuestionForm";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { axiosAuth } from "../axios/axios";
import { QuestionInterface } from "../helpers/interfaces";

type QuestionProps = {
  question: QuestionInterface;
  onFetch: Function;
};

const Question = ({ question, onFetch }: QuestionProps) => {
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { _id } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const showEditForm = () => {
    setShowForm(true);
    setShow(false);
  };

  const likeQuestion = async () => {
    try {
      const { data } = await axiosAuth.post("/questions/like/" + question._id);
      dispatch(setQuestions(data));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuestion = async () => {
    try {
      const { data } = await axiosAuth.delete("/questions/" + question._id);
      dispatch(setQuestions(data));
    } catch (error) {
      console.log(error);
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
            <Avatar />
            <span>{question.user.name}</span>
          </Link>
          <div className="user-actions">
            <div className="follow-edit-div">
              {_id && question.user._id === _id && (
                <div className="ellipsis">
                  <div onClick={() => setShow((prev) => !prev)}>
                    <EllipsisVertical className="icon" />
                  </div>
                  <div className={`ellipsis-content ${show && "active"}`}>
                    <p onClick={showEditForm}>
                      Edit
                      <PencilIcon className="icon edit-icon" />
                    </p>
                    <p onClick={deleteQuestion}>
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
        <p className="body">{question.body}</p>
        <span className="time">
          Asked:{" "}
          {lightFormat(new Date(question.createdAt), "yyyy-MMM-dd h:m a")}
        </span>
      </div>
      <div className="question-footer">
        <div className="question-info">
          <div className="likes action">
            <div onClick={likeQuestion}>
              <LikeIcon
                className="icon like-icon"
                fill={_id && question.likes.includes(_id) ? "crimson" : "none"}
              />
            </div>
            <span>{question.likes.length}</span>
          </div>
          <Link to={"/question/1"} className="answers action">
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
