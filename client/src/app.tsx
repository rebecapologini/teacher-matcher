import { Suspense, useEffect } from "react";
import { Routes, useNavigate } from "react-router-dom";

import { generateRoutes, routes } from "./routes/routes";
import { ProfileProvider } from "./components/context/profileContext";
import { useFetchUserQuery } from "./features/auth/auth-api-slice";

const App = () => {
  const navigate = useNavigate();
  const { data, isSuccess } = useFetchUserQuery();
  console.log("data", data);
  useEffect(() => {
    if (isSuccess && data?.profile_id) {
      console.log("data?.profile_id", data?.profile_id);
      navigate("/matching");
    } else if (isSuccess && data?.id) {
      navigate("/profile-setup");
    } else {
      navigate("/");
    }
  }, [isSuccess]);
  return (
    <ProfileProvider>
      <div>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>{generateRoutes(routes)}</Routes>
          </Suspense>
        </main>
      </div>
    </ProfileProvider>
  );
};

export default App;
