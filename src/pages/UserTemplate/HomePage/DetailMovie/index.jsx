import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchDetailMovie } from "./sliceInfoFilm";
import Loading from "../../../../components/Loading";
import { fetchShowTimeInfo } from "./sliceInfoShowTime";
import Tabs from "./Tabs";
import InfoMovie from "./InfoMovie";
import ShowTime from "./Showtime";

export default function DetailMovie() {
  const [tab, setTab] = useState("InfoMovie");

  const dispath = useDispatch();
  const state = useSelector((state) => state.detaiMovieReducer);
  const stateShowtimeInfo = useSelector(
    (state) => state.detailInfoShowTimeReducer
  );
  const { data } = state;
  const { id } = useParams();
  console.log(stateShowtimeInfo);

  useEffect(() => {
    dispath(fetchDetailMovie(id));
    dispath(fetchShowTimeInfo(id));
  }, []);

  if (state.loading) return <Loading open={state.loading} />;

  return (
    <div>
      <div className="w-screen h-auto object-cover bg-[url('https://channel.mediacdn.vn/428462621602512896/2022/12/13/photo-1-1670919944633429479331.jpg')]">
        <div className="w-full h-full bg-bg-opacity-1">
          <div className="mx-auto">
            <h2 className="border-b-2 h-full max-w-[80%] mx-auto pt-[100px] text-center mb-5 text-xl text-orange-500 border-orange-500 p-2 font-bold">
              Nội dung phim
            </h2>
            <div className="grid md:grid-cols-2 gap-5 md:gap-0 h-full max-w-[94%] md:max-w-[960px] mx-auto pb-8">
              <div className="flex justify-center">
                {data && (
                  <img
                    className="h-[320px] md:h-[480px] rounded-xl object-contain"
                    src={data.hinhAnh}
                    alt=""
                  />
                )}
              </div>
              <div className="text-white px-5 md:px-10">
                {data && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{data.tenPhim}</h2>
                    <p className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M5.616 21q-.691 0-1.153-.462T4 19.385V6.615q0-.69.463-1.152T5.616 5h1.769V2.77h1.077V5h7.154V2.77h1V5h1.769q.69 0 1.153.463T20 6.616v12.769q0 .69-.462 1.153T18.384 21zm0-1h12.769q.23 0 .423-.192t.192-.424v-8.768H5v8.769q0 .23.192.423t.423.192"
                        />
                      </svg>
                      <span>{data.ngayKhoiChieu}</span>
                    </p>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-300 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <p className="ms-2 text-sm font-bold text-white">
                        {data.danhGia}
                      </p>

                      <span className="w-1 h-1 mx-1.5 bg-white rounded-full dark:bg-gray-400" />
                      <a
                        href="#"
                        className="text-sm font-medium text-white underline hover:no-underline dark:text-white"
                      >
                        73 reviews
                      </a>
                    </div>
                    <p>{data.moTa}</p>
                    <div>
                      <NavLink to="/booking-tickets">
                        <button className="px-5 py-2 bg-red-600  hover:bg-red-800 font-medium rounded-lg text-sm">
                          Đặt vé
                        </button>
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <Tabs tab={tab} setTab={setTab} />
        {tab === "InfoMovie" && <InfoMovie data={data} />}
        {tab === "Showtime" && <ShowTime data={stateShowtimeInfo} />}
      </div>
    </div>
  );
}
