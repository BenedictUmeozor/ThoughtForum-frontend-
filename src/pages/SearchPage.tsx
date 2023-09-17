import { useEffect, useState } from "react";
import HotQuestions from "../components/HotQuestions";
import TopMembers from "../components/TopMembers";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { QuestionInterface } from "../helpers/interfaces";
import { setError, setInfo } from "../features/SnackbarSlice";
import { axiosInstance } from "../axios/axios";
import { setQuestions } from "../features/QuestionsSlice";
import { CircularProgress } from "@mui/material";
import Question from "../components/Question";
import { SearchIcon } from "../assets/icons";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const questions = useAppSelector((state) => state.questions);
  const dispatch = useAppDispatch();
  const [fetchError, setFetchError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<QuestionInterface[] | null>(
    []
  );
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get("search");

  useEffect(() => {
    if (paramValue) {
      setSearchTerm(paramValue);
    }
  }, [paramValue]);

  const getQuestions = async () => {
    setFetchError(false);
    try {
      const { data } = await axiosInstance.get("/questions");
      dispatch(setQuestions(data));
    } catch (error) {
      dispatch(setError({ show: true, message: "Server error" }));
      setFetchError(true);
    }
  };

  const getResult = () => {
    if (!searchTerm) {
      dispatch(setInfo({ show: true, message: "You need to enter a search" }));
      setSearchResult([]);
      return;
    }
    setSearchResult(null);
    const searched = questions.filter((question) =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setSearchResult(searched);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      getResult();
    } else {
      setSearchResult([]);
    }
  }, [searchTerm]);

  return (
    <section className="search-page">
      <div className="container">
        <div className="left-col">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search a question"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="icon" />
          </div>
          <div className="search-result-text">
            Showing {searchResult?.length}{" "}
            {searchResult?.length === 1 ? "result" : "results"}
          </div>
          <div className="questions">
            {fetchError ? (
              <div className="load-data">
                <p className="server-error-text">
                  There was a problem with the server
                </p>
              </div>
            ) : searchResult ? (
              searchResult.length > 0 ? (
                searchResult.map((question) => (
                  <Question
                    key={question._id}
                    question={question}
                    onFetch={getResult}
                    onLike={getResult}
                  />
                ))
              ) : (
                <>
                  <div className="no-result">
                    No results returned {searchTerm ? "for" : ""}{" "}
                    <span>{searchTerm}</span>
                  </div>
                </>
              )
            ) : (
              <div className="load-data">
                <CircularProgress size={"1.5rem"} />
              </div>
            )}
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

export default SearchPage;
