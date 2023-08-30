import { Link } from "react-router-dom";
import HotQuestions from "../components/HotQuestions";
import TopMembers from "../components/TopMembers";
import Avatar from "../components/Avatar";
import { AnswerIcon, LikeIcon } from "../assets/icons";
import Answer from "../components/Answer";
import { useState } from "react";
import EditAnswer from "../components/EditAnswer";
import AddAnswerForm from "../components/AddAnswerForm";

const QuestionPage = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <section className="question-page">
      {showEditForm && <EditAnswer onClose={() => setShowEditForm(false)} />}
      {showAddForm && <AddAnswerForm onClose={() => setShowAddForm(false)} />}
      <div className="container">
        <div className="left-col">
          <div className="main-question">
            <div className="header">
              <div className="user">
                <Avatar />
                <Link to={"/profile/1"}>Benedict Umeozor</Link>
              </div>

              <div className="follow-edit-div">
                <span>Edited</span>
                {isFollowing ? (
                  <button
                    className="following"
                    onClick={() => setIsFollowing(false)}
                  >
                    following
                  </button>
                ) : (
                  <button
                    className="follow"
                    onClick={() => setIsFollowing(true)}
                  >
                    follow
                  </button>
                )}
              </div>
            </div>
            <p className="category">
              in <Link to={"/categories/1"}>Science and technology</Link>
            </p>
            <div className="body">
              <h3>Lorem ipsum dolor sit amet consectetur.</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
                rerum enim at vero repudiandae eius esse nisi assumenda delectus
                sequi?
              </p>
              <span className="time">Asked: August 21, 2023</span>
            </div>
            <div className="footer">
              <div className="actions">
                <div
                  className="likes"
                  onClick={() => setIsLiked((prev) => !prev)}
                >
                  <LikeIcon
                    className="icon"
                    fill={isLiked ? "crimson" : "none"}
                  />
                  <span>254</span>
                </div>
                <div className="answers">
                  <AnswerIcon className="icon" />
                  <span>24</span>
                </div>
              </div>
            </div>
          </div>
          <div className="answers-div">
            <div className="answers-count">
              <p>
                <div>
                  Showing <span>24</span> answers
                </div>
                <button className="answer-btn" onClick={() => setShowAddForm(true)}>
                  <AnswerIcon className="icon" />
                  Answer
                </button>
              </p>
            </div>
            <div className="answers-list">
              <Answer onClick={() => setShowEditForm(true)} />
              <Answer onClick={() => setShowEditForm(true)} />
              <Answer onClick={() => setShowEditForm(true)} />
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
