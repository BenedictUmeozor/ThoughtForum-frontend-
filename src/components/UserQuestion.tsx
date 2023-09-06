import { Link } from "react-router-dom";
import { AnswerIcon, PencilIcon, TrashIcon } from "../assets/icons";
import { useState } from "react";
import EditQuestionForm from "./EditQuestionForm";
import { QuestionInterface } from "../helpers/interfaces";
import { lightFormat } from "date-fns";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { axiosAuth } from "../axios/axios";
import { setSuccess } from "../features/SnackbarSlice";

type PropTypes = {
  question: QuestionInterface;
  onFetch: Function;
};

const UserQuestion = ({ question, onFetch }: PropTypes) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { _id } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const deleteQuestion = async () => {
    setLoading(true);
    try {
      await axiosAuth.delete("/questions/" + question._id);
      onFetch();
      dispatch(
        setSuccess({ show: true, message: "Question deleted successfully" })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-question">
      {showForm && (
        <EditQuestionForm
          onClose={() => setShowForm(false)}
          closeModal={() => setShowForm(false)}
          question={question}
          onFetch={onFetch}
        />
      )}
      <div className="header">
        <Link to={"/question/" + question._id}>{question.title}</Link>
      </div>
      <div className="body">
        <p className="category">
          in{" "}
          <Link to={"/categories/" + question.category._id}>
            {question.category.title}
          </Link>
        </p>
        <p className="text">{question.body}</p>
        <span className="time">
          Asked {lightFormat(new Date(question.createdAt), "yyyy-MMM-dd h:m a")}
        </span>
      </div>
      <div className="footer">
        <p>
          <AnswerIcon className="icon" />
          <Link to={"/question/" + question._id}>
            {question.answers.length}{" "}
            {question.answers.length === 1 ? "answer" : "answers"}
          </Link>
        </p>
        {question.user._id === _id && (
          <div className="icons">
            <div onClick={() => setShowForm(true)}>
              <PencilIcon className="icon edit" />
            </div>
            <div>
              <button disabled={loading} onClick={() => deleteQuestion()}>
                <TrashIcon className="icon delete" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQuestion;
