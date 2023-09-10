import { Link, useParams } from "react-router-dom";
import TopMembers from "../components/TopMembers";
import Avatar from "../components/Avatar";
import { AnswerIcon, LikeIcon } from "../assets/icons";
import Answer from "../components/Answer";
import { useState, useEffect } from "react";
import AddAnswerForm from "../components/AddAnswerForm";
import { setQuestions } from "../features/QuestionsSlice";
import { axiosAuth, axiosInstance } from "../axios/axios";
import { CircularProgress } from "@mui/material";
import { formatRFC7231 } from "date-fns";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { AnswerInterface, QuestionInterface } from "../helpers/interfaces";
import { setError, setSuccess, setWarning } from "../features/SnackbarSlice";
import RelatedQuestions from "../components/RelatedQuestions";
import { useSocket } from "../contexts/socket";

const QuestionPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [question, setQuestion] = useState<QuestionInterface | null>(null);
  const [answers, setAnswers] = useState<AnswerInterface[] | null>(null);
  const [getQuestionsError, setGetQuestionsError] = useState(false);
  const [getAnswersError, setGetAnswersError] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { _id } = useAppSelector((state) => state.auth);
  const socket = useSocket();

  const { id } = useParams();

  const getQuestion = async () => {
    setGetQuestionsError(false);
    try {
      const { data } = await axiosInstance.get("/questions/" + id);
      setQuestion(data);
    } catch (error) {
      dispatch(setError({ show: true, message: "Server error" }));
      setGetQuestionsError(true);
      console.log(error);
    }
  };

  const getAnswers = async () => {
    setGetAnswersError(false);
    try {
      const { data } = await axiosInstance.get("/answers/" + id);
      setAnswers(data);
    } catch (error) {
      dispatch(setError({ show: true, message: "Server error" }));
      setGetAnswersError(true);
      console.log(error);
    }
  };

  const likeQuestion = async () => {
    setLikeLoading(true);
    if (!_id) {
      dispatch(setWarning({ show: true, message: "You need to be logged in" }));
      setLikeLoading(false);
      return;
    }
    try {
      const { data } = await axiosAuth.post("/questions/like/" + question?._id);
      dispatch(setQuestions(data));
      getQuestion();
    } catch (error) {
      console.log(error);
      dispatch(setError({ show: true, message: "Something went wrong" }));
    } finally {
      setLikeLoading(false);
    }
  };

  const followUser = () => {
    setFollowLoading(true);
    axiosAuth
      .post("/users/" + question?.user._id)
      .then(() => getQuestion())
      .then(() => {
        dispatch(
          setSuccess({
            show: true,
            message: !question?.user.followers.includes(_id!)
              ? `You are now following ${question?.user.name}`
              : `You are now unfollowing ${question?.user.name}`,
          })
        );
        if (!question?.user.followers.includes(_id!)) {
          socket?.emit("follow", { _id: question?.user._id, name: user?.name });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(setError({ show: true, message: "Something went wrong" }));
      })
      .finally(() => setFollowLoading(false));
  };

  useEffect(() => {
    if (id) {
      getQuestion().then(() => getAnswers());
    }
  }, [id]);

  useEffect(() => {
    socket?.on("answerCreated", async () => {
      await getQuestion();
      await getAnswers();
    });
  });

  return (
    <section className="question-page">
      {showAddForm && (
        <AddAnswerForm
          question_id={question!._id}
          user_id={question!.user._id}
          onClose={() => setShowAddForm(false)}
          closeModal={() => setShowAddForm(false)}
          onFetch={getAnswers}
        />
      )}
      <div className="container">
        <div className="left-col">
          {getQuestionsError && (
            <>
              <div className="load-data">
                <p className="server-error-text">There was a server error</p>
              </div>
            </>
          )}
          {!getQuestionsError && (
            <>
              {!question && (
                <div className="load-data questions-load">
                  <CircularProgress />
                </div>
              )}
              {question && (
                <div className="main-question">
                  <div className="header">
                    <div className="user">
                      <Avatar name={question.user.name} />
                      <Link to={"/profile/" + question.user._id}>
                        {question.user.name}
                      </Link>
                    </div>
                    <div className="follow-edit-div">
                      {_id &&
                        _id !== question.user._id &&
                        (question.user.followers.includes(_id) ? (
                          <button
                            disabled={followLoading}
                            className="following"
                            onClick={followUser}
                          >
                            {followLoading ? (
                              <CircularProgress size={"0.95rem"} />
                            ) : (
                              "following"
                            )}
                          </button>
                        ) : (
                          <button
                            disabled={followLoading}
                            className="follow"
                            onClick={followUser}
                          >
                            {followLoading ? (
                              <CircularProgress size={"0.95rem"} />
                            ) : (
                              "follow"
                            )}
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
                      Asked: {formatRFC7231(new Date(question.createdAt))}
                    </span>
                  </div>
                  <div className="footer">
                    <div className="actions">
                      <div
                        className={`likes ${likeLoading && "pointer-events"}`}
                        onClick={likeQuestion}
                      >
                        <LikeIcon
                          className="icon"
                          fill={
                            question.likes.includes(_id) ? "crimson" : "none"
                          }
                        />
                        <span>{question.likes.length}</span>
                      </div>
                      <div
                        className="answers"
                        onClick={() => setShowAddForm(true)}
                      >
                        <AnswerIcon className="icon" />
                        <span>{question.answers.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div className="answers-div">
            {getAnswersError && (
              <>
                <div className="load-data">
                  <p className="server-error-text">There was a server error</p>
                </div>
              </>
            )}
            {!getAnswersError && (
              <>
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
                        {_id && (
                          <button
                            className="answer-btn"
                            onClick={() => setShowAddForm(true)}
                          >
                            <AnswerIcon className="icon" />
                            Answer
                          </button>
                        )}
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
              </>
            )}
          </div>
        </div>
        <div className="right-col">
          <div className="sidebar">
            <RelatedQuestions id={question?.category._id} />
            <TopMembers />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionPage;
