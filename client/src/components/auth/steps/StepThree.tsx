import React, { useEffect, useState } from "react";
import { Card, Select } from "antd";
import { StepThreeData } from "../../../types/profile";

import "./StepThree.css";
import axios from "axios";

interface StepThreeProps {
  data: StepThreeData;
  updateData: (data: StepThreeData) => void;
  next: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ data, updateData }) => {
  const [levels, setLevels] = useState<{ id: number; level: string }[]>([]);
  const [languages, setLanguages] = useState<{ id: number; name: string }[]>(
    []
  );
  const [goals, setGoals] = useState<{ id: number; name: string }[]>([]);

  const handleLanguageChange = (value: number) => {
    updateData({ ...data, language_id: value });
  };

  const handleGoalChange = (value: number) => {
    updateData({ ...data, goal_id: value });
  };

  const handleLevelChange = (value: number) => {
    console.log("level", value);
    updateData({ ...data, level_id: value });
  };

  const handleDurationChange = (value: string) => {
    updateData({ ...data, duration: value });
  };
  useEffect(() => {
    async function getLevels() {
      const {
        data: { levels, languages, goals },
      } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile/levels`
      );
      setLanguages(languages);
      setLevels(levels);
      setGoals(goals);
    }

    getLevels();
  }, []);
  return (
    <>
      <h2>Шаг 3 из 5</h2>
      <Card>
        <div className="selects-container">
          <div>
            <label>
              Какой язык вы хотите изучить?
              <Select
                placeholder="Например, английский"
                style={{ width: "100%" }}
                onChange={handleLanguageChange}
                value={data.language_id || undefined}
                className="custom-select"
              >
                {languages.map((language) => {
                  return (
                    <Select.Option key={language.id} value={language.id}>
                      {language.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </label>
          </div>
          <div>
            <label>
              Цель изучения?
              <Select
                placeholder="Например, подготовка к экзаменам"
                style={{ width: "100%" }}
                onChange={handleGoalChange}
                value={data.goal_id || undefined}
                className="custom-select"
              >
                {goals.map((goal) => {
                  return (
                    <Select.Option key={goal.id} value={goal.id}>
                      {goal.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </label>
          </div>
          <div>
            <label>
              Как вы оцениваете свой уровень?
              <Select
                placeholder="Скоро будет выше:)"
                style={{ width: "100%" }}
                onChange={handleLevelChange}
                value={data.level_id || undefined}
                className="custom-select"
              >
                {levels.map((level) => {
                  return (
                    <Select.Option key={level.id} value={level.id}>
                      {level.level}
                    </Select.Option>
                  );
                })}
              </Select>
            </label>
          </div>
          <div>
            <label>
              Планируемая продолжительность обучения?
              <Select
                placeholder="Выбор только за вами"
                style={{ width: "100%" }}
                onChange={handleDurationChange}
                value={data.duration || undefined}
                className="custom-select"
              >
                <Select.Option value="Месяц">Месяц</Select.Option>
                <Select.Option value="Три месяца">Три месяца</Select.Option>
                <Select.Option value="Полгода">Полгода</Select.Option>
                <Select.Option value="Год">Год</Select.Option>
              </Select>
            </label>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StepThree;
