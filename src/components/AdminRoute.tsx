import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { Loader } from "./Loader";

interface IProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: IProps) => {
  const { user, status } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  } else {
    if (user.role !== "admin") {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
