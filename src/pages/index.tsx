import Questions from "../components/Questions";
import HotQuestions from "../components/HotQuestions";
import TopMembers from "../components/TopMembers";
import { useState, useEffect } from "react";
import AddQuestionForm from "../components/AddQuestionForm";
import { axiosInstance } from "../axios/axios";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setQuestions } from "../features/QuestionsSlice";

const Home = () => {
  const [showAddForm, setShowAddForm] = useState(false);
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

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <section className="home">
      {showAddForm && <AddQuestionForm onClose={() => setShowAddForm(false)} closeModal={() => setShowAddForm(false)} onFetch={getQuestions} />}
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
              <p>773</p>
            </div>
          </div>
          <div className="nav">
            <button className="active">Recent questions</button>
            <button>Top questions</button>
            <button>Following</button>
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
                <p>773</p>
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
