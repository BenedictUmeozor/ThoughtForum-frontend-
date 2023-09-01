import { ReactNode } from "react";
import { useAppSelector } from "../hooks/hooks";
import { Navigate } from "react-router-dom";

type UnProtectedLayoutProps = {
  children: ReactNode;
};

const UnProtectedLayout = ({ children }: UnProtectedLayoutProps) => {
  const { refreshToken } = useAppSelector((state) => state.auth);

  if (refreshToken) {
    return <Navigate to={"/"} />;
  }

  return <div>{children}</div>;
};

export default UnProtectedLayout;
