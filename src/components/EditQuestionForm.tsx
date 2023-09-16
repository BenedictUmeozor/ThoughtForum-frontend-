import { MouseEvent, useState, FormEvent } from "react";
import { XIcon } from "../assets/icons";
import { QuestionInterface } from "../helpers/interfaces";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { CircularProgress } from "@mui/material";
import { axiosAuth } from "../axios/axios";
import { AxiosError } from "axios";
import { setSuccess } from "../features/SnackbarSlice";
import { useSocket } from "../contexts/socket";
import { motion } from "framer-motion";
import { modalVariants } from "../variants";

type PropTypes = {
  onClose: (event: MouseEvent) => void;
  closeModal: Function;
  question: QuestionInterface;
  onFetch: Function;
};

const EditQuestionForm = ({
  onClose,
  closeModal,
  question,
  onFetch,
}: PropTypes) => {
  const categories = useAppSelector((state) => state.categories);
  const [title, setTitle] = useState(question.title);
  const [body, setBody] = useState(question.body);
  const [category, setCategory] = useState(question.category._id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload = {
      title,
      category,
      body,
    };

    axiosAuth
      .put("/questions/" + question._id, payload)
      .then(() => {
        closeModal();
        onFetch();
        dispatch(
          setSuccess({
            show: true,
            message: `Question updated successfully`,
          })
        );
        socket?.emit("questionCreated");
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
      <motion.div
        className="modal-content question-modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="close">
          <div onClick={onClose}>
            <XIcon className="icon" />
          </div>
        </div>
        <p className="main-title">Edit Question</p>
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="field">
            <label>Title</label>
            <input
              defaultValue={question.title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter title..."
            />
          </div>
          <div className="field">
            <label>Category</label>
            <select
              defaultValue={question.category._id}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Body</label>
            <textarea
              rows={8}
              defaultValue={question.body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <button disabled={loading} type="submit">
            {loading ? <CircularProgress size={"1rem"} /> : "Update question"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditQuestionForm;
