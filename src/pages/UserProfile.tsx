import { Link } from "react-router-dom";
import male from "../assets/images/man.png";
import { PencilIcon } from "../assets/icons";
import UserQuestion from "../components/UserQuestion";
//import female from '../assets/images/woman.png'

const UserProfile = () => {
  return (
    <section className="profile">
      <div className="container">
        <h2>Profile</h2>

        <div className="user">
          <div className="flex">
            <div className="user-avatar">
              <img src={male} alt="user" />
            </div>
            <button className="follow-btn">follow</button>
          </div>
          <div className="follow">
            <div>
              <p>
                13 <span>following</span>
              </p>
            </div>
            <div>
              <p>
                130 <span>followers</span>
              </p>
            </div>
          </div>
          <span className="joined">Joined August 24, 2023</span>
        </div>

        <div className="user-details">
          <h3>Personal Information</h3>
          <div className="detail">
            <span className="key">Name:</span>
            <span className="value">Benedict Umeozor</span>
          </div>
          <div className="detail">
            <span className="key">Bio:</span>
            <span className="value">Hey, I'm using ThoughtForum!</span>
          </div>
          <div className="detail">
            <span className="key">Email:</span>
            <span className="value">benedictumeozor@gmail.com</span>
          </div>
          <div className="detail">
            <span className="key">Gender:</span>
            <span className="value">Male</span>
          </div>
        </div>

        <div className="user-questions">
          <h3>Questions</h3>
          <div className="list">
            <UserQuestion />
            <UserQuestion />
            <UserQuestion />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
