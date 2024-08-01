import React from "react";
import { Card } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;

interface StepTwoProps {
  data: { role: string };
  updateData: (data: { role: string }) => void;
  next: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ data, updateData }) => {
  const handleSelectRole = (role: string) => {
    updateData({ role });
  };

  return (
    <>
      <h2>Шаг 2 из 5</h2>
      <div className="role-selection">
        <Card
          hoverable
          className={`role-card ${data.role === "student" ? "selected" : ""}`}
          onClick={() => handleSelectRole("student")}
          cover={<img alt="Ученик" src="https://i.ibb.co/0Q7MQ5q/image.png" />}
        >
          {data.role === "student" && (
            <CheckCircleOutlined className="check-icon" />
          )}
          <Meta title="Ученик" />
        </Card>
        <Card
          hoverable
          className={`role-card ${data.role === "teacher" ? "selected" : ""}`}
          onClick={() => handleSelectRole("teacher")}
          cover={<img alt="Учитель" src="https://i.ibb.co/17ft99R/image.png" />}
        >
          {data.role === "teacher" && (
            <CheckCircleOutlined className="check-icon" />
          )}
          <Meta title="Учитель" />
        </Card>
      </div>
    </>
  );
};

export default StepTwo;
