import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowTrendIcon } from "../assets/icons";
import { RelatedQuestion } from "../helpers/interfaces";
import { useAppDispatch } from "../hooks/hooks";
import { setError } from "../features/SnackbarSlice";
import { axiosInstance } from "../axios/axios";
import { CircularProgress } from "@mui/material";

type Props = {
  id: string | undefined;
  category: string | undefined;
};

const RelatedQuestions = ({ id, category }: Props) => {
  const [questions, setQuestions] = useState<RelatedQuestion[] | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const dispatch = useAppDispatch();

  const getRelatedQuestions = async () => {
    setFetchError(false);
    try {
      const { data } = await axiosInstance.get(
        "/questions/related-questions/" + category
      );
      const filtered = (data as RelatedQuestion[]).filter((q) => q._id !== id);
      setQuestions(filtered);
    } catch (error) {
      console.log(error);
      setFetchError(true);
      dispatch(setError({ show: true, message: "Something went wrong" }));
    }
  };

  useEffect(() => {
    if (id) {
      getRelatedQuestions();
    }
  }, [id]);

  return (
    <div className="related-questions">
      <div className="heading">
        <ArrowTrendIcon className="icon" />
        <h2>Related Questions</h2>
      </div>
      {fetchError && (
        <>
          <div className="load-data">
            <p className="server-error-text">
              There was a problem with the server
            </p>
          </div>
        </>
      )}
      {!fetchError && (
        <>
          {questions ? (
            <>
              {questions.length > 0 ? (
                <>
                  <div className="related">
                    {questions.map((question) => (
                      <div className="related-question" key={question._id}>
                        <Link
                          to={"/profile/" + question.user._id}
                          className="name"
                        >
                          {question.user.name}
                        </Link>
                        <Link
                          to={"/question/" + question._id}
                          className="title"
                        >
                          {question.title}
                        </Link>
                        <p className="body">
                          {question.body.substring(0, 120) +
                            [
                              question.body.length >
                              question.body.substring(0, 120).length
                                ? "..."
                                : "",
                            ]}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="no-data">
                    <p>No questions to show</p>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="load-data">
                <CircularProgress size={"1rem"} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RelatedQuestions;
