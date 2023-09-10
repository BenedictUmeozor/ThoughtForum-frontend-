import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { deleteCredentials } from "../features/AuthSlice";
import ProtectedLayout from "../layouts/ProtectedLayout";
import { axiosAuth } from "../axios/axios";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { setError, setSuccess } from "../features/SnackbarSlice";
import { useSocket } from "../contexts/socket";

const Logout = () => {
  const dispatch = useAppDispatch();
  const { refreshToken } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();

  const handleClick = () => {
    setLoading(true);
    axiosAuth
      .post("/auth/logout", { token: refreshToken })
      .then(() => {
        socket?.emit("logout");
        dispatch(deleteCredentials());
        dispatch(
          setSuccess({ show: true, message: "Logged out successfully" })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          setError({
            show: true,
            message: "There was a server error, try again later",
          })
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="logout">
      <ProtectedLayout>
        <div className="container">
          <div className="logout-div">
            <p>
              You are attempting to log out of{" "}
              <strong>
                Thought<span>Forum</span>
              </strong>
              , are you sure you want to logout?
            </p>
            <div className="buttons">
              <Link to="/" className="btn">
                Cancel
              </Link>
              <button disabled={loading} className="btn" onClick={handleClick}>
                {loading ? <CircularProgress size={"1rem"} /> : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    </section>
  );
};

export default Logout;
