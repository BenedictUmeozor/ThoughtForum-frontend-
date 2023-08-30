import { Link } from "react-router-dom";
import { AnswerIcon, PencilIcon, TrashIcon } from "../assets/icons";
import { MouseEvent } from "react";

type PropTypes = {
  onClick?: (event: MouseEvent) => void;
};

const UserQuestion = ({ onClick }: PropTypes) => {
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
          <Link to={"/question/1"}>24 answers</Link>
        </p>
        <div className="icons">
          <div onClick={onClick}>
            <PencilIcon className="icon edit" />
          </div>
          <div>
            <TrashIcon className="icon delete" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserQuestion;
