import React from "react";
import { Card } from "antd";
import CustomButton from "../../components/button/button-component";
import "./home-component.css";

const Home: React.FC = () => {
  return (
    <div className="welcome-page">
      <div className="header">
        <h1>Teacher Matcher</h1>
      </div>
      <div className="content">
        <Card
          title="Новый способ поиска преподавателей"
          bordered={false}
          style={{ width: 350 }}
        >
          <CustomButton type="primary" text="Подробнее" />
        </Card>
        <div className="buttons">
          <CustomButton type="secondary" text="Войти" block />
          <CustomButton type="tertiary" text="Регистрация" block />
        </div>
      </div>
    </div>
  );
};

export default Home;
