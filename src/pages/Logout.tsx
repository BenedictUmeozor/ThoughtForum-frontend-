import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { deleteCredentials } from "../features/AuthSlice";
import ProtectedLayout from "../layouts/ProtectedLayout";

const Logout = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(deleteCredentials());
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
              <button className="btn" onClick={handleClick}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    </section>
  );
};

export default Logout;
