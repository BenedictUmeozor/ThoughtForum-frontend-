import { useEffect, useState } from "react";
import { UsersIcon } from "../assets/icons";
import User from "./User";
import { axiosInstance } from "../axios/axios";
import { CircularProgress } from "@mui/material";

interface UserInterface {
  _id: string;
  name: string;
  followers: string[];
  questions: string[];
}

const TopMembers = () => {
  const [users, setUsers] = useState<UserInterface[] | null>(null);

  const getTopMembers = async () => {
    try {
      const { data } = await axiosInstance.get("/users/top-members");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopMembers();
  }, []);

  return (
    <div className="top-members">
      <h2>
        <UsersIcon className="icon" />
        Top Members
      </h2>
      {users ? (
        users.length > 0 ? (
          <div className="user-list">
            {users.map((user) => (
              <User key={user._id} user={user} onFetch={getTopMembers} />
            ))}
          </div>
        ) : (
          <div className="no-data">
            <p>No user to show</p>
          </div>
        )
      ) : (
        <div className="load-data">
          <CircularProgress size={"1rem"} />
        </div>
      )}
    </div>
  );
};

export default TopMembers;
