import React from "react";
// import { Card, Input, Avatar } from "antd";
import { TeacherStepFourData } from "../../../types/profile";
import "./StepOne.css";
interface TeacherStepFourProps {
  data: TeacherStepFourData;
  updateData: (data: TeacherStepFourData) => void;
  next: () => void;
}

const TeacherStepFour: React.FC<TeacherStepFourProps> = ({
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
      <h2>Шаг 4 из 5</h2>
      <div>
        <label>Преподавательский стаж</label>
        <input
          name="teachingExperience"
          value={data.teachingExperience}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ваша Alma mater</label>
        <input
          name="almaMater"
          value={data.almaMater}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ученая степень</label>
        <input
          name="academicDegree"
          value={data.academicDegree}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Факультет</label>
        <input name="faculty" value={data.faculty} onChange={handleChange} />
      </div>
      <div>
        <label>Стоимость урока</label>
        <input
          name="lessonCost"
          value={data.lessonCost}
          onChange={handleChange}
        />
      </div>
      <button onClick={next}>Далее</button>
    </div>
  );
};

export default TeacherStepFour;
