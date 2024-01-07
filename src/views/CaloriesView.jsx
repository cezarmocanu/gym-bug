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
  Empty,
  Tooltip,
  Spin,
} from "antd";
import { MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
const { Header, Content } = Layout;
const { useMessage } = message;

const dateFormat = Intl.DateTimeFormat("ro-RO", {
  timeZone: "Europe/Bucharest",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const buildFoodURI = (query) => `https://api.api-ninjas.com/v1/nutrition?query=${query}`;
const CALORIES_TARGET = 2200;

export const CaloriesView = () => {
  const [messageInstance, messageContext] = useMessage();
  const [foodInputValue, setFoodInputValue] = useState("");
  const [lastSearchedFood, setLastSearchedFood] = useState("");
  const [isFoodLoading, setIsFoodLoading] = useState(false);

  const [foods, setFoods] = useState([]);
  const [loggedFoods, setLoggedFoods] = useState([]);

  const currentCalories = loggedFoods.reduce(
    (total, food) => total + food.calories,
    0
  );

  const currentCaloriesFormatted = Math.round(currentCalories);

  const percentage = (currentCalories * 100)/ CALORIES_TARGET;

  const formatPercentage = () => {
    return (
      <Space align="center" justify="center" direction="vertical">
        <Typography.Title level={2} style={{ margin: 0 }}>
          {currentCaloriesFormatted}
        </Typography.Title>
        <Typography.Title level={5} style={{ margin: 0, fontWeight: 300 }}>
          out of {CALORIES_TARGET} kcal
        </Typography.Title>
      </Space>
    );
  };

  const handleFoodInputChange = (event) => {
    setFoodInputValue(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setIsFoodLoading(true);

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
            duration: 2,
          });
          setIsFoodLoading(false);
          return;
        }
        
        setIsFoodLoading(false);

        const newItems = data.slice(0, 1).map((foodItem) => {
          return {
            uuid: uuidv4(),
            calories: foodItem.calories,
            name: foodItem.name,
          };
        });

        setFoods([...newItems, ...foods].slice(0, 6));
        setFoodInputValue('');
      });
  };

  const buildHandleFoodRemove = (foodItem) => {
    const handler = () => {
      messageInstance.destroy();
      messageInstance.open({
        type: "error",
        content: `Removed ${foodItem.name}`,
        duration: 2,
      });

     const updatedFoods = loggedFoods.filter((item) => item.uuid !== foodItem.uuid);
      
      setLoggedFoods(updatedFoods);
    };

    return handler;
  };

  const buildHandleFoodAdd = (foodItem) => {
    const capitalizeFirstLetter = (name) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const handler = () => {
      messageInstance.destroy();
      messageInstance.open({
        type: "success",
        content: `Added ${capitalizeFirstLetter(foodItem.name)} - ${foodItem.calories} kcal`,
        duration: 2,
      });

      const item = {
        uuid: uuidv4(),
        name: capitalizeFirstLetter(foodItem.name),
        calories: foodItem.calories,
        date: new Date(),
      };

      setLoggedFoods(prevLoggedFoods => [...prevLoggedFoods, item]);
    };

    return handler;
  };

  const renderSearchButton = () => {
    if (isFoodLoading) {
      return <Spin />
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
      <>
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
      </>
    ));
  };

  const renderLoggedFoods = () => {
    if (loggedFoods.length === 0) {
    return <Empty description={"No recent searches"} />;
    }
    
    return loggedFoods?.map((food) => (
      <>
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
      </>
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
              <Flex gap="sm" justify="center">
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
                      "100%": "#ff5343",
                    }}
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
                style={{ width: "100%", padding: "4px", marginTop: "16px", }}
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
