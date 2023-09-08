import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { axiosInstance } from "../axios/axios";
import { CircularProgress } from "@mui/material";
import UnProtectedLayout from "../layouts/UnProtectedLayout";
import { setCredentials } from "../features/AuthSlice";
import { useAppDispatch } from "../hooks/hooks";
import { setSuccess } from "../features/SnackbarSlice";
// import { useDispatch } from "react-redux";

interface FormData {
  name: string;
  email: string;
  gender: string;
  password: string;
}

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload: FormData = {
      name,
      email,
      gender,
      password,
    };

    try {
      const { data } = await axiosInstance.post("/auth", payload);
      dispatch(setCredentials(data));
      dispatch(setSuccess({ show: true, message: "Logged in successfully" }));
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
    <section className="form-auth">
      <UnProtectedLayout>
        <div className="container">
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          <form className="auth" onSubmit={handleSubmit}>
            <h2>Create an account</h2>
            <div className="form-field">
              <label>
                Name: <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label>
                Email: <span className="required">*</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label>
                Gender: <span className="required">*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
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
                required
              />
            </div>
            <div className="form-btn">
              <button disabled={loading} type="submit">
                {loading ? <CircularProgress size={"1rem"} /> : "Signup"}
              </button>
            </div>
            {error && <p className="form-error">check errors and try again</p>}
            <p className="redirect">
              Already have an account? <Link to={"/login"}>Signin</Link>
            </p>
          </form>
        </div>
      </UnProtectedLayout>
    </section>
  );
};

export default Signup;
