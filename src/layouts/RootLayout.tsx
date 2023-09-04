import { Suspense, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { axiosAuth, axiosInstance } from "../axios/axios";
import { AxiosError } from "axios";
import { useAppDispatch } from "../hooks/hooks";
import { setCategories } from "../features/CategoriesSlice";
import jwt_decode from "jwt-decode";
import { setCredentials } from "../features/AuthSlice";

const RootLayout = () => {
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <main className="main">
      <div>
        <Header />
      </div>
      <section>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </section>
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default RootLayout;
