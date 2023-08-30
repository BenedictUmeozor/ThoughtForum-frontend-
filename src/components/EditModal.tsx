import { MouseEvent } from "react";
import { XIcon } from "../assets/icons";

type PropTypes = {
  onClose?: (event: MouseEvent) => void;
};

const EditModal = ({ onClose }: PropTypes) => {
  return (
    <div className="modal">
      <div className="modal-content profile">
        <div className="close" onClick={onClose}>
          <XIcon className="icon" />
        </div>
        <p className="main-title">Edit Profile</p>
        <form className="form">
          <div className="field">
            <label>Name</label>
            <input type="text" />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" disabled />
          </div>
          <div className="field">
            <label>Gender</label>
            <select>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="field">
            <label>Bio:</label>
            <textarea rows={8}></textarea>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
