import Questions from "../components/Questions";
import HotQuestions from "../components/HotQuestions";
import TopMembers from "../components/TopMembers";
import { useState, useEffect } from "react";
import AddQuestionForm from "../components/AddQuestionForm";
import { axiosAuth, axiosInstance } from "../axios/axios";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setQuestions } from "../features/QuestionsSlice";

const Home = () => {
  const fetchBtns = document.querySelectorAll(".fetch-btn");
  const [showAddForm, setShowAddForm] = useState(false);
  const [answersCount, setAnswersCount] = useState<{
    answersCount: number;
  } | null>(null);
  const questions = useAppSelector((state) => state.questions);
  const dispatch = useAppDispatch();

  const getQuestions = async () => {
    try {
      const { data } = await axiosInstance.get("/questions");
      dispatch(setQuestions(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getTopQuestions = async () => {
    try {
      const { data } = await axiosInstance.get("/questions/top-questions");
      dispatch(setQuestions(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowingQuestions = async () => {
    try {
      const { data } = await axiosAuth.get("/questions/following-questions");
      dispatch(setQuestions(data));
    } catch (error) {
      console.log(error);
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
            <button onClick={() => setShowAddForm(true)}>Ask a question</button>
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
            <button className="fetch-btn" onClick={getFollowingQuestions}>
              Following
            </button>
          </div>

          {questions.length > 0 ? (
            <Questions onFetch={getQuestions} />
          ) : (
            <div className="no-data no-questions">
              <p>No questions to show</p>
            </div>
          )}
        </div>
        <div className="right-col">
          <div className="question-box">
            <button onClick={() => setShowAddForm(true)}>Ask a question</button>
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
