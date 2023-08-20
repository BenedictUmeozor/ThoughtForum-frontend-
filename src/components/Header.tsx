import { SearchIcon } from "../assets/icons";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link to={"/"} className="logo">
          <h1>
            Thought<span>Forum</span>
          </h1>
        </Link>
        <div className="right-col">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <SearchIcon className="search-icon icon" />
          </div>
          <div className="user-div">
            <div className="user">
              <Avatar />
              <div className="auth">
                <span>Logged in as</span>
                <p>Benedict Umeozor</p>
              </div>
            </div>
            <Link to={"/"} className="logout">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
