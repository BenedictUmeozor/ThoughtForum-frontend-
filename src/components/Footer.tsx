import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  PhoneIcon,
  TwitterIcon,
} from "../assets/icons";
import { useAppSelector } from "../hooks/hooks";

const Footer = () => {
  const categories = useAppSelector((state) => state.categories);

  return (
    <footer>
      <div className="container main-footer">
        <div className="title">
          <Link to="/">
            Thought<span>Forum</span>
          </Link>
          <p>Unlocking Answers, Igniting Questions</p>
        </div>
        <div className="footer-categories">
          <h2>Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category._id}>
                <Link to={"categories/" + category._id}>{category.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="contact">
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
          <p>
            <PhoneIcon className="icon" />
            <span>08108218964</span>
          </p>
          <p>
            <EnvelopeIcon className="icon" />
            <a href="mailto:benedictumeozor@gmail.com">Send an email</a>
          </p>
        </div>
      </div>
      <div className="copyright container">
        <p>All rights reserved | Benedict &copy; 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
