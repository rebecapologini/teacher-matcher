import React, { useEffect, useState } from "react";
import { Select, Card } from "antd";
import { TeacherStepThreeData } from "../../../types/profile";
import "./StepOne.css";
import axios from "axios";

const { Option } = Select;

interface TeacherStepThreeProps {
  data: TeacherStepThreeData;
  updateData: (data: TeacherStepThreeData) => void;
  next: () => void;
}

const TeacherStepThree: React.FC<TeacherStepThreeProps> = ({
  data,
  updateData,
}) => {
  const handleCompetenceChange = (selectedCompetencies: number[]) => {
    updateData({ ...data, competence: selectedCompetencies });
  };

  const handleLanguageLevelChange = (selectedLevel: string) => {
    updateData({ ...data, languageLevel: selectedLevel });
  };
  const [levels, setLevels] = useState<{ id: number; level: string }[]>([]);
  const [goals, setGoals] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function getLevels() {
      const {
        data: { levels, goals },
      } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile/levels`
      );
      setLevels(levels);
      setGoals(goals);
    }

    getLevels();
  }, []);

  return (
    <div className="step-three">
      <h2>Шаг 3 из 5</h2>
      <Card>
        <div className="selects-container">
          <div>
            <label>Выберите компетенции</label>
            <Select
              mode="multiple"
              placeholder="Выберите компетенции"
              value={data.competence}
              onChange={handleCompetenceChange}
              className="custom-select"
            >
              {goals.map((competence) => (
                <Option key={competence.id} value={competence.id}>
                  {competence.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <label>Уровень владения языком</label>
            <Select
              placeholder="Выберите уровень владения языком"
              value={data.languageLevel}
              onChange={handleLanguageLevelChange}
              className="custom-select"
            >
              {levels.map((level) => (
                <Option key={level.id} value={level.id}>
                  {level.level}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <label>Подтверждающие документы</label>
            <input type="file" multiple className="custom-file-input" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeacherStepThree;
