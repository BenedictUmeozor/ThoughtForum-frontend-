import { FormEvent, MouseEvent, useState } from "react";
import { XIcon } from "../assets/icons";
import { UserProfileInterface } from "../helpers/interfaces";
import { CircularProgress } from "@mui/material";
import { axiosAuth } from "../axios/axios";
import { AxiosError } from "axios";

type PropTypes = {
  onClose?: (event: MouseEvent) => void;
  closeModal: Function;
  onFetch: Function;
  user: UserProfileInterface;
};

const EditModal = ({ onClose, closeModal, onFetch, user }: PropTypes) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [bio, setBio] = useState(user.bio);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await axiosAuth.put("/users", {
        name,
        gender,
        bio,
      });
      closeModal();
      onFetch();
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as { error?: string };
        if (errorData.error) {
          setError(errorData.error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content profile">
        <div className="close">
          <div onClick={onClose}>
            <XIcon className="icon" />
          </div>
        </div>
        <p className="main-title">Edit Profile</p>
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              defaultValue={user.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" defaultValue={user.email} disabled />
          </div>
          <div className="field">
            <label>Gender</label>
            <select
              defaultValue={user.gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="field">
            <label>Bio:</label>
            <textarea
              rows={8}
              defaultValue={user.bio}
              onChange={(e) => setBio(e.target.value)}
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

export default EditModal;
