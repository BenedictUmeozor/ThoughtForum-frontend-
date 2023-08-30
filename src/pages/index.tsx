import Questions from "../components/Questions";
import HotQuestions from "../components/HotQuestions";
import TopMembers from "../components/TopMembers";
import { useState } from "react";
import AddQuestionForm from "../components/AddQuestionForm";

const Home = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <section className="home">
      {showAddForm && <AddQuestionForm onClose={() => setShowAddForm(false)} />}
      <div className="container">
        <div className="left-col">
          <div className="question-box">
            <button>Ask a question</button>
          </div>
          <div className="stats">
            <div className="question-stats">
              <h4>Questions</h4>
              <p>636</p>
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
          <Questions />
        </div>
        <div className="right-col">
          <div className="question-box">
            <button onClick={() => setShowAddForm(true)}>Ask a question</button>
          </div>
          <div className="sidebar">
            <div className="stats">
              <div className="question-stats">
                <h4>Questions</h4>
                <p>636</p>
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
