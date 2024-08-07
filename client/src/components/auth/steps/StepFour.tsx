import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { StepFourData } from "../../../types/profile";

import "./StepFour.css";
import SexImage from "../../images/sexImage";
import axios from "axios";
import { stringify } from "querystring";
const { Meta } = Card;

interface StepFourProps {
  data: StepFourData;
  updateData: (data: StepFourData) => void;
  next: () => void;
}

const StepFour: React.FC<StepFourProps> = ({ data, updateData }) => {
  const [studentPrice, setStudentPrice] =
    useState<{ id: number; name: string; key_name: string }[]>();

  const [teacherExperience, setTeacherExperience] =
    useState<{ id: number; name: string }[]>();

  const [preferredSex, setPreferredSex] =
    useState<{ id: number; name: string }[]>();

  const [, setForceUpdate] = useState(0);
  const handleComfortChange = (value: number) => {
    updateData({ ...data, preferred_sex_id: value });
    setForceUpdate((f) => f + 1);
  };

  const handleLessonsChange = (value: string) => {
    updateData({ ...data, lessons: value });
    setForceUpdate((f) => f + 1);
  };

  const handlePriceRangeChange = (value: number) => {
    updateData({ ...data, price_id: value });
    setForceUpdate((f) => f + 1);
  };

  const handleExperienceChange = (value: number) => {
    updateData({ ...data, teacher_experience_id: value });
    setForceUpdate((f) => f + 1);
  };

  useEffect(() => {
    async function getLevels() {
      const {
        data: { studentPrice, teacherExperience, preferredSex },
      } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile/step_4`
      );
      console.log("preferredSex", preferredSex);
      setStudentPrice(studentPrice);
      setTeacherExperience(teacherExperience);
      setPreferredSex(preferredSex);
    }

    getLevels();
  }, []);

  return (
    <>
      <h2>Шаг 4 из 5</h2>
      <Card>
        <div className="selects-container">
          <label>Вам комфортнее работать с:</label>
          <div className="comfort-selection">
            {preferredSex?.map((sex) => (
              <Card
                key={sex.id}
                className={`comfort-card ${data.preferred_sex_id === sex.id ? "selected" : ""}`}
                onClick={() => handleComfortChange(sex.id)}
                cover={
                  <SexImage
                    src={`/images/${sex.name}.png`}
                    alt={sex.name}
                    className="comfort-selection-img"
                  />
                }
              />
            ))}
          </div>

          <div>
            <label>Количество уроков в неделю:</label>
            <div className="lessons-selection">
              <Card
                key={`lessons-1-2-${data.lessons === "1-2"}`}
                className={`lessons-card ${data.lessons === "1-2" ? "selected" : ""}`}
                onClick={() => handleLessonsChange("1-2")}
              >
                <Meta title="1-2" />
              </Card>
              <Card
                key={`lessons-3+-${data.lessons === "3+"}`}
                className={`lessons-card ${data.lessons === "3+" ? "selected" : ""}`}
                onClick={() => handleLessonsChange("3+")}
              >
                <Meta title="3 и больше" />
              </Card>
            </div>
          </div>
          <div>
            <label>Выберите ценовой диапазон:</label>
            <div className="price-range-selection">
              {studentPrice?.map((price) => (
                <Card
                  key={price.id}
                  className={`price-range-card ${data.price_id === price.id ? "selected" : ""}`}
                  onClick={() => handlePriceRangeChange(price.id)}
                >
                  <Meta title={price.name} />
                </Card>
              ))}
            </div>
          </div>
          <div>
            <label>Стаж преподавателя:</label>
            <div className="experience-selection">
              {teacherExperience?.map((exp) => (
                <Card
                  key={exp.id}
                  className={`experience-card ${data.teacher_experience_id === exp.id ? "selected" : ""}`}
                  onClick={() => handleExperienceChange(exp.id)}
                >
                  <Meta title={exp.name} />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StepFour;
