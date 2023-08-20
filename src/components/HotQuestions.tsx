import { FireIcon } from "../assets/icons";
import Question from "./Question-sm";

const HotQuestions = () => {
  return (
    <div className="hot-questions">
      <h2>
        <FireIcon className="icon" />
        Hot
      </h2>
      <div className="question-list">
        <Question />
        <Question />
        <Question />
      </div>
    </div>
  );
};

export default HotQuestions;
