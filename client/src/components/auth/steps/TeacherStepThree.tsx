import React from "react";
import { Select, Card } from "antd";
import { Select, Card } from "antd";
import { TeacherStepThreeData } from "../../../types/profile";
import UploadFile from "../../../pages/upload-file"; // Обновите путь к компоненту
import "./StepOne.css";
import "./StepThree.css";
import './TeacherStepThree.css'

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

  const handleUploadComplete = (fileName: string) => {
    updateData({ ...data, documents: fileName });
  };

  const handleRemoveFile = () => {
    updateData({ ...data, documents: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
  };

  return (
    <div className="step-three">
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
          <div className="docs">
          <UploadFile 
            onUploadComplete={handleUploadComplete} 
            onRemove={handleRemoveFile} 
          />
        </div>
          <input
            name="documents"
            value={data.documents}
            onChange={handleChange}
            readOnly
            className="document-input"
          />
        </div>
      </Card>
    </div>
  );
};

export default TeacherStepThree;
