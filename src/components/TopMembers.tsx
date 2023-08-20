import { UsersIcon } from "../assets/icons";
import User from "./User";

const TopMembers = () => {
  return (
    <div className="top-members">
      <h2>
        <UsersIcon className="icon" />
        Top Members
      </h2>
      <div className="user-list">
        <User />
        <User />
        <User />
      </div>
    </div>
  );
};

export default TopMembers;
