import { FormEvent, MouseEvent, useState } from "react";
import { XIcon } from "../assets/icons";
import { CircularProgress } from "@mui/material";
import { AxiosError } from "axios";
import { axiosAuth } from "../axios/axios";
import { setSuccess } from "../features/SnackbarSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useSocket } from "../contexts/socket";

type PropTypes = {
  onClose: (event: MouseEvent) => void;
  question_id: string;
  onFetch: Function;
  closeModal: Function;
  user_id: string;
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
  user_id,
}: PropTypes) => {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { _id } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload: FormData = {
      text: body,
      question: question_id,
    };

    axiosAuth
      .post("/answers", payload)
      .then(() => {
        closeModal();
        onFetch();
        dispatch(
          setSuccess({
            show: true,
            message: `Answer created successfully`,
          })
        );
        socket?.emit("answerCreated");
        if (_id !== user_id) {
          socket?.emit("answer", { _id: user_id, name: user.name });
        }
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
