import React, { useEffect, useState } from "react";
import { Card, Input, Button } from "antd";
const { TextArea } = Input;
import { TeacherStepFiveData } from "../../../types/profile";
import "./TeacherStepFive.css";
interface TeacherStepFiveProps {
  data: TeacherStepFiveData;
  updateData: (data: TeacherStepFiveData) => void;
  next: () => void;
}
const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const times = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const TeacherStepFive: React.FC<TeacherStepFiveProps> = ({
  data,
  updateData,
}) => {
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
  };
  const [selectedDays, setSelectedDays] = useState<string[]>(
    data.convenientTime?.days || []
  );
  const [selectedTimes, setSelectedTimes] = useState<string[]>(
    data.convenientTime?.times || []
  );

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedItems(
      selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item]
    );
  };
  useEffect(() => {
    updateData({
      ...data,
      convenientTime: {
        days: selectedDays,
        times: selectedTimes,
      },
    });
  }, [selectedDays, selectedTimes]);
  return (
    <div className="step-five">
      <h2>Шаг 5 из 5</h2>
      <Card>
        <div className="selects-containter-five">
          <label>
            Удобное время занятия
            <div className="days-selection">
              {daysOfWeek.map((day) => (
                <Button
                  key={day}
                  type={selectedDays.includes(day) ? "primary" : "default"}
                  onClick={() =>
                    toggleSelection(day, selectedDays, setSelectedDays)
                  }
                >
                  {day}
                </Button>
              ))}
            </div>
            <div className="times-selection">
              {times.map((time) => (
                <Button
                  key={time}
                  type={selectedTimes.includes(time) ? "primary" : "default"}
                  onClick={() =>
                    toggleSelection(time, selectedTimes, setSelectedTimes)
                  }
                >
                  {time}
                </Button>
              ))}
            </div>
          </label>

          <label>
            Расскажи о себе
            <TextArea
              name="aboutYourself"
              value={data.aboutYourself}
              onChange={handleTextAreaChange}
              className="custom-input-about"
            />
          </label>
          <label>
            Ссылка на видеопрезентацию
            <Input
              type="url"
              name="videoPresentation"
              value={data.videoPresentation}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </Card>
    </div>
  );
};

export default TeacherStepFive;
