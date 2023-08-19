import Question from "../../components/Question";

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <div className="left-col">
          <div className="nav">
            <button>Recent questions</button>
            <button>Top questions</button>
            <button>Following</button>
          </div>
          <div className="questions">
            <Question />
            <Question />
            <Question />
            <Question />
          </div>
        </div>
        <div className="right-col">
          <div className="question-box">
            <button>Ask a question</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
