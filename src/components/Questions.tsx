import { useAppSelector } from "../hooks/hooks";
import Question from "./Question";

type Props = {
  onFetch: Function;
};

const Questions = ({ onFetch }: Props) => {
  const questions = useAppSelector((state) => state.questions);

  return (
    <div className="questions">
      {questions.map((question) => (
        <Question key={question._id} question={question} onFetch={onFetch} />
      ))}
    </div>
  );
};

export default Questions;
