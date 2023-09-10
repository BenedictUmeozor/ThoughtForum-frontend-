import Questions from "../components/Questions";
import HotQuestions from "../components/HotQuestions";
import TopMembers from "../components/TopMembers";
import { useState, useEffect } from "react";
import AddQuestionForm from "../components/AddQuestionForm";
import { axiosAuth, axiosInstance } from "../axios/axios";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setQuestions } from "../features/QuestionsSlice";
import { Link } from "react-router-dom";
import { setError } from "../features/SnackbarSlice";
import { useSocket } from "../contexts/socket";

const Home = () => {
  const fetchBtns = document.querySelectorAll(".fetch-btn");
  const [showAddForm, setShowAddForm] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [answersCount, setAnswersCount] = useState<{
    answersCount: number;
  } | null>(null);
  const questions = useAppSelector((state) => state.questions);
  const { _id } = useAppSelector((state) => state.auth);
  const socket = useSocket();
  const dispatch = useAppDispatch();

  const getQuestions = async () => {
    setFetchError(false);
    try {
      const { data } = await axiosInstance.get("/questions");
      dispatch(setQuestions(data));
    } catch (error) {
      dispatch(setError({ show: true, message: "Server error" }));
      setFetchError(true);
    }
  };

  const getTopQuestions = async () => {
    setFetchError(false);
    try {
      const { data } = await axiosInstance.get("/questions/top-questions");
      dispatch(setQuestions(data));
    } catch (error) {
      dispatch(setError({ show: true, message: "Server error" }));
      setFetchError(true);
    }
  };

  const getFollowingQuestions = async () => {
    setFetchError(false);
    try {
      const { data } = await axiosAuth.get("/questions/following-questions");
      dispatch(setQuestions(data));
    } catch (error) {
      dispatch(setError({ show: true, message: "Server error" }));
      setFetchError(true);
    }
  };

  const getAnswersCount = async () => {
    try {
      const { data } = await axiosInstance.get("/answers");
      setAnswersCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      for (let i = 0; i < fetchBtns.length; i++) {
        fetchBtns[i].classList.remove("active");
      }
      btn.classList.add("active");
    });
  });

  useEffect(() => {
    getQuestions();
    getAnswersCount();
  }, []);

  useEffect(() => {
    socket?.on("questionCreated", async () => {
      await getQuestions();
    });
  }, [socket]);

  return (
    <section className="home">
      {showAddForm && (
        <AddQuestionForm
          onClose={() => setShowAddForm(false)}
          closeModal={() => setShowAddForm(false)}
          onFetch={getQuestions}
        />
      )}
      <div className="container">
        <div className="left-col">
          <div className="question-box">
            {_id ? (
              <button onClick={() => setShowAddForm(true)}>
                Ask a question
              </button>
            ) : (
              <p className="no-auth-question">
                Want to ask a question? <Link to="/login">Login</Link>
              </p>
            )}
          </div>
          <div className="stats">
            <div className="question-stats">
              <h4>Questions</h4>
              <p>{questions.length}</p>
            </div>
            <div className="answer-stats">
              <h4>Answers</h4>
              <p>{answersCount?.answersCount || 0}</p>
            </div>
          </div>
          <div className="nav">
            <button className="fetch-btn active" onClick={getQuestions}>
              Recent questions
            </button>
            <button className="fetch-btn" onClick={getTopQuestions}>
              Top questions
            </button>
            {_id && (
              <button className="fetch-btn" onClick={getFollowingQuestions}>
                Following
              </button>
            )}
          </div>

          {!fetchError && (
            <div>
              {questions.length > 0 ? (
                <Questions onFetch={getQuestions} />
              ) : (
                <div className="no-data no-questions">
                  <p>No questions to show</p>
                </div>
              )}
            </div>
          )}
          {fetchError && (
            <div className="load-data">
              <p className="server-error-text">
                There was a problem with the server
              </p>
            </div>
          )}
        </div>
        <div className="right-col">
          <div className="question-box">
            {_id ? (
              <button onClick={() => setShowAddForm(true)}>
                Ask a question
              </button>
            ) : (
              <p className="no-auth-question">
                Want to ask a question? <Link to="/login">Login</Link>
              </p>
            )}
          </div>
          <div className="sidebar">
            <div className="stats">
              <div className="question-stats">
                <h4>Questions</h4>
                <p>{questions.length}</p>
              </div>
              <div className="answer-stats">
                <h4>Answers</h4>
                <p>{answersCount?.answersCount || 0}</p>
              </div>
            </div>
            <HotQuestions />
            <TopMembers />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
