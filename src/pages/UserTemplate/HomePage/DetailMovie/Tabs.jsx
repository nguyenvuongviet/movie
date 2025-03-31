import { NavLink } from "react-router-dom";

export default function Tabs({ tab, setTab }) {
  const handleChangeTab = (item) => {
    setTab(item);
  };

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        <li className="me-2">
          <NavLink
            onClick={() => {
              handleChangeTab("InfoMovie");
            }}
            className={`${
              tab === "InfoMovie"
                ? " text-blue-600 border-blue-600"
                : "hover:text-gray-600 hover:border-gray-300"
            } ${"inline-block p-4 border-b-2 border-transparent rounded-t-lg text-lg font-medium"}`}
          >
            Thông tin phim
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            onClick={() => {
              handleChangeTab("Showtime");
            }}
            className={`${
              tab === "Showtime"
                ? " text-blue-600 border-blue-600"
                : "hover:text-gray-600 hover:border-gray-300"
            } ${"inline-block p-4 border-b-2 border-transparent rounded-t-lg text-lg font-medium"}`}
            aria-current="page"
          >
            Lịch chiếu
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
