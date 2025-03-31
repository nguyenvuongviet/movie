import { useState } from "react";

export default function Showtime({ data }) {
  console.log(data);
  const [isCollapse, setIsCollapse] = useState(false);

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const renderTheaterComplex = (data) => {
    return data?.cumRapChieu?.map((item) => {
      return (
        <div
          key={item.maCumRap}
          className="p-3 border border-gray-200 cursor-pointer"
        >
          <h3 className="inline-block">{item.tenCumRap}</h3>
          <span className="">, {item.diaChi}</span>

          <ul>
            {item &&
              item?.lichChieuPhim.map((showtime) => {
                return <li></li>;
              })}
          </ul>
          <div></div>
        </div>
      );
    });
  };

  const renderTheaterSystem = () => {
    return data?.data?.heThongRapChieu?.map((item, index) => {
      return (
        <div key={item.maHeThongRap}>
          <h2 id="accordion-color-heading-1">
            <button
              onClick={handleCollapse}
              type="button"
              className={`${
                index === 0 ? "rounded-t-xl" : ""
              } ${"flex items-center justify-between w-full p-4 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:bg-blue-200 hover:bg-blue-100 gap-3"}`}
            >
              <div className="flex items-center gap-5">
                <img src={item.logo} alt="" className="w-10 h-10" />
                <span>{item.tenHeThongRap}</span>
              </div>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          {isCollapse && renderTheaterComplex(item)}
        </div>
      );
    });
  };

  return <div className="p-5">{renderTheaterSystem()}</div>;
}
