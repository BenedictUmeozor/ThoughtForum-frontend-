import male from "../assets/images/man.png";
//import { PencilIcon } from "../assets/icons";
//import UserQuestion from "../components/UserQuestion";
//import { useState } from "react";
// import UsersModal from "../components/UsersModal";
// import EditModal from "../components/EditModal";
// import EditQuestionForm from "../components/EditQuestionForm";
import ProtectedLayout from "../layouts/ProtectedLayout";
//import female from '../assets/images/woman.png'

const Profile = () => {
  // const [modalTitle, setModalTitle] = useState("Followers");
  // const [showModal, setShowModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  // const [showForm, setShowForm] = useState(false);

  // const showEditProfileModal = () => {
  //   setShowEditModal(true);
  // };

  // const showFollowers = () => {
  //   setModalTitle("Followers");
  //   setShowModal(true);
  // };

  // const showFollowing = () => {
  //   setModalTitle("Following");
  //   setShowModal(true);
  // };

  return (
    <section className="profile">
      <ProtectedLayout>
        {/* {showModal && (
          <UsersModal title={modalTitle} onClose={() => setShowModal(false)} />
        )}
        {showEditModal && <EditModal onClose={() => setShowEditModal(false)} />}
        {showForm && <EditQuestionForm onClose={() => setShowForm(false)} />} */}
        <div className="container">
          <h2>My Profile</h2>
          <div className="user">
            <div className="flex">
              <div className="user-avatar">
                <img src={male} alt="user" />
              </div>
              {/* <button className="edit-btn" onClick={showEditProfileModal}>
                Edit <PencilIcon className="icon" />
              </button> */}
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
              {/* <UserQuestion onClick={() => setShowForm(true)} />
              <UserQuestion onClick={() => setShowForm(true)} />
              <UserQuestion onClick={() => setShowForm(true)} /> */}
            </div>
          </div>
        </div>
      </ProtectedLayout>
    </section>
  );
};

export default Profile;
