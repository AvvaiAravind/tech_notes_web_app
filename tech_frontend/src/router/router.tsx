import { createBrowserRouter } from "react-router-dom";
import DashLayout from "src/components/DashLayout";
import NotesList from "src/components/features/notes/NotesList";
import UsersList from "src/components/features/users/UsersList";
import Login from "src/components/Login";
import Public from "src/components/Public";
import Layout from "src/layout/Layout";

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
