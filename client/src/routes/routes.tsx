import { ReactNode } from "react";
import { Route } from "react-router-dom";

import {
  LazyAuthPage,
  LazyConfirmPage,
  LazyLogin,
  LazyProfileSetup,
  LazyRegister,
  ProtectedRoute,
} from "../components/auth";
import { LazyHome } from "../pages/home";
import MatchingCard from "../components/matching/MatchingCard";
import Requests from "../components/matching/Requests";
import StudentProfile from "../components/matching/StudentProfile";

interface RouteConfig {
  path: string;
  element: ReactNode;
  protected?: boolean;
}

export const routes: RouteConfig[] = [
  { path: "/login", element: <LazyLogin /> },
  { path: "/matching", element: <MatchingCard />, protected: true },
  { path: "/register", element: <LazyRegister /> },
  { path: "/auth", element: <LazyAuthPage /> },
  { path: "/confirm/:token", element: <LazyConfirmPage /> },
  { path: "/requests", element: <Requests />, protected: true },
  { path: "/profile", element: <StudentProfile />, protected: true },

  { path: "/profile-setup", element: <LazyProfileSetup />, protected: true },
  { path: "/", element: <LazyHome /> },
  { path: "/confirm/:token", element: <LazyConfirmPage /> },
];

export const generateRoutes = (routes: RouteConfig[]) => {
  return routes.map((route, index) =>
    route.protected ? (
      <Route
        key={index}
        path={route.path}
        element={<ProtectedRoute>{route.element}</ProtectedRoute>}
      />
    ) : (
      <Route key={index} path={route.path} element={route.element} />
    )
  );
};
