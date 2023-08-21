import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { AnswerIcon } from "../assets/icons";

const Question = () => {
  return (
    <div className="question">
      <Link to='/profile/1' className="question-header">
        <Avatar />
        <span>Benedict Umeozor</span>
      </Link>
      <div className="question-body">
        <Link to={'/'}>
            Lorem ipsum dolor sit amet consectetur.
        </Link>
      </div>
      <div className="question-footer">
        <AnswerIcon className="answer-icon icon" />
        <Link to={'/question/1'}>12 answers</Link>
      </div>
    </div>
  );
};

export default Question;
