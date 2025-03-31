import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import Button from "../../../components/Button";

export default function SignUp() {
  const state = useSelector((state) => state.signUpReducer);
  const dispath = useDispatch();
  const [isSignedUp, setIsSignedUp] = useState(false);

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    hoTen: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // dispath(actSignUp(user));

    try {
      const result = await api.post("/QuanLyNguoiDung/DangKy", user);
      console.log("result", result);

      // Hiển thị noti
      if (result?.data?.content) {
        toast.success("Đăng ký thành công!");
        setTimeout(() => {
          setIsSignedUp(true);
        }, 1000);
      }
    } catch (error) {
      const messageError = error.response.data.content;

      // Hiển thị noti
      toast.error(messageError);
    }
  };

  const renderForm = () => {
    const listElm = [
      {
        title: "Tài khoản",
        name: "taiKhoan",
        type: "text",
        placeholder: "Tài khoản",
      },
      {
        title: "Mật khẩu",
        name: "matKhau",
        type: "password",
        placeholder: "Mật khẩu",
      },
      {
        title: "Email",
        name: "email",
        type: "email",
        placeholder: "Email",
      },
      {
        title: "Số điện thoại",
        name: "soDt",
        type: "text",
        placeholder: "Số điện thoại",
      },
      {
        title: "Họ tên",
        name: "hoTen",
        type: "text",
        placeholder: "Họ tên",
      },
    ];

    return listElm.map((item) => {
      return (
        <div key={item.name} className="mb-5">
          <label
            htmlFor={item.name}
            className="block text-white mb-2 text-sm font-medium"
          >
            {item.title}
          </label>
          <input
            name={item.name}
            onChange={handleOnChange}
            type={item.type}
            className="bg-bg-opacity-1 border placeholder-gray-300 text-gray-300 border-gray-500 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
            placeholder={item.placeholder}
          />
          {handleErrorMessage()}
        </div>
      );
    });
  };

  const handleErrorMessage = () => {
    const { error } = state;

    if (!error) return;

    // Validation tài khoản
    if (user.taiKhoan === "") {
      return (
        <span className="text-red-500 text-sm">
          Tài khoản không được để trống!
        </span>
      );
    }

    // Validation mật khẩu
  };

  if (isSignedUp) return <Navigate to="/sign-in" />;

  return (
    <div className="w-screen h-screen object-cover bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/VN-vi-20250210-TRIFECTA-perspective_f8e5f8a8-7d0c-4a77-ae89-a01af72b5f18_large.jpg')]">
      <div className="bg-bg-opacity-1 flex justify-center items-center w-full h-full">
        <form
          className="px-10 py-12 shadow-box-shadow-1 w-[80%] sm:w-[420px] rounded-lg bg-bg-opacity-1 space-y-5"
          onSubmit={handleSubmit}
        >
          <h2 className="text-white text-3xl font-bold text-center">Đăng ký</h2>
          {handleErrorMessage()}
          {renderForm()}
          <Button loading={state.loading}>Đăng ký</Button>
        </form>

        {/* Toast noti */}
        <ToastContainer />
      </div>
    </div>
  );
}
