import React, { useEffect, useState } from "react";
import { Select, Card } from "antd";
import { TeacherStepThreeData } from "../../../types/profile";
import UploadFile from "../../../pages/upload-file"; // Обновите путь к компоненту
import "./StepOne.css";
import axios from "axios";
import "./StepThree.css";
import "./TeacherStepThree.css";

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

  const handleClickOnInput = () => {
    const uploadIconContainer = document.querySelector(
      ".upload-icon-container"
    ) as HTMLElement;
    if (uploadIconContainer) {
      uploadIconContainer.click();
    }
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
            className="language-level-select"
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
            onClick={handleClickOnInput}
          />
        </div>
      </Card>
    </div>
  );
};

export default TeacherStepThree;
