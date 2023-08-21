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
const Signup = lazy(() => import("./pages/Signup.tsx"));
const Signin = lazy(() => import("./pages/Signin.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const RootLayout = lazy(() => import("./layouts/RootLayout.tsx"));
const UserProfile = lazy(() => import("./pages/UserProfile.tsx"));
const Construction = lazy(() => import("./pages/Construction.tsx"));
const QuestionPage = lazy(() => import("./pages/QuestionPage.tsx"));

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
      <Route path="*" element={<Construction />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
