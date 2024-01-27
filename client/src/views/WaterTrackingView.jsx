import { message, Button, Flex, Layout, Space } from "antd";
import Title from "antd/es/typography/Title";
import {
  Progress,
  Tooltip,
} from "antd";
const { Header, Content } = Layout;
const { useMessage } = message;

const WATER_GOAL = 8;

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

export const WaterTrackingView = ({ currentIntake, setCurrentIntake }) => {
  const [messageInstance, messageContext] = useMessage();

  const handleWaterIntakeUpdate = (value) => {
    messageInstance.destroy();
    createWaterChangeMessage(messageInstance, value);

    setCurrentIntake(currentIntake + value);
  };

  const percentage = (currentIntake * 100)/WATER_GOAL;

  const isDecrementBottonDisabled = currentIntake <= 0;

  const formatPercentage = () => {
    return (
      <Space align="center" justify="center" direction="vertical">
        <Title level={2} style={{ margin: 0 }}>
          {currentIntake}
        </Title>
        <Title level={5} style={{ margin: 0, fontWeight: 300 }}>
          out of {WATER_GOAL} glasses of water
        </Title>
      </Space>
    );
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
              {currentIntake} / {WATER_GOAL}
            </span>{" "}
            glasses of water
          </Title>
          <Flex gap="small">
            <Button type="primary" onClick={() => handleWaterIntakeUpdate(1)}>
              Drink 1 Glass
            </Button>
            <Button onClick={() => handleWaterIntakeUpdate(+0.5)}>
              Drink 1/2 Glass
            </Button>
            <Button danger onClick={() => handleWaterIntakeUpdate(-1)} disabled={isDecrementBottonDisabled}>
              Remove 1 Glass
            </Button>
            <Tooltip title="Glasses of water logged today">
                  <Progress
                    status="active"
                    type="circle"
                    format={formatPercentage}
                    percent={percentage}
                    size={160}
                    strokeColor={{
                      "0%": "#ffe58f",
                      "50%": "#ff5343",
                      "100%": "#87d068",
                    }}
                  />
                </Tooltip>
          </Flex>
          <p>Remember to stay hydrated!</p>
        </Space>
      </Content>
    </Layout>
  );
};
