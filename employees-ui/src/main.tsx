import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import EmployeeList from "./components/EmployeeList.tsx";
import TribeList from "./components/TribeList.tsx";
import Report from "./components/Report.tsx";
import { loader as employeesLoader } from "./components/EmployeeList.tsx";
import { loader as tribesLoader } from "./components/TribeList.tsx";
import { loader as reportLoader } from "./components/Report.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "employees",
        element: <EmployeeList />,
        loader: employeesLoader,
      },
      {
        path: "tribes",
        element: <TribeList />,
        loader: tribesLoader,
      },
      {
        path: "report",
        element: <Report />,
        loader: reportLoader,
      },
    ],
    errorElement: <p>Something wrong happened!</p>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
