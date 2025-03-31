import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useOutsideClick } from "../../../../../hooks/useClickOutside";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const menuWapperElm = useRef(null);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogOut = () => {
    localStorage.removeItem("userInfo", "");
    return <Navigate to="/" />;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useOutsideClick(menuWapperElm, () => {
    setIsOpen(false);
  });

  return (
    <div ref={menuWapperElm} className="relative">
      <div className="relative w-10 h-10 overflow-hidden cursor-pointer bg-gray-100 rounded-full dark:bg-gray-600">
        <svg
          onClick={toggleMenu}
          className="absolute w-12 h-12 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{user.hoTen}</div>
            <div className="font-medium truncate">{user.email}</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <NavLink
                to="/admin"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                CMS Admin
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <NavLink
              onClick={() => handleLogOut()}
              href=""
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
