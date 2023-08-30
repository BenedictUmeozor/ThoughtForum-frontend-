import { MouseEvent } from "react";
import { XIcon } from "../assets/icons";

type PropTypes = {
  onClose?: (event: MouseEvent) => void;
};

const EditQuestionForm = ({ onClose }: PropTypes) => {
  return (
    <div className="modal">
      <div className="modal-content question-modal">
        <div className="close">
          <div onClick={onClose}>
            <XIcon className="icon" />
          </div>
        </div>
        <p className="main-title">Edit Question</p>
        <form className="form">
          <div className="field">
            <label>Title</label>
            <input type="text" />
          </div>
          <div className="field">
            <label>Category</label>
            <input type="text" />
          </div>
          <div className="field">
            <label>Body</label>
            <textarea rows={8}></textarea>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditQuestionForm;
