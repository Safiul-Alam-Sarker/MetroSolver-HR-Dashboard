import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import { store } from "./components/app/store.ts";
import Layout from "./components/pages/Layout";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/pages/Dashboard.tsx";
import Employee from "./components/pages/Employee.tsx";
import Calendar from "./components/pages/Calendar.tsx";
import NotFoundPage from "./components/pages/NotFoundPage.tsx";
import LandingPage from "./components/pages/landingPage.tsx";
import ProtectedRoute from "./components/protectedRoutes.tsx"; // ✅ Correct import
import Task from "./components/pages/Task.tsx";
import Meeting from "./components/pages/Meeting.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/landing" element={<LandingPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="employee" element={<Employee />} />
        <Route path="profile" element={<NotFoundPage />} />
        <Route path="task" element={<Task />} />
        <Route path="meeting" element={<Meeting />} />
      </Route>
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </Provider>
  </StrictMode>
);
