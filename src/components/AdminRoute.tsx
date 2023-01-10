import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

interface IProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: IProps) => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  } else {
    if (user.role !== "admin") {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
