import React from "react";
// import { Card, Input, Avatar } from "antd";
import { TeacherStepThreeData } from "../../../types/profile";
import "./StepOne.css";
interface TeacherStepThreeProps {
  data: TeacherStepThreeData;
  updateData: (data: TeacherStepThreeData) => void;
  next: () => void;
}

const TeacherStepThree: React.FC<TeacherStepThreeProps> = ({
  data,
  updateData,
  next,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
  };

  return (
    <div>
      <h2>Шаг 3 из 5</h2>
      <div>
        <label>Выберете компетенцию</label>
        <input
          name="competence"
          value={data.competence}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Уровень владения языком</label>
        <input
          name="languageLevel"
          value={data.languageLevel}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Подтверждающие документы</label>
        <input
          name="documents"
          value={data.documents}
          onChange={handleChange}
        />
      </div>
      <button onClick={next}>Далее</button>
    </div>
  );
};

export default TeacherStepThree;
