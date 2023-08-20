import { SearchIcon } from "../assets/icons";
import { Link, NavLink } from "react-router-dom";
import Avatar from "./Avatar";

const Header = () => {
  const show = true;

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
          {show ? (
            <div className="user-div">
              <div className="user">
                <Link to={"/profile"}>
                  <Avatar />
                </Link>
                <div className="auth">
                  <span>Logged in as</span>
                  <p>Benedict Umeozor</p>
                </div>
              </div>
              <Link to={"/"} className="logout">
                Logout
              </Link>
            </div>
          ) : (
            <div className="auth-links">
              <NavLink to={"/login"} className="btn">
                Signin
              </NavLink>
              <NavLink to={"/signup"} className="btn">
                Signup
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
