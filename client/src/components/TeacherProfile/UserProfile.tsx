import React, { useEffect, useState } from "react";
import { Card, Avatar, Input, Button, Form, notification, Select, Slider } from "antd";
import axios from "axios";
import styles from "./UserProfile.module.css";
import UploadFile from '../../pages/upload-file';
const { TextArea } = Input;
const { Option } = Select;

import ImageUpdate from '../../pages/ImageUpdate'
import { useFetchUserQuery } from "../../features/auth/auth-api-slice";
interface University {
  id: number;
  title: string;
}

interface Faculty {
  id: number;
  title: string;
}

interface Competence {
  id: number;
  name: string;
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

const UserProfile: React.FC = () => {
  const teacherid = useFetchUserQuery();


  const [profileData, setProfileData] = useState<any>({});
  const [universities, setUniversities] = useState<University[]>([]);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState<number | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<{
    [day: string]: string[];
  }>({})
    ;

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/profile/userprofile`);
        setProfileData(data);
        setSelectedUniversityId(data.universityId || null);
        setFileName(data.documents || "");
        if (data.convenientTime) {
          setSelectedTimes(data.convenientTime);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных профиля", error);
      }
    };

    const fetchUniversities = async () => {
      const url = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await axios.get(`${url}/getUniversitiesFromDB`);
        if (response.data && Array.isArray(response.data.universities)) {
          setUniversities(response.data.universities);
        }
      } catch (error) {
        console.error("Ошибка при загрузке списка университетов", error);
      }
    };


    getUser();
    fetchUniversities();

  }, [isImageUpdated]);

  useEffect(() => {
    const fetchFaculties = async () => {
      if (selectedUniversityId) {
        const url = import.meta.env.VITE_API_BASE_URL;
        try {
          const response = await axios.get(`${url}/getFaculties`, {
            params: { university_id: selectedUniversityId },
          });
          setFaculties(response.data.response.items || []);
        } catch (error) {
          console.error("Ошибка при загрузке списка факультетов", error);
        }
      }
    };

    fetchFaculties();
  }, [selectedUniversityId]);

  const [goals, setGoals] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    const fetchGoals = async () => {
      const url = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await axios.get(`${url}/profile/getGoals`);
        setGoals(response.data.goals);
      } catch (error) {
        console.error('Failed to fetch goals', error);
      }
    }
    fetchGoals();
  }, []);

  const handleUniversityChange = (value: string) => {
    const universityId = universities.find((uni) => uni.title === value)?.id || null;
    setSelectedUniversityId(universityId);
    setProfileData(prevData => ({ ...prevData, almaMater: value }));
  };

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
        return updatedTimes;
      });
    }
  };

  const handleCompetencyChange = (value: string[]) => {
    setProfileData(prev => ({ ...prev, goals: value }));
  };

  const handleFacultyChange = (value: string) => {
    setProfileData(prevData => ({ ...prevData, faculty: value }));
  };


  const handleFileUploadComplete = (fileName: string) => {
    setFileName(fileName);
    setProfileData(prevData => ({ ...prevData, documents: fileName }));

  };

  const handleFileRemove = () => {
    setFileName("");
    setProfileData(prevData => ({ ...prevData, documents: "" }));
  };

  const handleSave = async (values: any) => {
    const updatedProfileData = { ...profileData, convenientTime: selectedTimes };

    try {
      await axios.put(`http://localhost:4000/api/profile/update`, updatedProfileData);
      notification.success({
        message: 'Успех',
        description: 'Ваши изменения были сохранены.',
      });
      setEditing(false);
      // После успешного сохранения обновите данные профиля
      const { data } = await axios.get(`http://localhost:4000/api/profile/userprofile`);
      setProfileData(data);
      setFileName(data.documents || "");
      setSelectedTimes(data.convenientTime || {});
      console.log(data)
    } catch (error) {
      notification.error({
        message: 'Ошибка',
        description: 'Не удалось сохранить изменения.',
      });
    }
  };

  return (
    <>
      <h2>Мой профиль</h2>
      <Card className={styles.profileCard}>
        <div className={styles.avatar}>
          <Form.Item >
            <ImageUpdate
              CustomClassName={editing ? 'editing' : 'imager'}
              onUploadComplete={async (fileName) => {
                setProfileData(prev => ({ ...prev, picture_link: fileName }));
                setIsImageUpdated(prev => !prev); // Обновляем состояние
              }}
              onRemove={async () => {
                setProfileData(prev => ({ ...prev, picture_link: "" }));
                setIsImageUpdated(prev => !prev); // Обновляем состояние
              }}


            />
          </Form.Item>
          {profileData.picture_link && (
            <Avatar
              size={128}
              src={
                profileData.picture_link
                  ? `http://localhost:4000${profileData.picture_link}`
                  : "http://localhost:4000/uploads/default-avatar.svg"
              }
              className={styles["custom-avatar"]}
            />
          )}
        </div>
        <div className={styles["profile-content"]}>
          {editing ? (
            <Form
              layout="vertical"
              initialValues={profileData}
              onFinish={handleSave}
            >
              <h4>Имя</h4>
              <Form.Item className={styles.formcustom} name="name">
                <Input
                  className={styles["info-box"]}
                  value={profileData.name || ""}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                />
              </Form.Item>
              <h4>Фамилия</h4>
              <Form.Item className={styles.formcustom} name="surname">
                <Input
                  className={styles["info-box"]}
                  value={profileData.surname || ""}
                  onChange={(e) => setProfileData(prev => ({ ...prev, surname: e.target.value }))}
                />
              </Form.Item>
              <h4>Возраст</h4>
              <Form.Item className={styles.formcustom} name="age">
                <Input
                  className={styles["info-box"]}
                  type="number"
                  value={profileData.age || ""}
                  onChange={(e) => setProfileData(prev => ({ ...prev, age: e.target.value }))}
                />
              </Form.Item>
              <div className="select-day">
                <h4>Выберите день недели:</h4>
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
                <h4>Выберите время:</h4>
                {timesList.map((time) => (
                  <Button
                    className={styles.customTime}
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
              <h4>Компетенции</h4>
              <Form.Item name="competence">
                <Select
                  mode="multiple"
                  className="custom-select"
                  value={profileData.goals}
                  onChange={handleCompetencyChange}
                >
                  {goals.map((competence) => (
                    <Option key={competence.id} value={competence.name}>
                      {competence.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <h4>Срок преподавания</h4>
              <Form.Item className={styles.formcustom} name="teachingExperience">
                <Slider
                  className={styles["select-exp-slider"]}
                  min={1}
                  max={10}
                  marks={{
                    1: "1",
                    5: "5",
                    10: "10",
                  }}
                  value={profileData.teachingExperience}
                  onChange={(value) =>
                    setProfileData(prev => ({ ...prev, teachingExperience: value }))
                  }
                />
              </Form.Item>
              <h4>Университет</h4>
              <Form.Item >
                <Select
                  className="custom-select"
                  placeholder="Выберите университет"
                  value={profileData.almaMater || ""}
                  onChange={handleUniversityChange}
                >
                  {universities.map((university) => (
                    <Option key={university.id} value={university.title}>
                      {university.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {selectedUniversityId && (
                <Form.Item label='Факультет' >
                  <Select
                    className="custom-select"
                    placeholder="Выберите факультет"
                    value={profileData.faculty || ""}
                    onChange={handleFacultyChange}
                  >
                    {faculties.map((faculty) => (
                      <Option key={faculty.id} value={faculty.title}>
                        {faculty.title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
              <h4>О себе</h4>
              <Form.Item className={styles.formcustom} name="description">
                <TextArea
                  className={styles["info-box"]}
                  rows={1}
                  value={profileData.description || ""}
                  onChange={(e) => setProfileData(prev => ({ ...prev, aboutYourself: e.target.value }))}
                />
              </Form.Item>
              <Form.Item className="formcustom" label="Ученая степень" name="academicDegree">
                <Select
                  className="custom-select"
                  value={profileData.academicDegree}
                  onChange={(value) => setProfileData(prev => ({ ...prev, academicDegree: value }))}
                >
                  {["Бакалавр", "Магистр", "Кандидат наук", "Доктор наук"].map(degree => (
                    <Option key={degree} value={degree}>{degree}</Option>
                  ))}
                </Select>
              </Form.Item>
              <h4>Стоимость урока в рублях</h4>
              <Form.Item className={styles.priceCustom} name="lessonCost">
                <Input
                  className={styles["info-box"]}
                  value={profileData.lessonCost || ""}
                  onChange={(e) => setProfileData(prev => ({ ...prev, lessonCost: e.target.value }))}
                />
              </Form.Item>
              <h4>Документы</h4>
              <Form.Item className={styles.formcustomFile} label="">
                <UploadFile
                  onUploadComplete={handleFileUploadComplete}
                  onFileRemove={handleFileRemove}
                  CustomClassName='customFile'
                />
                {fileName && (
                  <div className={styles.customFileR}>
                    <span>{fileName}</span>
                  </div>
                )}
              </Form.Item>
              <h4>Ссылка на видеопрезентацию</h4>
              <Form.Item className="formcustom" name="videoPresentation">
                <Input
                  className={styles["info-box"]}
                  value={profileData.videoPresentation || ""}
                  onChange={(e) => setProfileData(prev => ({ ...prev, videoPresentation: e.target.value }))}
                />
              </Form.Item>
              <Form.Item>
                <Button className={styles.saveButton} type="primary" htmlType="submit">
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <>
              <div className={styles["teacher-name"]}>
                {`${profileData.name} ${profileData.surname}, ${profileData.age}`}
              </div>
              <div className={styles.email}>{profileData.email}</div>
              <div className={styles["competence-box"]}>
                <h4>Компетенция</h4>
                <div className={styles["info-box"]}>
                  <div className="competences">
                    {profileData.goals &&
                      profileData.goals.map((goal: any, index: number) => (
                        <div key={index}>{goal.name}</div>
                      ))}
                  </div>
                </div>
              </div>
              <div>
                <h4>Подтверждающие документы</h4>
                <div className={styles["info-box"]}>
                  {profileData.documents}
                </div>
              </div>
              <div>
                <h4>Срок преподавания</h4>
                <div className={styles["info-box"]}>
                  {profileData.teachingExperience}
                </div>
              </div>
              <div>
                <h4>Ученая степень</h4>
                <div className={styles["info-box"]}>
                  {profileData.academicDegree}
                </div>
              </div>
              <div>
                <h4>Ваша Alma mater</h4>
                <div className={styles["info-box"]}>
                  {profileData.almaMater}
                </div>
              </div>
              <div>
                <h4>Ваш факультет</h4>
                <div className={styles["info-box"]}>
                  {profileData.faculty}
                </div>
              </div>
              <div>
                <h4>Стоимость урока</h4>
                <div className={styles["info-box"]}>
                  {profileData.lessonCost}
                </div>
              </div>
              <div>
                <h4>Удобное время</h4>
                {profileData.convenientTime && Object.keys(profileData.convenientTime).map((day, index) => {
                  const times = profileData.convenientTime[day];
                  if (times.length === 0) {
                    return null; // Пропускаем дни, для которых не выбрано время
                  }
                  return (
                    <div key={index} className={styles["info-box"]}>
                      <strong>{day}:</strong> {times.join(", ")}
                    </div>
                  );
                })}
              </div>
              <div>
                <h4>О себе</h4>
                <div className={styles["info-box"]}>
                  {profileData.aboutYourself}
                </div>
              </div>
              <div>
                <h4>Ссылка на видеопрезентацию</h4>
                <div className={styles["info-box"]}>{profileData.videoPresentation}</div>
              </div>
            </>
          )}
        </div>
      </Card>
      {!editing && (
        <Button className={styles.edit} type="primary" onClick={() => setEditing(true)}>Редактировать</Button>
      )}
    </>
  );
};

export default UserProfile;
