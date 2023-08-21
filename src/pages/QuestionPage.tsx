import { Link } from "react-router-dom";
import HotQuestions from "../components/HotQuestions";
import TopMembers from "../components/TopMembers";
import Avatar from "../components/Avatar";
import { AnswerIcon, LikeIcon } from "../assets/icons";

const QuestionPage = () => {
  return (
    <section className="question-page">
      <div className="container">
        <div className="left-col">
          <h2>Question</h2>
          <div className="main-question">
            <div className="header">
              <div className="user">
                <Avatar />
                <Link to={"/profile/1"}>Benedict Umeozor</Link>
              </div>

              <button>follow</button>
            </div>
            <div className="body">
              <h3>Lorem ipsum dolor sit amet consectetur.</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
                rerum enim at vero repudiandae eius esse nisi assumenda delectus
                sequi?
              </p>
            </div>
            <div className="footer">
              <div className="actions">
                <div className="likes">
                  <LikeIcon className="icon" />
                  <span>254</span>
                </div>
                <div className="answers">
                  <AnswerIcon className="icon" />
                  <span>24</span>
                </div>
              </div>
            </div>
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
