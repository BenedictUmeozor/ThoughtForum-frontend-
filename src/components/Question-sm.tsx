import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { AnswerIcon } from "../assets/icons";
import { QuestionInterface } from "../helpers/interfaces";

type PropTypes = {
  question: QuestionInterface;
};

const Question = ({ question }: PropTypes) => {
  return (
    <div className="question">
      <Link to={"/profile/" + question.user._id} className="question-header">
        <Avatar name={question.user.name} />
        <span>{question.user.name}</span>
      </Link>
      <div className="question-body">
        <Link to={"/question/" + question._id}>{question.title}</Link>
      </div>
      <div className="question-footer">
        <AnswerIcon className="answer-icon icon" />
        <Link to={"/question/" + question._id}>
          {question.answers.length}{" "}
          {question.answers.length === 1 ? "answer" : "answers"}
        </Link>
      </div>
    </div>
  );
};

export default Question;
