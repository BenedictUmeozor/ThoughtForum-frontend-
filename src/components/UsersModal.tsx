import { MouseEvent } from "react";
import { XIcon } from "../assets/icons";
import FollowUser from "./FollowUser";

type PropTypes = {
  title?: string;
  onClose?: (event: MouseEvent) => void;
};

const UsersModal = ({ title, onClose }: PropTypes) => {
  return (
    <div className="modal">
      <div className="modal-content users">
        <div className="close">
          <div onClick={onClose}>
            <XIcon className="icon" />
          </div>
        </div>
        <p className="title">{title}</p>
        <div className="follows">
          <FollowUser />
          <FollowUser />
          <FollowUser />
          <FollowUser />
          <FollowUser />
          <FollowUser />
          <FollowUser />
          <FollowUser />
          <FollowUser />
          <FollowUser />
          <FollowUser />
          <FollowUser />
          <FollowUser />
        </div>
      </div>
    </div>
  );
};

export default UsersModal;
