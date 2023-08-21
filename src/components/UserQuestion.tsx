import { Link } from "react-router-dom";
import { AnswerIcon, PencilIcon, TrashIcon } from "../assets/icons";

const UserQuestion = () => {
  return (
    <div className="profile-question">
      <div className="header">
        <Link to={"/question/1"}>Lorem ipsum dolor sit amet consectetur.</Link>
      </div>
      <div className="body">
        <p className="category">
          in <Link to={"/"}>Science and nature</Link>
        </p>
        <span className="time">Asked August 21, 2023</span>
      </div>
      <div className="footer">
        <p>
          <AnswerIcon className="icon" />
          <Link to={'/question/1'}>24 answers</Link>
        </p>
        <div className="icons">
          <PencilIcon className="icon edit" />
          <TrashIcon className="icon delete" />
        </div>
      </div>
    </div>
  );
};

export default UserQuestion;
