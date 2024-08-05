import { Suspense } from "react";
import { Routes } from "react-router-dom";

import { generateRoutes, routes } from "./routes/routes";

const App = () => {
  return (
    <div>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>{generateRoutes(routes)}</Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
