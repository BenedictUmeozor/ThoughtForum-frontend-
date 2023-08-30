import { MouseEvent } from "react";
import { XIcon } from "../assets/icons";

type PropTypes = {
    onClose?: (event: MouseEvent) => void;
  };

const AddAnswerForm = ({ onClose }: PropTypes) => {
  return (
    <div className="modal">
    <div className="modal-content profile">
      <div className="close">
        <div onClick={onClose}>
          <XIcon className="icon" />
        </div>
      </div>
      <p className="main-title">Add Answer</p>
      <form className="form">
        <div className="field">
          <label>Body:</label>
          <textarea rows={8}></textarea>
        </div>
        <button type="submit">Add answer</button>
      </form>
    </div>
  </div>
);
  
}

export default AddAnswerForm