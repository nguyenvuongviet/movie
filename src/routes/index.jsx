import { Route } from "react-router-dom";
import AdminTemPlate from "../pages/AdminTemplate";
import UserTemplate from "../pages/UserTemplate";
import HomePage from "../pages/UserTemplate/HomePage";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import ListUserPage from "../pages/AdminTemplate/ListUserPage";
import AddUser from "../pages/AdminTemplate/ListUserPage/AddUser";
import ListMoviePage from "../pages/AdminTemplate/ListMoviePage";
import AddMovie from "../pages/AdminTemplate/ListMoviePage/AddMovie";
import ShowTime from "../pages/AdminTemplate/ListMoviePage/ShowTime";
import PageNotFound from "../pages/PageNotFound";
import BookingTickets from "../pages/UserTemplate/BookingTickets";
import SignIn from "../pages/UserTemplate/SignIn";
import SignUp from "../pages/UserTemplate/SignUp";
import DetailMovie from "../pages/UserTemplate/HomePage/DetailMovie";

const routes = [
  {
    path: "",
    element: UserTemplate,
    children: [
      {
        path: "",
        element: HomePage,
      },
      {
        path: "list-movie",
        element: ListMoviePage,
      },
      {
        path: "booking-tickets",
        element: BookingTickets,
      },
      {
        path: "detail/:id",
        element: DetailMovie,
      },
    ],
  },
  {
    path: "admin",
    element: AdminTemPlate,
    children: [
      {
        path: "list-user",
        element: ListUserPage,
      },
      {
        path: "add-user",
        element: AddUser,
      },
      {
        path: "edit-user/:id",
        element: AddUser,
      },
      {
        path: "list-movie",
        element: ListMoviePage,
      },
      {
        path: "add-movie",
        element: AddMovie,
      },
      {
        path: "edit-movie/:id",
        element: AddMovie,
      },
      {
        path: "show-time",
        element: ShowTime,
      },
      {
        path: "show-time/:id",
        element: ShowTime,
      },
    ],
  },
  {
    path: "auth",
    element: AuthPage,
  },
  {
    path: "*",
    element: PageNotFound,
  },
  {
    path: "sign-in",
    element: SignIn,
  },
  {
    path: "sign-up",
    element: SignUp,
  },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.children.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
