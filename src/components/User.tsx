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
          <p className="name">Benedict Umeozor</p>
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
