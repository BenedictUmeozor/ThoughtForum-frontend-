import { FormEvent, MouseEvent, useState } from "react";
import { XIcon } from "../assets/icons";
import { CircularProgress } from "@mui/material";
import { AxiosError } from "axios";
import { axiosAuth } from "../axios/axios";

type PropTypes = {
  onClose: (event: MouseEvent) => void;
  question_id: string;
  onFetch: Function;
  closeModal: Function;
};

interface FormData {
  text: string;
  question: string;
}

const AddAnswerForm = ({
  onClose,
  question_id,
  onFetch,
  closeModal,
}: PropTypes) => {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload: FormData = {
      text: body,
      question: question_id,
    };

    console.log(payload);

    axiosAuth
      .post("/answers", payload)
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
        <p className="main-title">Add Answer</p>
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="field">
            <label>Body:</label>
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Answer this question"
            ></textarea>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? <CircularProgress size={"1rem"} /> : "Add Answer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAnswerForm;
