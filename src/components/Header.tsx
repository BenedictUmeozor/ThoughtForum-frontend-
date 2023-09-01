import { MenuIcon, XIcon } from "../assets/icons";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../hooks/hooks";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const { refreshToken } = useAppSelector((state) => state.auth);

  return (
    <header>
      <div className={`overlay ${showNav ? "active" : ""}`}></div>
      <div className="container">
        <Link to={"/"} className="logo">
          <h1>
            Thought<span>Forum</span>
          </h1>
        </Link>
        <div className="right-col">
          <nav className="desktop-nav">
            <NavLink to={"/"}>Questions</NavLink>
            <NavLink to={"/categories"}>Categories</NavLink>
            {refreshToken ? (
              <>
                <NavLink to={"/profile"}>Profile</NavLink>
                <NavLink to={"/logout"}>Logout</NavLink>
              </>
            ) : (
              <>
                <NavLink to={"/login"}>Signin</NavLink>
                <NavLink to={"/signup"}>Signup</NavLink>
              </>
            )}
          </nav>
          <nav className={`mobile-nav ${showNav ? "active" : ""}`}>
            <div className="close-icon" onClick={() => setShowNav(false)}>
              <XIcon className="icon" />
            </div>
            <NavLink to={"/"} onClick={() => setShowNav(false)}>
              Questions
            </NavLink>
            <NavLink to={"/categories"} onClick={() => setShowNav(false)}>
              Categories
            </NavLink>
            {refreshToken ? (
              <>
                <NavLink to={"/profile"} onClick={() => setShowNav(false)}>
                  Profile
                </NavLink>
                <NavLink to={"/logout"} onClick={() => setShowNav(false)}>
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to={"/login"} onClick={() => setShowNav(false)}>
                  Signin
                </NavLink>
                <NavLink to={"/signup"} onClick={() => setShowNav(false)}>
                  Signup
                </NavLink>
              </>
            )}
          </nav>
          <div onClick={() => setShowNav(true)}>
            <MenuIcon className="icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
