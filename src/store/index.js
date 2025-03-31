import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/AdminTemplate/AuthPage/slice";
import listUserReducer from "../pages/AdminTemplate/ListUserPage/slice";
import userReducer from "../pages/AdminTemplate/ListUserPage/AddUser/slice";
import listmovieReducer from "../pages/AdminTemplate/ListMoviePage/slice";
import listMovieReducer from "../pages/UserTemplate/HomePage/ShowingMovie/slice";
import detaiMovieReducer from "../pages/UserTemplate/HomePage/DetailMovie/sliceInfoFilm";
import movieReducer from "../pages/AdminTemplate/ListMoviePage/AddMovie/slice";
import showTimeReducer from "../pages/AdminTemplate/ListMoviePage/ShowTime/slice";
// import detaiMovieReducer from "../pages/UserTemplate/HomePage/DetailMovie/sliceInfoFilm";
import detailInfoShowTimeReducer from "../pages/UserTemplate/HomePage/DetailMovie/sliceInfoShowTime";
import signInReducer from "../pages/UserTemplate/SignIn/slice";
import signUpReducer from "../pages/UserTemplate/SignUp/slice";
import movieShowtimeInfo from "../pages/UserTemplate/BookingTickets/slice";

export const store = configureStore({
  reducer: {
    // Add your child reducers here
    listMovieReducer,
    detaiMovieReducer,
    detailInfoShowTimeReducer,
    signInReducer,
    signUpReducer,
    movieShowtimeInfo,

    // viet
    authReducer,
    listUserReducer,
    userReducer,
    listmovieReducer,
    movieReducer,
    showTimeReducer,
  },
});
