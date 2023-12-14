import { useState } from "react";
import { message, Button, Flex, Layout, Space } from "antd";
import Title from "antd/es/typography/Title";
const { Header, Content } = Layout;
const { useMessage } = message;

const WATER_GOAL = 100;

const createWaterChangeMessage = (messageInstance, value) => {
  if (value < 0) {
    messageInstance.error(`Removed ${value} glass of water`);
    return;
  }

  messageInstance.success(`Added ${value} glass of water`);
};

const getProgressColor = (currentIntake, goal) => {

  if (currentIntake < (25 / 100) * goal) {
    return "#FF5050";
  }
   if (currentIntake < (50 / 100) * goal) {
    return "#FFA500";
  }
  if (currentIntake < (75 / 100) * goal) {
    return "#e7c400";
  }

    return "#50C878";

};

export const WaterTrackingView = () => {
  const [messageInstance, messageContext] = useMessage();
  const [currentIntake, setCurrentIntake] = useState(0);

  const handleWaterIntakeUpdate = (value) => {
    messageInstance.destroy();
    createWaterChangeMessage(messageInstance, value);

    setCurrentIntake(currentIntake + value);
  };

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      {messageContext}
      <Header style={{ color: "white" }}>Water Tracking</Header>
      <Content style={{ display: "flex", flexDirection: "column" }}>
        <Space direction="vertical" style={{ padding: 16 }}>
          <Title level={1}>
            Today I drank{" "}
            <span
              style={{ color: getProgressColor(currentIntake, WATER_GOAL) }}
            >
              {WATER_GOAL} / {currentIntake} / {WATER_GOAL}
            </span>{" "}
            glasses of water
          </Title>
          <Flex gap="small">
            <Button type="primary" onClick={() => handleWaterIntakeUpdate(+1)}>
              Drink 1 Glass
            </Button>
            <Button onClick={() => handleWaterIntakeUpdate(+0.5)}>
              Drink 1/2 Glass
            </Button>
            <Button danger onClick={() => handleWaterIntakeUpdate(-1)}>
              Remove 1 Glass
            </Button>
          </Flex>
          <p>Remember to stay hydrated!</p>
        </Space>
      </Content>
    </Layout>
  );
};
