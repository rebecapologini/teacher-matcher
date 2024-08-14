import React from "react";
import { Card, Input } from "antd";
const { TextArea } = Input;
import { StepFiveData } from "../../../types/profile";

import "./StepFive.css";

interface StepFiveProps {
  data: StepFiveData;
  updateData: (data: StepFiveData) => void;
  next: () => void;
}

const StepFive: React.FC<StepFiveProps> = ({ data, updateData }) => {
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateData({ ...data, about: e.target.value });
  };

  return (
    <>
      <h2>Шаг 5 из 5</h2>
      <Card>
        <div className="selects-container">
          <label>
            Расскажите о себе (по желанию)
            <TextArea
              name="about"
              value={data.about || ""}
              onChange={handleDescriptionChange}
              className="custom-input-about"
            />
          </label>
        </div>
      </Card>
    </>
  );
};

export default StepFive;
