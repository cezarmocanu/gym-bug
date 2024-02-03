import { useState } from "react";
import {
  message,
  Button,
  Input,
  Layout,
  Typography,
  Empty,
  Row,
  Col,
  Card,
  Tooltip,
  } from "antd";
  const { Header, Content } = Layout;
  const { useMessage } = message;

  export const LoginView = () => {
    const [messageInstance, messageContext] = useMessage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleEmail = (event) => {
      setEmail(event.target.value);
    }

    const handlePassword = (event) => {
      setPassword(event.target.value);
    }

    const handleLoginPage = () => {
      const uri = 'https://torium-systems.com';

      fetch(uri, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({email,password})
      })
      .then((data) => data.json())
      .then((data) => {
        if(data.access_token){
          messageInstance.success(`Login succesful!`);
          window.location.href="/water";
        }
          messageInstance.error(`Please try another credentials`);
        return;
      });
    };

    return(
      <Layout  style={{ height: "100vh", overflow: "auto" }}>
        {messageContext}
        <Header style={{ color: "white" }}>Login Tracking</Header>
            <Content style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
            <Row gutter={16}>
                 <Col span={10} >
                    <Card title="Login page" style={{ minHeight: 140 }}> 
                    <Row style={{marginBottom: 15 }}>
                        <Typography.Text>Email:</Typography.Text>
                        <Input
                        value={email}
                        onChange={handleEmail}
                        placeholder="Enter your email"
                        />
                    </Row>
                    <Row style={{marginBottom: 15 }}>
                        <Typography.Text>Password:</Typography.Text>
                        <Input
                        value={password}
                        onChange={handlePassword}
                        placeholder="Enter your password"
                        />  
                    </Row>
                    <Row style={{marginBottom: 5 }}>
                        <Button onClick={handleLoginPage}>Login</Button>
                    </Row>
                    <Row>
                        <Typography.Text style={{color: 'red'}}>
                            {messageInstance.error}
                        </Typography.Text>
                        <Typography.Text style={{color: 'green'}}>
                            {messageInstance.success}
                        </Typography.Text>
                    </Row>
                    </Card>
                </Col>
            </Row>
         </Content>
      </Layout>
    )
  }