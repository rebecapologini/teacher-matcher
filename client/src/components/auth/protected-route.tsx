import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useFetchUserQuery } from "../../features/auth/auth-api-slice.ts";
import { setLoading } from "../../features/auth/auth-slice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const { isLoading } = useFetchUserQuery();
  const { data } = useFetchUserQuery();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("user", user);
    return <Navigate to="/" />;
  }
  // else if (data?.profile_id) {
  //   return <Navigate to="/matching" />;
  // } else {
  //   return <Navigate to="/profile-setup" />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
