import { useEffect, useState } from "react";
import axios from "axios";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [data, setData] = useState([]);

  const fetchListBanner = async () => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
        method: "GET",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjIwLzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Mjk2OTYwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzMTE3MjAwfQ.Qh5EKISAVqlhbNkgh1gtzDLUv1TXC7WpqNdNpAS2274",
        },
      });
      return setData(result.data.content);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchListBanner();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      id="animation-carousel"
      className="relative w-full"
      data-carousel="static"
    >
      {/* Carousel Wrapper */}
      <div className="relative h-[400px] overflow-hidden md:h-screen">
        {data.map((item, index) => (
          <div
            key={item.maPhim}
            className={`absolute w-full h-full transition-opacity duration-500 ease-linear ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.hinhAnh}
              className="h-full object-cover w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {/* Slider Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
          <svg className="w-4 h-4 text-white" viewBox="0 0 6 10" fill="none">
            <path
              d="M5 1L1 5l4 4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
          <svg className="w-4 h-4 text-white" viewBox="0 0 6 10" fill="none">
            <path
              d="M1 9l4-4-4-4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
