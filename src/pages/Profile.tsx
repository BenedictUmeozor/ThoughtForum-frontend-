import male from "../assets/images/man.png";
import { PencilIcon } from "../assets/icons";
import UserQuestion from "../components/UserQuestion";
import { useEffect, useState } from "react";
import UsersModal from "../components/UsersModal";
import EditModal from "../components/EditModal";
import ProtectedLayout from "../layouts/ProtectedLayout";
import female from "../assets/images/woman.png";
import { QuestionInterface, UserProfileInterface } from "../helpers/interfaces";
import { axiosAuth, axiosInstance } from "../axios/axios";
import { useAppSelector } from "../hooks/hooks";
import { CircularProgress } from "@mui/material";
import { lightFormat } from "date-fns";

const Profile = () => {
  const [modalTitle, setModalTitle] = useState("Followers");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [questions, setQuestions] = useState<QuestionInterface[] | null>(null);
  const [user, setUser] = useState<UserProfileInterface | null>(null);
  const { _id } = useAppSelector((state) => state.auth);

  const showFollowers = () => {
    setModalTitle("Followers");
    setShowModal(true);
  };

  const showFollowing = () => {
    setModalTitle("Following");
    setShowModal(true);
  };

  const getUser = async () => {
    try {
      const { data } = await axiosAuth.get("/users");
      setUser(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserQuestions = async () => {
    if (user?.questions) {
      console.log("getUserQuestions ran");
      const questionPromises = user.questions.map(async (question) => {
        const response = await axiosInstance.get("/questions/" + question);
        return response.data;
      });

      const questions = await Promise.all(questionPromises);
      setQuestions(questions);

      return questions;
    }

    setQuestions([]);
    return [];
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUserQuestions();
  }, [user]);

  return (
    <section className="profile">
      <ProtectedLayout>
        {showModal && (
          <UsersModal
            id={_id!}
            title={modalTitle}
            onClose={() => setShowModal(false)}
            closeModal={() => setShowModal(false)}
          />
        )}
        {showEditModal && (
          <EditModal
            onClose={() => setShowEditModal(false)}
            closeModal={() => setShowEditModal(false)}
            onFetch={getUser}
            user={user!}
          />
        )}

        <div className="container">
          <h2>My Profile</h2>
          <div className="user">
            {user ? (
              <>
                <div className="flex">
                  <div className="user-avatar">
                    <img
                      src={user.gender === "male" ? male : female}
                      alt="user"
                    />
                  </div>
                  <button
                    className="edit-btn"
                    onClick={() => setShowEditModal(true)}
                  >
                    Edit <PencilIcon className="icon" />
                  </button>
                </div>
                <div className="follow">
                  <div>
                    <p onClick={showFollowing}>
                      {user.following.length} <span>following</span>
                    </p>
                  </div>
                  <div>
                    <p onClick={showFollowers}>
                      {user.followers.length} <span>followers</span>
                    </p>
                  </div>
                </div>
                <span className="joined">
                  Joined{" "}
                  {lightFormat(new Date(user.createdAt), "yyyy-MMM-dd h:m a")}
                </span>
              </>
            ) : (
              <div className="load-data profile-load">
                <CircularProgress size={"1rem"} />
              </div>
            )}
          </div>

          <div className="user-details">
            {user ? (
              <>
                <h3>Personal Information</h3>
                <div className="detail">
                  <span className="key">Name:</span>
                  <span className="value">{user.name}</span>
                </div>
                <div className="detail">
                  <span className="key">Bio:</span>
                  <span className="value">{user.bio}</span>
                </div>
                <div className="detail">
                  <span className="key">Email:</span>
                  <span className="value">{user.email}</span>
                </div>
                <div className="detail">
                  <span className="key">Gender:</span>
                  <span className="value">{user.gender}</span>
                </div>
              </>
            ) : (
              <div className="load-data">
                <CircularProgress size={"1rem"} />
              </div>
            )}
          </div>

          <div className="user-questions">
            <h3>Questions</h3>
            {questions ? (
              questions.length > 0 ? (
                <div className="list">
                  {questions.map((question) => (
                    <UserQuestion
                      key={question._id}
                      question={question}
                      onFetch={() => getUserQuestions()}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <p>No questions to show</p>
                </div>
              )
            ) : (
              <div className="load-data">
                <CircularProgress size={"1rem"} />
              </div>
            )}
          </div>
        </div>
      </ProtectedLayout>
    </section>
  );
};

export default Profile;
