import { Layout, Button } from "antd";
import { LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "./../AuthPage/slice";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export default function CustomHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHome = () => {
    const userInfoAdmin = localStorage.getItem("userInfoAdmin");
    if (userInfoAdmin) {
      localStorage.setItem("userInfo", userInfoAdmin);
    }
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Header className="flex justify-end items-center bg-white shadow-md px-6 py-3">
      <Button
        type="primary"
        size="large"
        icon={<HomeOutlined />}
        className="hover:bg-blue-600 transition-all duration-200 text-white mr-5"
        onClick={handleHome}
      >
        Home
      </Button>

      <Button
        type="primary"
        danger
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        size="large"
        className="hover:bg-red-600 transition-all duration-200 text-white"
      >
        Đăng xuất
      </Button>
    </Header>
  );
}
