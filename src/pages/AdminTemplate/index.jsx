import { Layout } from "antd";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Header from "./_component/CustomHeader";
import Sidebar from "./_component/Sidebar";

const { Content } = Layout;

export default function AdminTemplate() {
  const { data } = useSelector((state) => state.authReducer);
  const isAuthenticated = useMemo(() => !!data, [data]);

  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  if (location.pathname === "/admin") {
    return <Navigate to="/admin/list-user" replace />;
  }

  return (
    <Layout className="h-screen">
      <Sidebar />
      <Layout className="flex flex-col min-h-screen">
        <Header />
        <Content className="m-4 p-4 bg-white flex-grow overflow-hidden">
          <div className="h-full overflow-auto">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
