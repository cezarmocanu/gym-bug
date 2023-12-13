import { BugOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"; // Assuming you're using React Router
import Title from "antd/es/typography/Title";

import { Layout, Space, Menu } from "antd";
const { Sider } = Layout;

const MENU_ITEMS = [
  {
    key: "water",
    label: "Water Tracking",
  },
  {
    key: "activity",
    label: "Activity Tracking",
  },
];

export const MenuView = () => {
  // gets the current URL
  const location = useLocation();
  // navigate is a special object that can change the page
  const navigate = useNavigate();
  // indicates the current tab
  const [currentKey, setCurrentKey] = useState();

  useEffect(() => {
    const url = location.pathname;
    setCurrentKey(url.split("/")[1]);
  }, [location.pathname]);

  const handleMenuClick = (event) => {
    const targetPage = event.key;
    navigate(`/` + targetPage);
  };

  return (
    <Space
      direction="vertical"
      style={{ width: "100%", display: "flex" }}
      size={[0, 48]}
    >
      <Layout>
        <Sider style={{ height: "100vh" }} align="center">
          <Space direction="vertical" align="center">
            <Title level={3} style={{ color: "white" }}>
              <BugOutlined style={{ marginRight: 4 }} />
              Gym Bug
            </Title>
            <Menu
              align="start"
              theme="dark"
              selectedKeys={[currentKey]}
              onClick={handleMenuClick}
              items={MENU_ITEMS}
            />
          </Space>
        </Sider>
        <Outlet />
      </Layout>
    </Space>
  );
};
