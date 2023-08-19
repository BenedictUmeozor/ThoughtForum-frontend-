import { ChatIcon, SearchIcon } from "../assets/icons";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link className="logo" to={"/"}>
          <ChatIcon className="chat-icon icon" />
          <h1>
            Thought<span>Forum</span>
          </h1>
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <SearchIcon className="search-icon icon" />
        </div>
        <div className="user-avatar">
          <div className="user">
            <Avatar />
            <div className="user-info">
              <span>Logged in as</span>
              <p>Benedict Umeozor</p>
            </div>
          </div>
          <Link to={"/"} className="btn logout">
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
