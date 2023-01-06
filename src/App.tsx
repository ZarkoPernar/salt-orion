import React, { useState, useMemo } from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { SaltProvider } from "@salt-ds/core";
import "@salt-ds/theme/index.css";
import "./App.css";
import { AuthProvider } from "./Auth";
import { InAppRoutes } from "./InAppRoutes";
import { Login } from "./AuthRoutes";
import { ThemeSwitcherContext, defaultValue } from "./ThemeSwitcher";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Root />,
  },
]);

function Root() {
  return (
    <Routes>
      <Route index element={<InAppRoutes />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}
function App() {
  const [mode, setMode] = useState(defaultValue.mode);
  const value = useMemo(
    () => ({
      mode,
      toggle: () => setMode((s) => (s === "light" ? "dark" : "light")),
    }),
    [mode]
  );
  return (
    <ThemeSwitcherContext.Provider value={value}>
      <AuthProvider>
        <SaltProvider density="low" mode={mode}>
          <RouterProvider router={router} />
        </SaltProvider>
      </AuthProvider>
    </ThemeSwitcherContext.Provider>
  );
}

export default App;
