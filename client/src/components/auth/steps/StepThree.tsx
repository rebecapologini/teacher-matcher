import React from "react";
import { Card, Select } from "antd";
import { StepThreeData } from "../../../types/profile";

import "./StepThree.css";

interface StepThreeProps {
  data: StepThreeData;
  updateData: (data: StepThreeData) => void;
  next: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ data, updateData }) => {
  const handleLanguageChange = (value: string) => {
    updateData({ ...data, language: value });
  };

  const handleGoalChange = (value: string) => {
    updateData({ ...data, goal: value });
  };

  const handleLevelChange = (value: string) => {
    updateData({ ...data, level: value });
  };

  const handleDurationChange = (value: string) => {
    updateData({ ...data, duration: value });
  };

  return (
    <>
      <h2>Шаг 3 из 5</h2>
      <Card>
        <div className="selects-container">
          <div>
            <label>
              Какой язык вы хотите изучить?
              <Select
                defaultValue="Английский"
                style={{ width: "100%" }}
                onChange={handleLanguageChange}
                value={data.language || "Английский"}
                className="custom-select"
              >
                <Select.Option value="Английский">Английский</Select.Option>
                <Select.Option value="Испанский">Испанский</Select.Option>
                <Select.Option value="Французский">Французский</Select.Option>
                <Select.Option value="Немецкий">Немецкий</Select.Option>
                <Select.Option value="Китайский">Китайский</Select.Option>
              </Select>
            </label>
          </div>
          <div>
            <label>
              Цель изучения?
              <Select
                defaultValue="Саморазвитие"
                style={{ width: "100%" }}
                onChange={handleGoalChange}
                value={data.goal || "Саморазвитие"}
                className="custom-select"
              >
                <Select.Option value="Работа">Работа</Select.Option>
                <Select.Option value="Путешествия">Путешествия</Select.Option>
                <Select.Option value="Образование">Образование</Select.Option>
                <Select.Option value="Саморазвитие">Саморазвитие</Select.Option>
              </Select>
            </label>
          </div>
          <div>
            <label>
              Как вы оцениваете свой уровень?
              <Select
                defaultValue="Начинающий"
                style={{ width: "100%" }}
                onChange={handleLevelChange}
                value={data.level || "Начинающий"}
                className="custom-select"
              >
                <Select.Option value="Начинающий">Начинающий</Select.Option>
                <Select.Option value="Элементарный">Элементарный</Select.Option>
                <Select.Option value="Средний">Средний</Select.Option>
                <Select.Option value="Продвинутый">Продвинутый</Select.Option>
                <Select.Option value="Профессиональный">
                  Профессиональный
                </Select.Option>
              </Select>
            </label>
          </div>
          <div>
            <label>
              Планируемая продолжительность обучения?
              <Select
                defaultValue="Год"
                style={{ width: "100%" }}
                onChange={handleDurationChange}
                value={data.duration || "Год"}
                className="custom-select"
              >
                <Select.Option value="Месяц">Месяц</Select.Option>
                <Select.Option value="Пол года">Пол года</Select.Option>
                <Select.Option value="Год">Год</Select.Option>
                <Select.Option value="2 года">2 года</Select.Option>
                <Select.Option value="5 лет">5 лет</Select.Option>
              </Select>
            </label>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StepThree;
