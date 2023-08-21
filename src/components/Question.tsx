import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { AnswerIcon, LikeIcon } from "../assets/icons";

const Question = () => {
  return (
    <div className="question">
      <div className="question-header">
        <div className="flex">
          <Link to={'/profile/1'} className="user">
            <Avatar />
            <span>Benedict Umeozor</span>
          </Link>
          <div className="user-actions">
            <button>follow</button>
          </div>
        </div>
        <span className="category">in <Link to={'/'}>Science and technology</Link></span>
      </div>
      <div className="question-body">
        <h2 className="title">Lorem ipsum dolor sit amet consectetur</h2>
        <p className="body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis autem corrupti laboriosam maxime totam perferendis, voluptas possimus dolorum minus recusandae</p>
        <span className="time">Asked: August 21, 2023</span>
      </div>
      <div className="question-footer">
        <div className="question-info">
          <div className="likes action">
            <LikeIcon className="icon like-icon" />
            <span>45</span>
          </div>
          <Link to={'/question/1'} className="answers action">
            <AnswerIcon className="icon answer-icon" />
            <span>25</span>
          </Link>
        </div>
        <Link to={'/question/1'} className="answer">Answer</Link>
      </div>
    </div>
  );
};

export default Question;
