import { Link } from "react-router-dom";
import { QuestionIcon } from "../assets/icons";
import Avatar from "./Avatar";

const User = () => {
  return (
    <div className="user">
      <div className="left">
        <Avatar />
      </div>
      <div className="right">
        <div className="flex-between">
          <Link to={'/profile/1'} className="name">Benedict Umeozor</Link>
          <button>follow</button>
        </div>
        <div className="questions">
          <QuestionIcon className="icon" />
          <span>50 questions</span>
        </div>
      </div>
    </div>
  );
};

export default User;
