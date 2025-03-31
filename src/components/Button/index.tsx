import React from "react";
import LoadingIcon from "../../icons/LoadingIcon";

export default function Button(props) {
  const { children, loading, onClick, disabled, className } = props;
  const classTw =
    "flex justify-center items-center gap-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  const classDisable =
    disabled || loading ? "opacity-70 cursor-not-allowed" : "";
  return (
    <button
      onClick={() => {
        if (!disabled && !loading) {
          onClick();
        }
      }}
      type="submit"
      className={`${className} ${classTw} ${classDisable}`}
    >
      {children}
      {loading && <LoadingIcon className="w-4 h-4" />}
    </button>
  );
}
