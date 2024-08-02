import React from "react";
import { Card, Input } from "antd";
import { StepFiveData } from "../../../types/profile";

const { TextArea } = Input;

interface StepFiveProps {
  data: StepFiveData;
  updateData: (data: StepFiveData) => void;
  next: () => void;
}

const StepFive: React.FC<StepFiveProps> = ({ data, updateData }) => {
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateData({ ...data, description: e.target.value });
  };

  return (
    <>
      <h2>Шаг 5 из 5</h2>
      <Card>
        <div className="selects-container">
          <label>
            Расскажите о себе (по желанию)
            <TextArea
              name="description"
              value={data.description || ""}
              onChange={handleDescriptionChange}
              className="custom-input"
              style={{
                marginTop: "20px",
                minHeight: "260px",
                borderRadius: "20px",
              }}
            />
          </label>
        </div>
      </Card>
    </>
  );
};

export default StepFive;
