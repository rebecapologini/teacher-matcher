import { Suspense } from "react";
import { Routes } from "react-router-dom";

import { generateRoutes, routes } from "./routes/routes";
import { ProfileProvider } from "./components/context/profileContext";

const App = () => {
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
