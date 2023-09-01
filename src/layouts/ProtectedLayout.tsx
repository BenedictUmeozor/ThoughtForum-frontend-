import { ReactNode } from "react";
import { useAppSelector } from "../hooks/hooks";
import { Navigate } from "react-router-dom";

type UnProtectedLayoutProps = {
  children: ReactNode;
};

const ProtectedLayout = ({ children }: UnProtectedLayoutProps) => {
  const { refreshToken } = useAppSelector((state) => state.auth);

  if (!refreshToken) {
    return <Navigate to={"/login"} />;
  }

  return <div>{children}</div>;
};

export default ProtectedLayout;
