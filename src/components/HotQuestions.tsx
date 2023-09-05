import { useEffect, useState } from "react";
import { FireIcon } from "../assets/icons";
import Question from "./Question-sm";
import { axiosInstance } from "../axios/axios";
import { QuestionInterface } from "../helpers/interfaces";
import { CircularProgress } from "@mui/material";

const HotQuestions = () => {
  const [questions, setQuestions] = useState<QuestionInterface[] | null>(null);

  const fetchQuestions = async () => {
    try {
      const { data } = await axiosInstance.get("/questions/hot-questions");
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="hot-questions">
      <h2>
        <FireIcon className="icon" />
        Hot
      </h2>
      <div className="question-list">
        {questions ? (
          questions.length > 0 ? (
            questions.map((question) => (
              <Question key={question._id} question={question} />
            ))
          ) : (
            <div className="no-data">
              <p>No questions to show</p>
            </div>
          )
        ) : (
          <div className="load-data">
            <CircularProgress size={"1rem"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HotQuestions;
