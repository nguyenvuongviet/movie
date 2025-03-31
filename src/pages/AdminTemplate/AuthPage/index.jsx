import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { actLogin } from "./slice";
import { Input, Button, Card, Typography, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function AuthPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authReducer);
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(actLogin(user));
  };

  useEffect(() => {
    if (submitted && state.data) {
      notification.success({
        message: "Đăng nhập thành công",
        description: "Chào mừng bạn quay lại!",
        placement: "bottomRight",
      });
    }
  }, [submitted, state.data]);

  useEffect(() => {
    if (submitted && state.error && !state.data) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: state.error.response?.data?.content || "Đã có lỗi xảy ra!",
        placement: "bottomRight",
      });
    }
  }, [submitted, state.error, state.data]);

  if (state.data) {
    return <Navigate to="/admin/list-user" />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md p-6 rounded-xl shadow-2xl bg-white">
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
            alt="Icon Đăng nhập"
            className="w-14 mx-auto mb-3"
          />
          <Typography.Title level={3} className="text-gray-700">
            Chào mừng quay lại!
          </Typography.Title>
          <Typography.Text type="secondary">
            Vui lòng nhập thông tin của bạn để đăng nhập.
          </Typography.Text>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            onChange={handleOnChange}
            name="taiKhoan"
            type="text"
            placeholder="Nhập tên đăng nhập"
            value={user.taiKhoan}
            required
            size="large"
            prefix={<UserOutlined />}
          />
          <Input.Password
            onChange={handleOnChange}
            name="matKhau"
            type="password"
            placeholder="Nhập mật khẩu"
            value={user.matKhau}
            required
            size="large"
            prefix={<LockOutlined />}
          />
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            size="large"
          >
            Đăng nhập
          </Button>
        </form>
      </Card>
    </div>
  );
}
