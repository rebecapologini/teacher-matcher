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
import UserProfile from '../components/TeacherProfile/UserProfile'
import StudentProfile from '../components/StudentProfile/StudentProfile'
import EmailAccept from "../EmailAccept/EmailAccept";
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
  { path: "/profile-setup", element: <LazyProfileSetup />, protected: true },
  { path: "/", element: <LazyHome /> },
  { path: "/confirm/:token", element: <LazyConfirmPage /> },
  { path: "/userprofile", element: <UserProfile/> },
  { path: 'studentprofile', element: <StudentProfile/>},
  { path: '/emailaccept', element: <EmailAccept/>}
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
