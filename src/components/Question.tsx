import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { AnswerIcon, LikeIcon } from "../assets/icons";

const Question = () => {
  return (
    <div className="question">
      <div className="user">
        <Avatar />
      </div>
      <div className="content">
        <div className="content-header">
          <span className="name">Benedict Umeozor </span>
          <span>
            in{" "}
            <Link to={"/"} className="category">
              Science and nature
            </Link>
          </span>
        </div>
        <div className="content-body">
          <h3 className="title">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </h3>
          <p className="text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui,
            totam. Tempora, beatae omnis quasi blanditiis voluptatibus aliquid
            optio eos corrupti.
          </p>
          <span className="time">Asked: August 20, 2023</span>
        </div>
        <div className="content-footer">
          <div className="left">
            <div className="like">
              <LikeIcon className="icon like-icon" />
              <span>242</span>
            </div>
            <div className="answer">
              <AnswerIcon className="icon answer-icon" />
              <span>21 answers</span>
            </div>
          </div>
          <Link to={"/"}>Answer</Link>
        </div>
      </div>
    </div>
  );
};

export default Question;
