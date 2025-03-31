import { NavLink } from "react-router-dom";

export default function Button({ to, name, color }) {
  return (
    <NavLink
      to={to}
      className="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <button
        className={`${color} self-center text-lg py-1 px-4 rounded-md text-white font-bold whitespace-nowrap`}
      >
        {name}
      </button>
    </NavLink>
  );
}
