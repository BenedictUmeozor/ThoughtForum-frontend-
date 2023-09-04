import { MouseEvent } from "react";
import { XIcon } from "../assets/icons";
import { AnswerInterface } from "../helpers/interfaces";
import { useState, FormEvent } from "react";
import { axiosAuth } from "../axios/axios";
import { AxiosError } from "axios";
import { CircularProgress } from "@mui/material";

type PropTypes = {
  onClose: (event: MouseEvent) => void;
  answer: AnswerInterface;
  onFetch: Function;
  closeModal: Function
};



const EditAnswer = ({ onClose, answer, onFetch, closeModal }: PropTypes) => {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axiosAuth
      .put("/answers/" + answer._id, {text: body})
      .then(() => {
        closeModal();
        onFetch();
      })
      .catch((error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const errorData = axiosError.response.data as { error?: string };
          if (errorData.error) {
            setError(errorData.error);
          }
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="modal">
      <div className="modal-content profile">
        <div className="close">
          <div onClick={onClose}>
            <XIcon className="icon" />
          </div>
        </div>
        <p className="main-title">Edit Answer</p>
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="field">
            <label>Body:</label>
            <textarea
              rows={8}
              defaultValue={answer.text}
              placeholder="Edit this answer"
              onChange={e => setBody(e.target.value)}
            ></textarea>
          </div>
          <button disabled={loading} type="submit">
            {loading ? <CircularProgress size={"1rem"} /> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAnswer;
