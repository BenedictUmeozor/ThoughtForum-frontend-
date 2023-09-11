import { NavLink, useParams } from "react-router-dom";
import HotQuestions from "../components/HotQuestions";
import Question from "../components/Question";
import TopMembers from "../components/TopMembers";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axios";
import { CategoryInterface, QuestionInterface } from "../helpers/interfaces";
import { CircularProgress } from "@mui/material";
import { setError } from "../features/SnackbarSlice";
import AddQuestionForm from "../components/AddQuestionForm";

const CategoriesPage = () => {
  const categories: CategoryInterface[] = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();
  const [mainCategory, setMainCategory] = useState<CategoryInterface | null>(
    null
  );
  const [questions, setQuestions] = useState<QuestionInterface[] | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const { id } = useParams();
  const [show, setShow] = useState(false);

  const getQuestions = async (id: string) => {
    setFetchError(false);
    try {
      const { data } = await axiosInstance.get("/questions/category/" + id);
      setQuestions(data);
    } catch (error) {
      dispatch(setError({ show: true, message: "Server error" }));
      setFetchError(true);
    }
  };

  const onFetch = async () => {
    if (id) {
      await getQuestions(id);
    }
  };

  useEffect(() => {
    if (id) {
      setMainCategory(categories.find((c) => c._id === id)!);
      getQuestions(id);
    }
  }, [id]);

  return (
    <section className="categories">
      {show && (
        <AddQuestionForm
          onClose={() => setShow(false)}
          closeModal={() => setShow(false)}
          onFetch={onFetch}
        />
      )}
      <div className="container">
        <div className="left-col">
          <div className="category-page">
            {categories.map((category) => (
              <NavLink key={category._id} to={"/categories/" + category._id}>
                {category.title}
              </NavLink>
            ))}
          </div>
          <div className="active-category">
            <p>{mainCategory?.title}</p>
            <button onClick={() => setShow(true)}>Ask a question</button>
          </div>
          {!fetchError && (
            <div>
              {questions ? (
                questions.length > 0 ? (
                  <div className="questions">
                    {questions.map((question) => (
                      <Question
                        key={question._id}
                        question={question}
                        onFetch={() => getQuestions(mainCategory!._id)}
                        onLike={() => getQuestions(mainCategory!._id)}
                      />
                    ))}
                  </div>
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
          )}
          {fetchError && (
            <div className="load-data">
              <p className="server-error-text">
                There was a problem with the server
              </p>
            </div>
          )}
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

export default CategoriesPage;
