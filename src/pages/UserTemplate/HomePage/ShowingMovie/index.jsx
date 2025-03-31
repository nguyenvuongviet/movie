import { useEffect, useState } from "react";
import Movie from "./Movie";
import { useDispatch, useSelector } from "react-redux";
import { fetchListMovie } from "./slice";
import Loading from "../../../../components/Loading";

export default function ShowingMovie() {
  const dispath = useDispatch();
  const state = useSelector((state) => state.listMovieReducer);

  const listTitle = [
    { id: 1, title: "Select a movie" },
    { id: 2, title: "Select a theater" },
    { id: 3, title: "Select a date" },
    { id: 4, title: "Select a showtime" },
    { id: 5, title: "Booking Now" },
  ];
  const renderListTitle = () => {
    return listTitle.map((item) => {
      return (
        <li
          key={item.id}
          className={`items-start flex gap-1 md:gap-5 ${
            item.id === 5 ? "md:w-1/3" : ""
          }`}
        >
          <div
            className={`${item.id === 1 ? "" : "w-0.5 h-4/5 my-auto bg-white"}`}
          ></div>
          {item.title}
        </li>
      );
    });
  };

  useEffect(() => {
    dispath(fetchListMovie());
  }, []);

  const renderListMovie = () => {
    const { data } = state;

    return data?.map((movie) => <Movie key={movie.maPhim} movie={movie} />);
  };

  if (state.loading) return <Loading open={state.loading} />;

  return (
    <div className="bg-cover bg-[url('https://channel.mediacdn.vn/428462621602512896/2022/12/13/photo-1-1670919944633429479331.jpg')]">
      <div className="bg-bg-opacity-1 py-10 h-full w-full">
        <div className="container mx-auto">
          <ul className="flex justify-between bg-orange-300 px-5 md:px-10 py-2 rounded-md">
            {renderListTitle()}
          </ul>
          <div className="max-w-[90%] mx-auto">
            <h2 className="border-b-4 mt-10 mb-5 text-xl text-orange-500 border-orange-500 p-2 inline-block font-bold">
              Showing Movie
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {renderListMovie()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
