import { Link } from "react-router-dom";
import UnProtectedLayout from "../layouts/UnProtectedLayout";
import { useState, FormEvent } from "react";
import { CircularProgress } from "@mui/material";
import { axiosInstance } from "../axios/axios";
import { useAppDispatch } from "../hooks/hooks";
import { setCredentials } from "../features/AuthSlice";
import { AxiosError } from "axios";

interface FormData {
  email: string;
  password: string;
}

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload: FormData = {
      email,
      password,
    };

    try {
      const { data } = await axiosInstance.post("/auth/login", payload);
      dispatch(setCredentials(data));
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as { error?: string };
        if (errorData.error) {
          setError(errorData.error);
        }
      }
      setLoading(false);
    }
  };

  return (
    <section className="form-auth">
      <UnProtectedLayout>
        <div className="container">
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          <form className="auth" onSubmit={handleSubmit}>
            <h2>Login to your account</h2>
            <div className="form-field">
              <label>
                Email: <span className="required">*</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>
                Password: <span className="required">*</span>
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-btn">
              <button disabled={loading} type="submit">
                {loading ? <CircularProgress size={"1rem"} /> : "Signin"}
              </button>
            </div>
            {error && <p className="form-error">check errors and try again</p>}
            <p className="redirect">
              Don't have an account? <Link to={"/signup"}>Signin</Link>
            </p>
          </form>
        </div>
      </UnProtectedLayout>
    </section>
  );
};

export default Signin;
