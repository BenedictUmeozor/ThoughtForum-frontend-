import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section className="form-auth">
      <div className="container">
        <div className="error">
          <p>Please fill in all fields</p>
        </div>
        <form className="auth">
          <h2>Create an account</h2>
          <div className="form-field">
            <label>
              Name: <span className="required">*</span>
            </label>
            <input type="text" placeholder="John Doe" required />
          </div>
          <div className="form-field">
            <label>
              Email: <span className="required">*</span>
            </label>
            <input type="email" placeholder="John Doe" required />
          </div>
          <div className="form-field">
            <label>
              Gender: <span className="required">*</span>
            </label>
            <select required>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="form-field">
            <label>
              Password: <span className="required">*</span>
            </label>
            <input type="password" placeholder="John Doe" required />
          </div>
          <div className="form-btn">
            <button type="submit">Signup</button>
          </div>
          <p className="form-error">check errors and try again</p>
          <p className="redirect">
            Already have an account? <Link to={"/login"}>Signin</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
