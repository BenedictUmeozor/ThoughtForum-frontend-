import errorImg from "../assets/images/error.svg";

const ErrorPage = () => {
  return (
    <section className="error">
      <div className="container">
        <div className="image">
          <img src={errorImg} alt="Error" />
        </div>
        <div className="content">
          <h2>Server Error</h2>
          <p>
            Sorry, there was an issue on our server. We apologize for the
            inconvenience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
