import { Link, useParams } from "react-router-dom";
import HotQuestions from "../components/HotQuestions";
import TopMembers from "../components/TopMembers";
import Avatar from "../components/Avatar";
import { AnswerIcon, LikeIcon } from "../assets/icons";
import Answer from "../components/Answer";
import { useState, useEffect } from "react";
import AddAnswerForm from "../components/AddAnswerForm";
import { setQuestions } from "../features/QuestionsSlice";
import { axiosAuth, axiosInstance } from "../axios/axios";
import { CircularProgress } from "@mui/material";
import { lightFormat } from "date-fns";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { AnswerInterface, QuestionInterface } from "../helpers/interfaces";

const QuestionPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [question, setQuestion] = useState<QuestionInterface | null>(null);
  const [answers, setAnswers] = useState<AnswerInterface[] | null>(null);
  const dispatch = useAppDispatch();
  const { _id } = useAppSelector((state) => state.auth);

  const { id } = useParams();

  const getQuestion = async () => {
    try {
      const { data } = await axiosInstance.get("/questions/" + id);
      setQuestion(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAnswers = async () => {
    try {
      const { data } = await axiosInstance.get("/answers/" + id);
      setAnswers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const likeQuestion = async () => {
    try {
      const { data } = await axiosAuth.post("/questions/like/" + question?._id);
      dispatch(setQuestions(data));
      getQuestion();
    } catch (error) {
      console.log(error);
    }
  };

  const followUser = () => {
    axiosAuth
      .post("/users/" + question?.user._id)
      .then(() => getQuestion())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (id) {
      getQuestion().then(() => getAnswers());
    }
  }, [id]);

  return (
    <section className="question-page">
      {showAddForm && (
        <AddAnswerForm
          question_id={question!._id}
          onClose={() => setShowAddForm(false)}
          closeModal={() => setShowAddForm(false)}
          onFetch={getAnswers}
        />
      )}
      <div className="container">
        <div className="left-col">
          {!question && (
            <div className="load-data questions-load">
              <CircularProgress />
            </div>
          )}
          {question && (
            <div className="main-question">
              <div className="header">
                <div className="user">
                  <Avatar />
                  <Link to={"/profile/" + question.user._id}>
                    {question.user.name}
                  </Link>
                </div>
                <div className="follow-edit-div">
                  {_id &&
                    _id !== question.user._id &&
                    (question.user.followers.includes(_id) ? (
                      <button className="following" onClick={followUser}>
                        following
                      </button>
                    ) : (
                      <button className="follow" onClick={followUser}>
                        follow
                      </button>
                    ))}
                </div>
              </div>
              <p className="category">
                in{" "}
                <Link to={"/categories/" + question.category._id}>
                  {question.category.title}
                </Link>
              </p>
              <div className="body">
                <h3>{question.title}</h3>
                <p>{question.body}</p>
                <span className="time">
                  Asked:{" "}
                  {lightFormat(
                    new Date(question.createdAt),
                    "yyyy-MMM-dd h:m a"
                  )}
                </span>
              </div>
              <div className="footer">
                <div className="actions">
                  <div className="likes" onClick={likeQuestion}>
                    <LikeIcon
                      className="icon"
                      fill={question.likes.includes(_id) ? "crimson" : "none"}
                    />
                    <span>{question.likes.length}</span>
                  </div>
                  <div className="answers" onClick={() => setShowAddForm(true)}>
                    <AnswerIcon className="icon" />
                    <span>{question.answers.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="answers-div">
            {!answers && (
              <div className="load-data answers-load">
                <CircularProgress />
              </div>
            )}
            {answers && (
              <>
                <div className="answers-count">
                  <div className="showing">
                    <div>
                      Showing <span>{answers.length}</span>{" "}
                      {answers.length === 1 ? "answer" : "answers"}
                    </div>
                    <button
                      className="answer-btn"
                      onClick={() => setShowAddForm(true)}
                    >
                      <AnswerIcon className="icon" />
                      Answer
                    </button>
                  </div>
                </div>
                {answers.length > 0 ? (
                  <div className="answers-list">
                    {answers.map((answer) => (
                      <Answer
                        onFetch={getAnswers}
                        key={answer._id}
                        answer={answer}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-data no-answers">
                    <p>No answers to show</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="right-col">
          <div className="sidebar">
            <HotQuestions />
            <TopMembers />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionPage;
