import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./sass/main.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/index.tsx";
import Loader from "./components/Loader.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import ErrorPage from "./pages/ErrorPage.tsx";
import { SocketProvider } from "./contexts/socket.tsx";

const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Profile = lazy(() => import("./pages/Profile"));
const RootLayout = lazy(() => import("./layouts/RootLayout"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Construction = lazy(() => import("./pages/Construction"));
const QuestionPage = lazy(() => import("./pages/QuestionPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const Logout = lazy(() => import("./pages/Logout"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={<Loader />}>
          <RootLayout />
        </Suspense>
      }
    >
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Signin />} />
      <Route path="profile" element={<Profile />} />
      <Route path="profile/:id" element={<UserProfile />} />
      <Route path="question/:id" element={<QuestionPage />} />
      <Route path="categories/:id" element={<CategoriesPage />} />
      <Route path="logout" element={<Logout />} />
      <Route path="error" element={<ErrorPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="*" element={<Construction />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);
