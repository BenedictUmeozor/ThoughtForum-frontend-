import { Suspense, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
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

const RootLayout = () => {
  const dispatch = useAppDispatch();
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

  const refresh = async (refreshToken: string) => {
    try {
      const { data } = await axiosInstance.post("/auth/refresh", {
        token: refreshToken,
      });
      dispatch(setCredentials(data));
    } catch (error) {
      console.log(error);
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
        dispatch(
          setWarning({ show: true, message: "Loin to perform this action" })
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
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(setSuccess({ show: false, message: "" }));
      }, 3500);
    }

    if (error) {
      setTimeout(() => {
        dispatch(setError({ show: false, message: "" }));
      }, 3500);
    }

    if (info) {
      setTimeout(() => {
        dispatch(setInfo({ show: false, message: "" }));
      }, 3500);
    }

    if (warning) {
      setTimeout(() => {
        dispatch(setWarning({ show: false, message: "" }));
      }, 3500);
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
