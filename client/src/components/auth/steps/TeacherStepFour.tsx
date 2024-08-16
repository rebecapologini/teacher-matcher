// @ts-ignore

import React, { useEffect, useState } from "react";
import { Card, Select, Slider, Input, message } from "antd";
import axios from "axios";
import { TeacherStepFourData } from "../../../types/profile";
import "./TeacherStepFour.css";

const { Option } = Select;

interface University {
  id: number;
  title: string;
  city_id: number;
  country_id: number;
  createdAt: string;
  updatedAt: string;
}

interface Faculty {
  id: number;
  title: string;
}

interface TeacherStepFourProps {
  data: TeacherStepFourData;
  updateData: (data: TeacherStepFourData) => void;
  next: () => void;
}

const academicDegrees = ["Бакалавр", "Магистр", "Кандидат наук", "Доктор наук"];

const TeacherStepFour: React.FC<TeacherStepFourProps> = ({
  data,
  updateData,
}) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);

  const [academicDegree, setAcademicDegree] = useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      const url = import.meta.env.VITE_API_BASE_URL;

      try {
        const response = await axios.get(`${url}/getUniversitiesFromDB`);
        if (response.data && Array.isArray(response.data.universities)) {
          setUniversities(response.data.universities);
        }
      } catch (error) {
        message.error("Ошибка при загрузке списка университетов");
      }
    };

    fetchUniversities();
  }, []);

  const handleUniversityChange = async (value: string) => {
    const selectedUniversity = universities.find((uni) => uni.title === value);
    if (selectedUniversity) {
      updateData({
        ...data,
        almaMater: value,
      });

      try {
        const url = import.meta.env.VITE_API_BASE_URL;

        const response = await axios.get(`${url}/getFaculties`, {
          params: { university_id: selectedUniversity.id },
        });

        // Сортировка факультетов по алфавиту
        const sortedFaculties = response.data.response.items.sort(
          (a: Faculty, b: Faculty) => {
            return a.title.localeCompare(b.title);
          }
        );

        console.log(sortedFaculties);
        setAcademicDegree(true);
        setFaculties(sortedFaculties);
      } catch (error) {
        message.error("Ошибка при загрузке списка факультетов");
      }
    }
  };

  const handleFacultyChange = (value: string) => {
    updateData({
      ...data,
      faculty: value,
    });
  };

  const handleAcademicDegreeChange = (value: string) => {
    console.log("academicDegree", value);
    updateData({ ...data, academicDegree: value });
  };

  const handleLessonCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    updateData({ ...data, lessonCost: value });
  };

  return (
    <div className="step-four">
      <h2>Шаг 4 из 5</h2>
      <Card>
        <div className="selects">
          <div className="select-exp">
            <label>
              Сколько лет вы преподаёте?
              <Slider
                className="select-exp-slider"
                min={1}
                max={10}
                marks={{
                  1: " 1",
                  5.5: " 5",
                  10: "10",
                }}
                value={data.teachingExperience}
                onChange={(value) =>
                  updateData({
                    ...data,
                    teachingExperience: value,
                  })
                }
              />
            </label>
          </div>
          <div>
            <label>Ваша Alma mater</label>
            <Select
              className="custom-select"
              placeholder="Выберите университет"
              value={data.almaMater || undefined}
              onChange={handleUniversityChange}
            >
              {universities.map((university) => (
                <Option key={university.id} value={university.title}>
                  {university.title}
                </Option>
              ))}
            </Select>
          </div>
          {academicDegree && (
            <div>
              <label>Факультет</label>
              <Select
                className="custom-select"
                placeholder="Выберите факультет"
                value={data.faculty || undefined}
                onChange={(value) => handleFacultyChange(value)}
              >
                {faculties.map((faculty) => (
                  <Option key={faculty.id} value={faculty.title}>
                    {faculty.title}
                  </Option>
                ))}
              </Select>
            </div>
          )}
          <div>
            <label>Ученая степень</label>
            <Select
              placeholder="Например, магистр"
              className="custom-select"
              value={data.academicDegree || undefined}
              onChange={handleAcademicDegreeChange}
            >
              {academicDegrees.map((degree) => (
                <Option key={degree} value={degree} label={degree}>
                  {degree}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <label>Стоимость урока</label>
            <Input
              className="lesson-cost"
              name="lessonCost"
              value={data.lessonCost}
              onChange={handleLessonCostChange}
              addonAfter="₽"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeacherStepFour;
