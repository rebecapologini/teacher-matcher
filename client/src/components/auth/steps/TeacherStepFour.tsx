import React from "react";
import { Slider, Select } from "antd";
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
        <label>Сколько лет вы преподаёте?</label>
        <Slider
          min={1}
          max={10}
          marks={{
            1: "1 год",
            5: "5 лет",
            10: "10 лет",
          }}
          value={data.teachingExperience}
          onChange={(value) =>
            updateData({ ...data, teachingExperience: value })
          }
        />
      </div>
      <div>
        <label>
          Ваша Alma mater
          <Select
            // defaultValue="Английский"
            onChange={handleChange}
            // value={"МГУ"}
            className="custom-select"
          >
            {/* <Select.Option value=""></Select.Option> */}
          </Select>
        </label>
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
