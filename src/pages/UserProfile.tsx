import { useState, useEffect } from "react";
import male from "../assets/images/man.png";
import UserQuestion from "../components/UserQuestion";
import UsersModal from "../components/UsersModal";
import { useNavigate, useParams } from "react-router-dom";
import { UserProfileInterface } from "../helpers/interfaces";
import { axiosAuth, axiosInstance } from "../axios/axios";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../hooks/hooks";
import female from "../assets/images/woman.png";
import { lightFormat } from "date-fns";

const UserProfile = () => {
  const [modalTitle, setModalTitle] = useState("Followers");
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<UserProfileInterface | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
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
      const { data } = await axiosInstance.get("/users/" + id);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const followUser = () => {
    axiosAuth
      .post("/users/" + user?._id)
      .then(() => getUser())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    id && getUser();
  }, [id]);

  useEffect(() => {
    if (user && user._id === _id) {
      navigate("/profile");
    }
  }, [user]);

  return (
    <section className="profile">
      {showModal && (
        <UsersModal
          id={id!}
          title={modalTitle}
          onClose={() => setShowModal(false)}
          closeModal={() => setShowModal(false)}
        />
      )}
      <div className="container">
        <h2>Profile</h2>

        <div className="user">
          {user ? (
            <>
              <div className="flex">
                <div className="user-avatar">
                  <img src={user.gender === "male" ? male : female} alt="user" />
                </div>
                {_id && user.followers.includes(_id) ? (
                  <button className="following" onClick={followUser}>
                    following
                  </button>
                ) : (
                  <button className="follow" onClick={followUser}>
                    follow
                  </button>
                )}
              </div>
              <div className="follow">
                <div>
                  <p onClick={showFollowing}>
                    {user.following.length} <span>following</span>
                  </p>
                </div>
                <div>
                  <p onClick={showFollowers}>
                    {user.followers.length}{" "}
                    <span>
                      {user.followers.length === 1 ? "follower" : "followers"}
                    </span>
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
