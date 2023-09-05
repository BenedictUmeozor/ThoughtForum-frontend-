import { NavLink, useParams } from "react-router-dom";
import HotQuestions from "../components/HotQuestions";
import Question from "../components/Question";
import TopMembers from "../components/TopMembers";
import { useAppSelector } from "../hooks/hooks";
import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axios";
import { CategoryInterface, QuestionInterface } from "../helpers/interfaces";
import { CircularProgress } from "@mui/material";

const CategoriesPage = () => {
  const categories: CategoryInterface[] = useAppSelector(
    (state) => state.categories
  );
  const [mainCategory, setMainCategory] = useState<CategoryInterface | null>(
    null
  );
  const [questions, setQuestions] = useState<QuestionInterface[] | null>(null);
  const { id } = useParams();

  const getQuestions = async (id: string) => {
    try {
      const { data } = await axiosInstance.get("/questions/category/" + id);
      setQuestions(data);
    } catch (error) {
      console.log(error);
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
          </div>
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
