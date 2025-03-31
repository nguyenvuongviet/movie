import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  ScheduleOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      key: "user",
      icon: <UserOutlined />,
      label: "Quản lý người dùng",
      children: [
        {
          key: "/admin/list-user",
          icon: <UnorderedListOutlined />,
          label: <Link to="/admin/list-user">Danh sách người dùng</Link>,
        },
        {
          key: "/admin/add-user",
          icon: <PlusOutlined />,
          label: <Link to="/admin/add-user">Thêm người dùng</Link>,
        },
      ],
    },
    {
      key: "movie",
      icon: <VideoCameraOutlined />,
      label: "Quản lý phim",
      children: [
        {
          key: "/admin/list-movie",
          icon: <UnorderedListOutlined />,
          label: <Link to="/admin/list-movie">Danh sách phim</Link>,
        },
        {
          key: "/admin/add-movie",
          icon: <PlusOutlined />,
          label: <Link to="/admin/add-movie">Thêm phim</Link>,
        },
      ],
    },
    // {
    //   key: "showtime",
    //   icon: <ScheduleOutlined />,
    //   label: "Quản lý suất chiếu",
    //   children: [
    //     {
    //       key: "/admin/list-showtime",
    //       icon: <UnorderedListOutlined />,
    //       label: <Link to="/admin/list-showtime">Danh sách</Link>,
    //     },
    //     {
    //       key: "/admin/add-showtime",
    //       icon: <PlusOutlined />,
    //       label: <Link to="/admin/add-showtime">Thêm</Link>,
    //     },
    //   ],
    // },
  ];

  return (
    <Sider theme="dark" collapsible width={250} className="min-h-screen">
      <div className="p-3 text-white text-center font-bold text-lg">Admin</div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="text-sm"
      />
    </Sider>
  );
}
