import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { LikeIcon, PencilIcon } from "../assets/icons";

const Answer = () => {
  return (
    <div className="answer">
      <div className="answer-header">
        <Link to={"/profile/1"} className="user">
          <Avatar />
          <span>Benedict Umeozor</span>
        </Link>
        <div className="edit">
          <span>Edited</span>
          <button>
            Edit <PencilIcon className="icon" />
          </button>
        </div>
      </div>
      <div className="answer-body">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          soluta enim quam quia inventore necessitatibus asperiores a architecto
          ab assumenda?
        </p>

        <span className="time">August 24, 2023</span>
      </div>
      <div className="answer-footer">
        <LikeIcon className="icon" />
        <span>43</span>
      </div>
    </div>
  );
};

export default Answer;
