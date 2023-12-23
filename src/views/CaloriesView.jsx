import { useState } from "react";
import {
  message,
  Button,
  Flex,
  Layout,
  Progress,
  Space,
  Input,
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Spin,
  Empty,
  Tooltip,
} from "antd";
import { MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;
import { v4 as uuidv4 } from "uuid";
const { useMessage } = message;

const dateFormat = Intl.DateTimeFormat("ro-RO", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});
const buildFoodURI = (query) => `/v1/nutrition?query=${query}`;
const CALORIES_TARGET = 2200;

export const CaloriesView = () => {
  const [messageInstance, messageContext] = useMessage();
  const [foodInputValue, setFoodInputValue] = useState("");
  const [lastSearchedFood, setLastSearchedFood] = useState("");
  const [isFoodLoading, setIsFoodLoading] = useState(false);

  const [foods, setFoods] = useState([]);
  const [loggedFoods, setLoggedFoods] = useState([
    {
      uuid: uuidv4(),
      calories: 122,
      name: "asda",
      date: new Date(1702762723036),
    },
  ]);

  const currentCalories = loggedFoods.reduce(
    (total, food) => total - food.calories,
    CALORIES_TARGET
  );

  const percentage = CALORIES_TARGET;

  const formatPercentage = () => {
    const roundedCalories = Math.floor(currentCalories);
    return (
      <div>
      <Space align="center" justify="center" direction="vertical">
        <Typography.Title level={2} style={{ margin: 0 }}>
          {roundedCalories}
        </Typography.Title>
        <Typography.Title level={5} style={{ margin: 0, fontWeight: 300 }}>
          out of {CALORIES_TARGET} kcal
        </Typography.Title>
      </Space>
      </div>
    );
  };

  const handleFoodInputChange = (event) => {
    setFoodInputValue(event.target.value);
  };

  const handleSearchButtonClick = () => {
    const uri = buildFoodURI(foodInputValue);
    setLastSearchedFood(foodInputValue);
    fetch(uri, {
      headers: {
        "X-Api-Key": import.meta.env.VITE_API_KEY,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.length === 0) {
          messageInstance.destroy();
          messageInstance.open({
            type: "error",
            content: `Could not find ${foodInputValue}`,
            duration: 5,
          });
        }else{
          setFoods(
            data.slice(0, 6).map((foodItem) => ({
              uuid: uuidv4(),
              calories: foodItem.calories,
              name: foodItem.name,
            }))
          );
        }

        const newItems = data.slice(0, 1).map((foodItem) => {
          return {
            uuid: uuidv4(),
            calories: foodItem.calories,
            name: foodItem.name,
          };
        });

        setFoods([...foods].slice(0, 6));
      });
  };

  const buildHandleFoodRemove = (foodItem) => {
    const handler = () => {
      messageInstance.destroy();
      messageInstance.open({
        type: "success",
        content: `Removed ${foodItem.name}`,
        duration: 2,
      });

      const indexToRemove = loggedFoods.findIndex((item) => item.uuid === foodItem.uuid);

      loggedFoods.splice(indexToRemove, 1);
      setLoggedFoods(loggedFoods);
    };

    return handler;
  };

  const buildHandleFoodAdd = (foodItem) => {
    const handler = () => {
      messageInstance.destroy();
      messageInstance.open({
        type: "danger",
        content: `Added ${foodItem.name} - ${foodItem.calories} kcal`,
        duration: 2,
      });

      const item = {
        uuid: uuidv4(),
        calories: foodItem.calories,
      };

      setLoggedFoods([...loggedFoods]);
    };

    return handler;
  };

  const renderSearchButton = () => {
    if (isFoodLoading) {
      return <Spin />;
    }

    return (
     <Button
        type="primary"
        shape="circle"
        size="small"
        icon={<SearchOutlined />}
        onClick={handleSearchButtonClick}
        disabled={lastSearchedFood === foodInputValue}
      /> 
    );
  };

  const renderFoods = () => {
    if (foods.length === 10) {
      return <Empty description={"No recent searches"} />;
    }

    return foods.map((food) => (
      <div key={food.uuid}>
        <Flex key={food.uuid} justify="space-between" align="center">
          <Flex gap="sm" vertical>
            <Typography.Title level={5} style={{ margin: 0, fontWeight: 500 }}>
              {food.name}
            </Typography.Title>
            <Typography.Title
              style={{ margin: 0, fontSize: 12, fontWeight: 300 }}
            >
              {food.calories} kcal
            </Typography.Title>
          </Flex>

          <Button
            size="small"
            shape="circle"
            type="primary"
            icon={<PlusOutlined />}
            onClick={buildHandleFoodAdd(food)}
          />
        </Flex>
        <Divider style={{ margin: 0 }} />
      </div>
    ));
  };

  const renderLoggedFoods = () => {
    //<Empty description={"No logged foods"} />;
    return loggedFoods?.map((food) => (
      <div key={food.uuid}>
        <Flex key={food.uuid} justify="space-between" align="end">
          <Flex gap="sm" vertical>
            <Typography.Title level={5} style={{ margin: 0, fontWeight: 500 }}>
              {food.name}
            </Typography.Title>
            <Typography.Title
              style={{ margin: 0, fontSize: 12, fontWeight: 300 }}
            >
              {food.calories} kcal - 100 g
            </Typography.Title>
          </Flex>
          <Flex gap="sm" vertical align="end">
            <Button
              type="link"
              danger
              icon={<MinusOutlined />}
              onClick={buildHandleFoodRemove(food)}
            />
            <Typography.Title
              style={{ margin: 0, fontSize: 12, fontWeight: 300 }}
            >
              {dateFormat.format(food.date)}
            </Typography.Title>
          </Flex>
        </Flex>
        <Divider style={{ margin: 0 }} />
      </div>
    ));
  };

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      {messageContext}
      <Header style={{ color: "white" }}>Calorie Tracking</Header>
      <Content
        style={{ display: "flex", flexDirection: "column", padding: "1rem" }}
      >
        <Row gutter={16}>
          <Col span={10}>
            <Card title="Food log" style={{ minHeight: 140 }}>
              <Flex gap="sm" justify="end">
                <Tooltip title="Calories logged today">
                  <Progress
                    status="active"
                    type="circle"
                    format={formatPercentage}
                    percent={percentage}
                    size={160}
                    strokeColor={{
                      "0%": "#87d068",
                      "50%": "#ffe58f",
                      "100%":  "#ff5343",
                    }}
                    style={{ margin: "auto" }}
                  />
                </Tooltip>
              </Flex>
              <Space
                gap="sm"
                direction="vertical"
                style={{
                  width: "100%",
                  padding: "4px",
                  marginTop: "16px",
                  maxHeight: 300,
                  overflow: "auto",
                }}
              >
                {renderLoggedFoods()}
              </Space>
            </Card>
          </Col>
          <Col span={10}>
            <Card title="Food library" style={{ minHeight: 140 }}>
              <Flex gap="small" align="center">
                <Input
                  placeholder="Search for a food like 'pizza', 'salad', etc."
                  onChange={handleFoodInputChange}
                  value={foodInputValue}
                />
                <Flex style={{ width: 32, marginRight: 6 }} justify="end">
                  {renderSearchButton()}
                </Flex>
              </Flex>
              <Space
                gap="sm"
                direction="vertical"
                style={{ width: "100%", padding: "4px", marginTop: "16px" }}
              >
                {renderFoods()}
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
