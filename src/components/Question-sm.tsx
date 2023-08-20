import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { AnswerIcon } from "../assets/icons";

const Question = () => {
  return (
    <div className="question">
      <div className="question-header">
        <Avatar />
        <span>Benedict Umeozor</span>
      </div>
      <div className="question-body">
        <Link to={'/'}>
            Lorem ipsum dolor sit amet consectetur.
        </Link>
      </div>
      <div className="question-footer">
        <AnswerIcon className="answer-icon icon" />
        <span>12 answers</span>
      </div>
    </div>
  );
};

export default Question;
