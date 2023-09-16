import { MouseEvent, useEffect, useState } from "react";
import { XIcon } from "../assets/icons";
import { FollowUser as userInterface } from "../helpers/interfaces";
import { CircularProgress } from "@mui/material";
import LikeUser from "./LikeUser";
import { axiosInstance } from "../axios/axios";
import { motion } from "framer-motion";
import { modalVariants } from "../variants";

type PropTypes = {
  title: string;
  id: string | number;
  onClose: (event: MouseEvent) => void;
  closeModal: Function;
};

const LikesModal = ({ onClose, id, closeModal, title }: PropTypes) => {
  const [users, setUsers] = useState<userInterface[] | null>(null);
  const getUsers = async () => {
    try {
      const { data } = await axiosInstance.get(`/${title}/likes/${id}`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [id]);

  return (
    <div className="modal">
      <motion.div
        className="modal-content users"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="close">
          <div onClick={onClose}>
            <XIcon className="icon" />
          </div>
        </div>
        <p className="title">Likes</p>
        {users ? (
          users.length > 0 ? (
            <div className="follows">
              {id &&
                users.map((user) => (
                  <LikeUser
                    key={user._id}
                    user={user}
                    onFetch={getUsers}
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
      </motion.div>
    </div>
  );
};

export default LikesModal;
