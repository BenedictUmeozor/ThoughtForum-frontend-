import { useSearchParams } from "react-router-dom";
import HotQuestions from "../components/HotQuestions";
import Question from "../components/Question";
import TopMembers from "../components/TopMembers";

const CategoriesPage = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("category");

  const categories: string[] = [
    "technology",
    "romance",
    "sports",
    "finance",
    "education",
    "politics",
    "science and nature",
    "fashion",
  ];

  return (
    <section className="categories">
      <div className="container">
        <div className="left-col">
          <div className="category">
            {categories.map((category) => (
              <button
                className={`${queryParam === category ? "active" : ""}`}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="active-category">
            <p>Technology</p>
          </div>
          <div className="questions">
            <Question />
            <Question />
            <Question />
            <Question />
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

export default CategoriesPage;
