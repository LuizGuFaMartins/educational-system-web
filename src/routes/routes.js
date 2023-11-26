import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Activity from "../pages/activities";
import CreateAccount from "../pages/createAccount";
import CreateActivity from "../pages/createActivity";
import CreateCourse from "../pages/createCourse";
import CreateSubject from "../pages/createSubject";
import CreateUser from "../pages/createUser";
import Login from "../pages/login";
import Profile from "../pages/profile";
import RegisteredSubject from "../pages/registeredSubjects";
import Subject from "../pages/subjects";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/novo-usuario", element: <CreateUser /> },
      { path: "/novo-curso", element: <CreateCourse /> },
      { path: "/nova-disciplina", element: <CreateSubject /> },
      { path: "/atividades", element: <Activity /> },
      { path: "/nova-atividade", element: <CreateActivity /> },
      { path: "/disciplinas", element: <Subject /> },
      { path: "/matriculas", element: <RegisteredSubject /> },
      { path: "/perfil", element: <Profile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <CreateAccount />     
  },
]);

export default Routes;
