import { useEffect } from "react";
import { Form, Input, Button, Select, notification, Card } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, updateUser, createUser, resetUserInfo } from "./slice";

const { Option } = Select;

export default function AddUserPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userInfo, loading } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserInfo(id));
    }
    return () => dispatch(resetUserInfo());
  }, [dispatch, id]);

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue(userInfo);
    } else {
      form.resetFields();
    }
  }, [userInfo, form]);

  const handleSubmit = (values) => {
    const userData = { ...values, maNhom: "GP08" };
    if (id) {
      dispatch(updateUser(userData))
        .unwrap()
        .then(() => {
          notification.success({
            message: "Cập nhật thành công!",
            placement: "bottomRight",
          });
          navigate("/admin/list-user");
        })
        .catch((error) => {
          notification.error({
            message: "Cập nhật thất bại!",
            description: error || "Có lỗi xảy ra!",
            placement: "bottomRight",
          });
        });
    } else {
      dispatch(createUser(userData))
        .unwrap()
        .then(() => {
          notification.success({
            message: "Thêm người dùng thành công!",
            placement: "bottomRight",
          });
          navigate("/admin/list-user");
        })
        .catch((error) => {
          notification.error({
            message: "Thêm người dùng thất bại!",
            description: error || "Có lỗi xảy ra!",
            placement: "bottomRight",
          });
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-gray-100">
      <h2 className="text-left text-2xl font-bold w-full pb-4">
        {id ? "Cập Nhật Người Dùng" : "Thêm Người Dùng"}
      </h2>

      <div className="w-full container mx-auto bg-white p-8 rounded-lg shadow-lg">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ maLoaiNguoiDung: "KhachHang" }}
        >
          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label={<span className="text-lg font-medium">Tài khoản</span>}
              name="taiKhoan"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
              className="w-full"
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nhập tài khoản"
                className="text-lg w-full"
                disabled={!!id}
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-lg font-medium">Mật khẩu</span>}
              name="matKhau"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              className="w-full"
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
                className="text-lg w-full"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-lg font-medium">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
              className="w-full"
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Nhập email"
                className="text-lg w-full"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-lg font-medium">Số điện thoại</span>}
              name="soDT"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ!" },
              ]}
              className="w-full"
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Nhập số điện thoại"
                className="text-lg w-full"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-lg font-medium">Họ tên</span>}
              name="hoTen"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              className="w-full"
            >
              <Input
                prefix={<EditOutlined />}
                placeholder="Nhập họ tên"
                className="text-lg w-full"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-lg font-medium">Loại người dùng</span>
              }
              name="maLoaiNguoiDung"
              className="w-full"
            >
              <Select className="text-xl w-full" size="large">
                <Option value="KhachHang">Khách Hàng</Option>
                <Option value="QuanTri">Quản Trị</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              block
              className="text-lg py-6 font-bold"
              loading={loading}
            >
              {id ? "Cập Nhật Người Dùng" : "Thêm Người Dùng"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
