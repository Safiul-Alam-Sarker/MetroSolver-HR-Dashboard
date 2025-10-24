import { useAppSelector, useAppDispatch } from "./hooks/redux";
import { getUserData } from "./slice/authSlice";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, token, user } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token && !user) {
        try {
          await dispatch(getUserData()).unwrap();
        } catch (error) {
          // Token is invalid, will redirect to landing
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [token, user, dispatch]);

  // Show nothing while checking (prevents flicker)
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!token || !isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
