import { FormEvent, MouseEvent, useState, useEffect } from "react";
import { XIcon } from "../assets/icons";
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
  onFetch: Function;
};

interface Category {
  _id: string;
  title: string;
  question: string[];
}

type FormData = {
  title: string;
  category: string;
  body: string;
};

const AddQuestionForm = ({ onClose, closeModal, onFetch }: PropTypes) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const categories: Category[] =
    useAppSelector((state) => state.categories) || [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload: FormData = {
      title,
      category,
      body,
    };

    axiosAuth
      .post("/questions", payload)
      .then(() => {
        closeModal();
        onFetch();
        dispatch(
          setSuccess({
            show: true,
            message: `Question created successfully`,
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

  useEffect(() => {
    if (categories) {
      for (const category of categories) {
        if (category.title === "technology") {
          setCategory(category._id);
        }
      }
    }
  }, [categories]);

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
        <p className="main-title">Add Question</p>
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Category</label>
            <select
              value={category}
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
              placeholder="Question body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <button disabled={loading} type="submit">
            {loading ? <CircularProgress size={"1rem"} /> : "Create question"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddQuestionForm;
