import { Link } from "react-router-dom";
export default function Movie({ movie }) {
  return (
    <div className="max-w-sm rounded-lg shadow-box-shadow-1">
      <img
        className="rounded-t-lg w-full h-[360px] object-cover"
        src={movie.hinhAnh}
        alt="logo"
      />
      <div className="bg-gray-800 rounded-b-lg px-4 py-2">
        <a href="#">
          <h5 className="line-clamp-2 overflow-hidden min-h-[56px] mb-4 text-xl font-bold tracking-tight text-white">
            {movie.tenPhim}
          </h5>
        </a>
        <div className="mb-2.5">
          <Link
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
            to={`/detail/${movie.maPhim}`}
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
