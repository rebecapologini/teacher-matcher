import React, { useEffect, useState } from "react";
import { Select, Card } from "antd";
import { TeacherStepThreeData } from "../../../types/profile";
import UploadFile from "../../../pages/upload-file"; // Обновите путь к компоненту
import "./TeacherStepThree.css";
import axios from "axios";
import "./StepOne.css";

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
  const [languages, setLanguages] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    async function getLevels() {
      const {
        data: { levels, goals, languages },
      } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile/levels`
      );
      setLevels(levels);
      setGoals(goals);
      setLanguages(languages);
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
  const handleLanguageChange = (value: number) => {
    updateData({ ...data, language_id: value });
  };

  return (
    <div className="step-three">
      <h2>Шаг 3 из 5</h2>
      <Card>
        <div className="selects-container">
          <div>
            <label>
              Какой язык вы преподаете?
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
        </div>
      </Card>
    </div>
  );
};

export default TeacherStepThree;
