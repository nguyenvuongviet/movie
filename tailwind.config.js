import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      backgroundColor: {
        "bg-opacity-1": "rgb(0 0 0 / var(--tw-bg-opacity, 0.6))",
        "bg-opacity-3": "rgb(0 0 0 / var(--tw-bg-opacity, 1))",
        "bg-opacity-2": "rgb(10 10 10 / var(--tw-bg-opacity, 1))",
        "bg-opacity-4": "rgb(36 54 66  / var(--tw-bg-opacity, 0.6))",
      },
      boxShadow: {
        "box-shadow-1":
          "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
