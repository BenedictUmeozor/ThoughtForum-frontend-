import { Suspense, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { axiosAuth, axiosInstance } from "../axios/axios";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setCategories } from "../features/CategoriesSlice";
import jwt_decode from "jwt-decode";
import { deleteCredentials, setCredentials } from "../features/AuthSlice";
import {
  SnackbarError,
  SnackbarInfo,
  SnackbarSuccess,
  SnackbarWarning,
} from "../components/Snackbar";
import {
  setError,
  setInfo,
  setSuccess,
  setWarning,
} from "../features/SnackbarSlice";
import { useSocket } from "../contexts/socket";
import { setUser } from "../features/UserSlice";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    success,
    successMessage,
    error,
    errorMessage,
    info,
    infoMessage,
    warning,
    warningMessage,
  } = useAppSelector((state) => state.snackbar);
  const { _id } = useAppSelector((state) => state.auth);

  const socket = useSocket();

  const refresh = async (refreshToken: string) => {
    try {
      const { data } = await axiosInstance.post("/auth/refresh", {
        token: refreshToken,
      });
      dispatch(setCredentials(data));
    } catch (error) {
      console.log(error);
      dispatch(setError({ show: true, message: "Server error" }));
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/categories");
      dispatch(setCategories(data));
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as { error?: string };
        if (errorData.error) {
          console.log(errorData.error);
        }
      }
      dispatch(setError({ show: true, message: "Server error" }));
    }
  };

  axiosAuth.interceptors.request.use(
    async (config) => {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken")!);

      const expirationTime = jwt_decode<{
        _id: string;
        iat: number;
        exp: number;
      }>(accessToken).exp;

      if (expirationTime * 1000 < Date.now()) {
        await refresh(refreshToken);

        config.headers.Authorization = JSON.parse(
          localStorage.getItem("accessToken")!
        );
      } else {
        config.headers.Authorization = "Bearer " + accessToken;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosAuth.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        dispatch(deleteCredentials());
        navigate("/login");
        dispatch(
          setWarning({ show: true, message: "Login to perform this action" })
        );
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        dispatch(deleteCredentials());
        navigate("/login");
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUser = async () => {
    try {
      const { data } = await axiosAuth.get("/users");
      dispatch(setUser(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (socket && _id) {
      socket.emit("login", _id);
    }
  }, [socket, _id]);

  useEffect(() => {
    socket?.on("like", (user) => {
      dispatch(setInfo({ show: true, message: `${user} liked your question` }));
    });

    socket?.on("answer", (user) => {
      dispatch(
        setInfo({ show: true, message: `${user} answered your question` })
      );
    });

    socket?.on("answer", (user) => {
      dispatch(
        setInfo({ show: true, message: `${user} started following you` })
      );
    });
  }, [socket]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (_id) {
      getUser();
    }
  }, [_id]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(setSuccess({ show: false, message: "" }));
      }, 5500);
    }

    if (error) {
      setTimeout(() => {
        dispatch(setError({ show: false, message: "" }));
      }, 5500);
    }

    if (info) {
      setTimeout(() => {
        dispatch(setInfo({ show: false, message: "" }));
      }, 5500);
    }

    if (warning) {
      setTimeout(() => {
        dispatch(setWarning({ show: false, message: "" }));
      }, 5500);
    }
  }, [success, info, warning, error]);

  return (
    <main className="main">
      <div>
        <Header />
      </div>
      <section>
        <div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
          <div className="container">
            {success && <SnackbarSuccess message={successMessage} />}
            {error && <SnackbarError message={errorMessage} />}
            {info && <SnackbarInfo message={infoMessage} />}
            {warning && <SnackbarWarning message={warningMessage} />}
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default RootLayout;
