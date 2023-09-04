import { MouseEvent, useEffect, useState } from "react";
import { XIcon } from "../assets/icons";
import FollowUser from "./FollowUser";
import { FollowUser as userInterface } from "../helpers/interfaces";
import { axiosInstance } from "../axios/axios";
import { CircularProgress } from "@mui/material";

type PropTypes = {
  title?: string;
  id: string | number;
  onClose: (event: MouseEvent) => void;
  closeModal: Function;
};

const UsersModal = ({ title, onClose, id, closeModal }: PropTypes) => {
  const [users, setUsers] = useState<userInterface[] | null>(null);
  const getUsers = async () => {
    const endpoint = title?.toLowerCase();
    try {
      const { data } = await axiosInstance.get("/users/" + endpoint + "/" + id);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [title, id]);

  return (
    <div className="modal">
      <div className="modal-content users">
        <div className="close">
          <div onClick={onClose}>
            <XIcon className="icon" />
          </div>
        </div>
        <p className="title">{title}</p>
        {users ? (
          users.length > 0 ? (
            <div className="follows">
              {title &&
                users.map((user) => (
                  <FollowUser
                    key={user._id}
                    user={user}
                    onFetch={getUsers}
                    title={title.toLowerCase()}
                    onClose={closeModal}
                  />
                ))}
            </div>
          ) : (
            <div className="no-data">
              <p>No data</p>
            </div>
          )
        ) : (
          <div className="load-data">
            <CircularProgress size={"1rem"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersModal;
