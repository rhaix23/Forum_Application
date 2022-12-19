import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { Loader } from "./Loader";

interface IProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: IProps) => {
  const { user, status } = useSelector((state: RootState) => state.user);

  if (status === "pending") {
    return <Loader variant="dots" />;
  }

  if (user && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
