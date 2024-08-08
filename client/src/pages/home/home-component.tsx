import React, { useEffect } from "react";
import { Card } from "antd";
import CustomButton from "../../components/button/button-component";
import "./home-component.css";
import { RightOutlined } from "@ant-design/icons";

import Header from "../../components/header/header-component.tsx";
import { useNavigate } from "react-router-dom";
import { useFetchUserQuery } from "../../features/auth/auth-api-slice.ts";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome-page">
      <Header />
      <div className="content">
        <Card
          className="card hoverable-card"
          cover={
            <div className="image-container" style={{ marginLeft: 25 + "px" }}>
              <img alt="example" src="https://i.ibb.co/8c68s3M/image.png" />
            </div>
          }
          bordered={true}
          style={{ width: 250, height: 415 }}
        >
          <div className="card-content">
            <h3>Новый способ поиска преподавателей</h3>
            <CustomButton
              type="details"
              text="Подробнее"
              iconAfterText={<RightOutlined />}
              disabled={false}
            />
          </div>
        </Card>
      </div>
      <div className="buttons">
        <CustomButton
          type="secondary"
          text="Войти"
          block
          onClick={() => navigate("/auth?form=login")}
          disabled={false}
        />
        <CustomButton
          type="tertiary"
          text="Регистрация"
          block
          onClick={() => navigate("/auth?form=register")}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default Home;
