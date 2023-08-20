import { Link } from "react-router-dom";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "../assets/icons";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="flex">
          <Link to="/" className="logo">
            <h1>
              Thought<span>Forum</span>
            </h1>
          </Link>
          <div className="socials">
            <Link to="/">
              <FacebookIcon className="icon" />
            </Link>
            <Link to="/">
              <InstagramIcon className="icon" />
            </Link>
            <Link to="/">
              <TwitterIcon className="icon" />
            </Link>
            <Link to="/">
              <LinkedinIcon className="icon" />
            </Link>
          </div>
        </div>
        <p className="copyright">&copy; 2023 Benedict</p>
      </div>
    </footer>
  );
};

export default Footer;
