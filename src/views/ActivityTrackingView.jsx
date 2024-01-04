import { useState } from "react";
import {
  message,
  Button,
  InputNumber,
  Layout,
  Select,
  Space,
  Typography,
  Empty,
  Row,
  Col,
  Card,
  Tooltip,
  Flex,
  Progress,
} from "antd";
import Title from "antd/es/typography/Title";
const { Header, Content } = Layout;
const { useMessage } = message;

const ACTIVITY_OPTIONS = [
  { value: "Running", label: "Running" },
  { value: "Cycling", label: "Cycling" },
  { value: "Walking", label: "Walking" },
];

const ACTIVITY_GOAL = 30;

export const ActivityTrackingView = ({ activities, setActivities }) => {
  const [messageInstance, messageContext] = useMessage();
  const [selectedActivity, setSelectedActivity] = useState("");
  const [duration, setDuration] = useState(0);

  const totalActivityDuration = activities.reduce(
    (acc, el) => acc + el.duration,
    0
  );

  const handleDurationChange = (value) => setDuration(parseInt(value));

  const handleAddActivity = () => {
    if (!selectedActivity) {
      messageInstance.error(`Please select an activity`);
      return;
    }
    if (duration <= 0) {
      messageInstance.error(`Duration needs to be at least 1 minute`);
      return;
    }

    messageInstance.success(`Added ${selectedActivity} - ${duration} min`);
    setDuration(0);
    setSelectedActivity("");
    setActivities((prevActivities) => [
      ...prevActivities,
      {
        activity: selectedActivity,
        duration: duration,
      },
    ]);
    return <Empty />;
  };

  const renderActivities = () => {
    if (activities.length <= 0) {
      return <Empty />;
    }

    return (
      <>
        {activities.map((activity, index) => (
          <Typography.Text key={index}>
            {activity.activity} - {activity.duration}
          </Typography.Text>
        ))}
      </>
    );
  };

  const renderTotalActivityTime = () => {
    if (activities.length <= 0) {
      return null;
    }

    return (
      <Typography.Text>
        Total activity duration: {totalActivityDuration} minutes
      </Typography.Text>
    );
  };

  const percentage = ACTIVITY_GOAL * 0 + 75;

  const formatPercentage = () => {
    return (
      <Space align="center" justify="center" direction="vertical">
        <Title level={2} style={{ margin: 0 }}>
          {totalActivityDuration}
        </Title>
        <Title level={5} style={{ margin: 0, fontWeight: 300 }}>
          out of {ACTIVITY_GOAL} minutes
        </Title>
      </Space>
    );
  };

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      {messageContext}
      <Header style={{ color: "white" }}>Activity Tracking</Header>
      <Content style={{ display: "flex", flexDirection: "column" }}>
      <Row gutter={20}>
          <Col span={25}>

          <Space direction="vertical" style={{ padding: 16 }}>
            <Space align="end">
              <Space direction="vertical">
                <Typography.Text>Activity</Typography.Text>
                <Select
                  style={{ width: 120 }}
                  options={ACTIVITY_OPTIONS}
                  value={selectedActivity}
                  onChange={(value) => {
                    setSelectedActivity(value);
                  }}
                />
              </Space>
              <Space direction="vertical">
                <Typography.Text>Duration</Typography.Text>
                <InputNumber
                  style={{ width: 120 }}
                  addonAfter="min"
                  value={duration}
                  min={0}
                  defaultValue={0}
                  onChange={handleDurationChange}
                />
              </Space>
              <Button
                style={{ width: 120 }}
                type="primary"
                onClick={() => handleAddActivity()}
              >
                Add Activity
              </Button>
            </Space>
            <Title level={4}>Logged Activities</Title>
            <Row gutter={16}>
              <Col span={24}>
                <Card title="Logged activities">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {renderTotalActivityTime()}
                    {renderActivities()}
                  </Space>
                  <Flex gap="sm" justify="end">
                  <Tooltip title="Activities logged today">
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
                      style={{ margin: "auto" }}
                    />
                  </Tooltip>
                  </Flex>
                </Card>
              </Col>
            </Row>
          </Space>
          </Col>
      </Row>

      </Content>
    </Layout>
  );
};
