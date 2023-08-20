import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <section className="form-auth">
      <div className="container">
        <div className="error">
          <p>Please fill in all fields</p>
        </div>
        <form className="auth">
          <h2>Login to your account</h2>
          <div className="form-field">
            <label>
              Email: <span className="required">*</span>
            </label>
            <input type="email" placeholder="John Doe" required />
          </div>
          <div className="form-field">
            <label>
              Password: <span className="required">*</span>
            </label>
            <input type="password" placeholder="John Doe" required />
          </div>
          <div className="form-btn">
            <button type="submit">Login</button>
          </div>
          <p className="form-error">check errors and try again</p>
          <p className="redirect">
            Don't have an account? <Link to={"/signup"}>Signin</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signin;
