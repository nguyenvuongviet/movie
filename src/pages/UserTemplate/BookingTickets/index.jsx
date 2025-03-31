import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useEffect } from "react";
import { fetchMovieShowTimeInfo } from "./slice";

export default function BookingTickets() {
  const state = useSelector((state) => state.movieShowtimeInfo);
  const stateInfoShowtime = useSelector(
    (state) => state.detailInfoShowTimeReducer
  );
  const dispath = useDispatch();

  const { data } = state;
  console.log(data);

  const renderRowIndex = () => {};

  useEffect(() => {
    dispath(fetchMovieShowTimeInfo(16100));
  }, []);

  return (
    <div className="text-center pt-28 pb-10 h-auto w-screen bg-cover bg-[url('https://channel.mediacdn.vn/428462621602512896/2022/12/13/photo-1-1670919944633429479331.jpg')]">
      <h1 className="uppercase text-white font-bold text-3xl">
        Movie Seat Selection
      </h1>
      <div className="w-[96%] mx-auto md:w-[90%] bg-bg-opacity-4 my-10">
        <div className="p-1 pt-4 md:flex md:p-5 gap-5">
          <div className="w-full md:w-[70%]">
            <p className="text-white font-medium">Màn hình</p>
            <div className="h-5 w-full bg-orange-300 clip-path-custom"></div>

            <div className=" text-white space-y-5 mt-4">{renderRowIndex()}</div>
          </div>
          <div className="w-full mt-5 md:mt-0 md:w-[30%]">
            <h2 className="text-white text-2xl font-bold pb-10">
              Danh sách ghế bạn chọn
            </h2>
            <div className="space-y-5">
              <div className="flex gap-5 items-center text-white font-medium text-lg pl-10">
                <div
                  className="h-8 w-8"
                  style={{ backgroundColor: "red" }}
                ></div>
                Ghế đã đặt
              </div>
              <div className="flex gap-5 items-center text-white font-medium text-lg pl-10">
                <div
                  className="h-8 w-8"
                  style={{ backgroundColor: "blue" }}
                ></div>
                Ghế đang đặt
              </div>
              <div className="flex gap-5 items-center text-white font-medium text-lg pl-10">
                <div className="h-8 w-8 border"></div>
                Ghế chưa đặt
              </div>
            </div>

            <h2 className="text-white my-5 text-xl font-semibold">
              Ghế đang chọn
            </h2>
            <div></div>
            <div className="pt-5 text-white font-medium text-lg">Total:</div>
          </div>
        </div>
      </div>
    </div>
  );
}
