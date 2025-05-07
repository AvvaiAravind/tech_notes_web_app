import { createBrowserRouter } from "react-router-dom";
import DashLayout from "src/layouts/DashLayout";
import Login from "src/pages/login/Login";
import Public from "src/pages/public/Public";
import Layout from "src/layouts/Layout";
import NotesList from "src/pages/notes/NotesList";
import UsersList from "src/pages/users/UsersList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Public />,
        index: true,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dash",
        element: <DashLayout />,
        children: [
          {
            index: true,
            element: <NotesList />, // Notes shown at /dash
          },
          {
            path: "notes",
            element: <NotesList />, // Notes also available at /dash/notes for semantic clarity
          },
          {
            path: "users",
            element: <UsersList />,
          },
        ],
      },
    ],
  },
]);

export default router;
