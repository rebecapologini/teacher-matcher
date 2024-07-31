import React from "react";
import { Card } from "antd";
import CustomButton from "../../components/button/button-component";
import "./home-component.css";
import { RightOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <div className="header">
        <h1>Teacher Matcher</h1>
      </div>
      <div className="content">
        <Card
          className="card hoverable-card"
          cover={
            <div className="image-container">
              <img alt="example" src="https://i.ibb.co/8c68s3M/image.png" />
            </div>
          }
          bordered={true}
          style={{ width: 225, height: 415 }}
        >
          <div className="card-content">
            <h3>Новый способ поиска преподавателей</h3>
            <CustomButton
              type="details"
              text="Подробнее"
              iconAfterText={<RightOutlined />}
            />
          </div>
        </Card>
      </div>
      <div className="buttons">
        <CustomButton
          type="secondary"
          text="Войти"
          block
          onClick={() => navigate("/login")}
        />
        <CustomButton
          type="tertiary"
          text="Регистрация"
          block
          onClick={() => navigate("/register")}
        />
      </div>
    </div>
  );
};

export default Home;
