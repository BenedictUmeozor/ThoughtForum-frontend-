import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { EllipsisVertical, LikeIcon } from "../assets/icons";
import { MouseEvent, useState } from "react";

type PropTypes = {
  onClick?: (event: MouseEvent) => void;
};

const Answer = ({ onClick }: PropTypes) => {
  const [showActions, setShowActions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="answer">
      <div className="answer-header">
        <Link to={"/profile/1"} className="user">
          <Avatar />
          <span>John Doe</span>
        </Link>
        <div className="edit">
          <span>Edited</span>
          <div onClick={() => setShowActions((prev) => !prev)}>
            <EllipsisVertical className="icon" />
          </div>
          <div className={`user-actions ${showActions && "active"}`}>
            <p onClick={onClick}>edit</p>
            <p>delete</p>
          </div>
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
        <div onClick={() => setIsLiked((prev) => !prev)}>
          <LikeIcon className="icon" fill={isLiked ? "crimson" : "none"} />
        </div>
        <span>43</span>
      </div>
    </div>
  );
};

export default Answer;
