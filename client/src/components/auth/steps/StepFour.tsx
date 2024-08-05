import React, { useState } from "react";
import { Card } from "antd";
import { StepFourData } from "../../../types/profile";

import "./StepFour.css";
const { Meta } = Card;

interface StepFourProps {
  data: StepFourData;
  updateData: (data: StepFourData) => void;
  next: () => void;
}

const StepFour: React.FC<StepFourProps> = ({ data, updateData }) => {
  const [, setForceUpdate] = useState(0);
  const handleComfortChange = (value: string) => {
    updateData({ ...data, sex: value });
    setForceUpdate((f) => f + 1);
  };

  const handleLessonsChange = (value: string) => {
    updateData({ ...data, lessons: value });
    setForceUpdate((f) => f + 1);
  };

  const handlePriceRangeChange = (value: string) => {
    updateData({ ...data, priceRange: value });
    setForceUpdate((f) => f + 1);
  };

  const handleExperienceChange = (value: string) => {
    updateData({ ...data, experience: value });
    setForceUpdate((f) => f + 1);
  };

  return (
    <>
      <h2>Шаг 4 из 5</h2>
      <Card>
        <div className="selects-container">
          <label>Вам комфортнее работать с:</label>
          <div className="comfort-selection">
            <Card
              key={`man-${data.sex === "man"}`}
              hoverable
              className={`comfort-card ${data.sex === "man" ? "selected" : ""}`}
              onClick={() => handleComfortChange("man")}
              cover={
                <img alt="Мужчина" src="https://i.ibb.co/WsNLzCP/Image.png" />
              }
            >
              <Meta title="Мужчина" className="gender" />
            </Card>
            <Card
              key={`woman-${data.sex === "woman"}`}
              hoverable
              className={`comfort-card ${data.sex === "woman" ? "selected" : ""}`}
              onClick={() => handleComfortChange("woman")}
              cover={
                <img alt="Женщина" src="https://i.ibb.co/X8xYD8t/Image.png" />
              }
            >
              <Meta title="Женщина" className="gender" />
            </Card>
            <Card
              key={`both-${data.sex === "both"}`}
              hoverable
              className={`comfort-card ${data.sex === "both" ? "selected" : ""}`}
              onClick={() => handleComfortChange("both")}
              cover={
                <img alt="Оба пола" src="https://i.ibb.co/RHrnrzt/Image.png" />
              }
            >
              <Meta title="Оба пола" className="gender" />
            </Card>
          </div>

          <div>
            <label>Количество уроков в неделю:</label>
            <div className="lessons-selection">
              <Card
                key={`lessons-1-2-${data.lessons === "1-2"}`}
                hoverable
                className={`lessons-card ${data.lessons === "1-2" ? "selected" : ""}`}
                onClick={() => handleLessonsChange("1-2")}
              >
                <Meta title="1-2" />
              </Card>
              <Card
                key={`lessons-3+-${data.lessons === "3+"}`}
                hoverable
                className={`lessons-card ${data.lessons === "3+" ? "selected" : ""}`}
                onClick={() => handleLessonsChange("3+")}
              >
                <Meta title="3 и больше" />
              </Card>
            </div>
          </div>
          <div>
            <label>Выберите ценовой диапазон:</label>
            <div className="price-range-selection">
              <Card
                key={`price-до2000-${data.priceRange === "до2000"}`}
                hoverable
                className={`price-range-card ${data.priceRange === "до2000" ? "selected" : ""}`}
                onClick={() => handlePriceRangeChange("до2000")}
              >
                <Meta title="до 2000" />
              </Card>
              <Card
                key={`price-до5000-${data.priceRange === "до5000"}`}
                hoverable
                className={`price-range-card ${data.priceRange === "до5000" ? "selected" : ""}`}
                onClick={() => handlePriceRangeChange("до5000")}
              >
                <Meta title="до 5000" />
              </Card>
              <Card
                key={`price-до10000-${data.priceRange === "до10000"}`}
                hoverable
                className={`price-range-card ${data.priceRange === "до10000" ? "selected" : ""}`}
                onClick={() => handlePriceRangeChange("до10000")}
              >
                <Meta title="до 10000" />
              </Card>
            </div>
          </div>
          <div>
            <label>Стаж преподавателя:</label>
            <div className="experience-selection">
              <Card
                key={`experience-1-3года-${data.experience === "1-3года"}`}
                hoverable
                className={`experience-card ${data.experience === "1-3года" ? "selected" : ""}`}
                onClick={() => handleExperienceChange("1-3года")}
              >
                <Meta title="1-3 года" />
              </Card>
              <Card
                key={`experience-5-10лет-${data.experience === "5-10лет"}`}
                hoverable
                className={`experience-card ${data.experience === "5-10лет" ? "selected" : ""}`}
                onClick={() => handleExperienceChange("5-10лет")}
              >
                <Meta title="5-10 лет" />
              </Card>
              <Card
                key={`experience->10лет-${data.experience === ">10лет"}`}
                hoverable
                className={`experience-card ${data.experience === ">10лет" ? "selected" : ""}`}
                onClick={() => handleExperienceChange(">10лет")}
              >
                <Meta title="> 10 лет" />
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StepFour;
