import { useState } from "react";
import male from "../assets/images/man.png";
import UserQuestion from "../components/UserQuestion";
import UsersModal from "../components/UsersModal";
//import female from '../assets/images/woman.png'

const UserProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [modalTitle, setModalTitle] = useState("Followers");
  const [showModal, setShowModal] = useState(false);

  const showFollowers = () => {
    setModalTitle("Followers");
    setShowModal(true);
  };

  const showFollowing = () => {
    setModalTitle("Following");
    setShowModal(true);
  };

  return (
    <section className="profile">
      {showModal && (
        <UsersModal title={modalTitle} onClose={() => setShowModal(false)} />
      )}
      <div className="container">
        <h2>Profile</h2>

        <div className="user">
          <div className="flex">
            <div className="user-avatar">
              <img src={male} alt="user" />
            </div>
            {isFollowing ? (
              <button
                className="following"
                onClick={() => setIsFollowing(false)}
              >
                following
              </button>
            ) : (
              <button className="follow" onClick={() => setIsFollowing(true)}>
                follow
              </button>
            )}
          </div>
          <div className="follow">
            <div>
              <p onClick={showFollowing}>
                13 <span>following</span>
              </p>
            </div>
            <div>
              <p onClick={showFollowers}>
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
