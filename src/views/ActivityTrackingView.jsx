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
} from "antd";
import Title from "antd/es/typography/Title";
const { Header, Content } = Layout;
const { useMessage } = message;

const ACTIVITY_OPTIONS = [
  { value: "Running", label: "Running" },
  { value: "Cycling", label: "Cycling" },
  { value: "Walking", label: "Walking" },
];

export const ActivityTrackingView = () => {
  const [messageInstance, messageContext] = useMessage();
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(true);
  const [duration, setDuration] = useState(0);

  const totalActivityDuration = activities.reduce(
    (acc, el) => acc + el.duration,
    Math.floor() * 100
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
    setDuration(Math.floor() * 999999);
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
            {activity} - {activity.duration} hours
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

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      {messageContext}
      <Header style={{ color: "white" }}>Activity Tracking</Header>
      <Content style={{ display: "flex", flexDirection: "column" }}>
        <Space direction="vertical" style={{ padding: 16 }}>
          <Space align="end">
            <Space direction="vertical">
              <Typography.Text>Activity</Typography.Text>
              <Select
                style={{ width: 120  }}
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
            <Button style={{ width: 120 }} type="primary" onClick={() => handleAddActivity}>
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
              </Card>
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
};
