import React from "react";
import { Select, Card } from "antd";
import { TeacherStepThreeData } from "../../../types/profile";
import "./StepOne.css";

const { Option } = Select;

interface TeacherStepThreeProps {
  data: TeacherStepThreeData;
  updateData: (data: TeacherStepThreeData) => void;
  next: () => void;
}

const competencies = [
  "Подготовка к ЕГЭ",
  "Общий Английский",
  "Английский для путешествия",
];

const languageLevels = [
  "A1 - Начальный",
  "A2 - Элементарный",
  "B1 - Средний",
  "B2 - Средне-продвинутый",
  "C1 - Продвинутый",
  "C2 - Владение в совершенстве",
];

const TeacherStepThree: React.FC<TeacherStepThreeProps> = ({
  data,
  updateData,
}) => {
  const handleCompetenceChange = (selectedCompetencies: string[]) => {
    updateData({ ...data, competence: selectedCompetencies });
  };

  const handleLanguageLevelChange = (selectedLevel: string) => {
    updateData({ ...data, languageLevel: selectedLevel });
  };

  return (
    <div className="step-four">
      <h2>Шаг 3 из 5</h2>
      <Card>
        <div>
          <label>Выберите компетенции</label>
          <Select
            mode="multiple"
            placeholder="Выберите компетенции"
            value={data.competence}
            onChange={handleCompetenceChange}
            className="competence-select"
          >
            {competencies.map((competence) => (
              <Option key={competence} value={competence}>
                {competence}
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
            className="language-level-select"
          >
            {languageLevels.map((level) => (
              <Option key={level} value={level}>
                {level}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <label>Подтверждающие документы</label>
        </div>
      </Card>
    </div>
  );
};

export default TeacherStepThree;
