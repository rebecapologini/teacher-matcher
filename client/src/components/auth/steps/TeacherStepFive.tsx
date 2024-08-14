import React, { useState, useEffect } from "react";
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
const timesList = [
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
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<{
    [day: string]: string[];
  }>({});
  const [aboutMe, setAboutMe] = useState<string>(data.aboutYourself || "");
  const [videoLink, setVideoLink] = useState<string>(
    data.videoPresentation || ""
  );

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };

  const handleTimeClick = (time: string) => {
    if (selectedDay) {
      setSelectedTimes((prevSelectedTimes) => {
        const dayTimes = prevSelectedTimes[selectedDay] || [];
        const updatedTimes = {
          ...prevSelectedTimes,
          [selectedDay]: dayTimes.includes(time)
            ? dayTimes.filter((t) => t !== time)
            : [...dayTimes, time],
        };
        updateData({ ...data, convenientTime: updatedTimes });
        return updatedTimes;
      });
    }
  };

  const handleAboutMeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setAboutMe(value);
    updateData({ ...data, aboutYourself: value });
  };

  const handleVideoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVideoLink(value);
    updateData({ ...data, videoPresentation: value });
  };

  useEffect(() => {
    updateData({
      ...data,
      convenientTime: selectedTimes,
      aboutYourself: aboutMe,
      videoPresentation: videoLink,
    });
  }, [selectedTimes, aboutMe, videoLink]);

  return (
    <div className="step-five">
      <h2>Шаг 5 из 5</h2>
      <Card>
        <div className="select-day">
          <label>Выберите день недели:</label>
          <div className="days-container">
            {daysOfWeek.map((day) => (
              <Button
                key={day}
                type={selectedDay === day ? "primary" : "default"}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
        <div className="select-time">
          <label>Выберите время:</label>
          <div className="times-container">
            {timesList.map((time) => (
              <Button
                key={time}
                type={
                  selectedDay && selectedTimes[selectedDay]?.includes(time)
                    ? "primary"
                    : "default"
                }
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="about-me">Расскажите о себе</label>
          <TextArea
            id="about-me"
            value={aboutMe}
            onChange={handleAboutMeChange}
            rows={4}
            className="custom-input-about"
          />
        </div>
        <div className="input-container">
          <label htmlFor="video-link">Ссылка на видеопрезентацию</label>
          <Input
            id="video-link"
            value={videoLink}
            onChange={handleVideoLinkChange}
            className="custom-input"
          />
        </div>
      </Card>
    </div>
  );
};

export default TeacherStepFive;
