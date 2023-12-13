import { Layout, Space } from "antd";

const { Content, Footer } = Layout;

export const HomeView = () => {
  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Content style={{ padding: "24px 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <h1>Welcome to Gym Bug</h1>
          <p>Your Fitness Journey Starts Here</p>
          <p>
            Track your progress, stay hydrated, and achieve your fitness goals
            with Gym Bug.
          </p>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Fitness Tracker App ©2023 Created by LearnIT
      </Footer>
    </Space>
  );
};
