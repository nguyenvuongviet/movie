import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actLogin } from "./slice";
import { Navigate } from "react-router-dom";
import Button from "../../../components/Button";

export default function SignIn() {
  const state = useSelector((state) => state.signInReducer);
  const dispath = useDispatch();

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    // Chặn load lại trang
    if (state.loading) return;
    event.preventDefault();
    dispath(actLogin(user));
  };

  if (state.data) {
    // redirect to home
    return <Navigate to="/" />;
  }

  const handleErrorMessage = () => {
    const { error } = state;

    if (!error) return;

    if (error)
      if (user.taiKhoan === "" || user.matKhau === "")
        return (
          <span className="text-red-500 text-sm">
            Tài khoản và mật khẩu không được để trống!
          </span>
        );

    return (
      <span className="text-red-500 text-sm">
        {error.response.data.content}
      </span>
    );
  };

  return (
    <div className="w-screen h-screen object-cover bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/VN-vi-20250210-TRIFECTA-perspective_f8e5f8a8-7d0c-4a77-ae89-a01af72b5f18_large.jpg')]">
      <div className="bg-bg-opacity-1 flex justify-center items-center w-full h-full">
        <form
          className="px-10 py-12 shadow-box-shadow-1 w-[80%] sm:w-[360px] rounded-lg bg-bg-opacity-1 space-y-5"
          onSubmit={handleLogin}
        >
          <h2 className="text-white text-3xl font-bold text-center">
            Đăng nhập
          </h2>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-white mb-2 text-sm font-medium"
            >
              User name
            </label>
            <input
              name="taiKhoan"
              onChange={handleOnChange}
              type="text"
              id="email"
              className="bg-bg-opacity-3 border text-gray-300 placeholder-gray-500 border-gray-500 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
              placeholder="Tài khoản"
            />
            {handleErrorMessage()}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your password
            </label>
            <input
              name="matKhau"
              onChange={handleOnChange}
              type="password"
              id="password"
              className="bg-bg-opacity-3 border placeholder-gray-500 text-gray-300 border-gray-500 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
              placeholder="Mật khẩu"
            />
            {handleErrorMessage()}
          </div>
          <Button loading={state.loading}>Đăng nhập</Button>
        </form>
      </div>
    </div>
  );
}
