import React, { useEffect, useState } from "react";
import { Card, Avatar, Input, Button, Form, notification, Select } from "antd";
import axios from "axios";
import styles from './studentstyles.module.css';
import ImageUpdate from '../../pages/ImageUpdate';
import SexImage from "../images/sexImage";
const { TextArea } = Input;
const { Meta } = Card
interface Level {
    id: number;
    title: string;
}


const StudentProfile: React.FC = () => {
 const [profileData, setProfileData] = useState<any>({});
   const [levels, setLevels] = useState<Level[]>([]);
   const [editing, setEditing] = useState<boolean>(false);
    const [isImageUpdated, setIsImageUpdated] = useState(false);
    const [preferredSex, setPreferredSex] =
    useState<{ id: number; name: string }[]>();
    const [studentPrice, setStudentPrice] =
    useState<{ id: number; name: string; key_name: string }[]>();
    useEffect(() => {
        const getStudent = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/api/profile/studentprofile`);
                setProfileData(data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchLevels = async () => {
            const url = import.meta.env.VITE_API_BASE_URL
            try {
                const response = await axios.get(`${url}/getLevels`)
                if (response.data && Array.isArray(response.data.levels)) {
                    setLevels(response.data.levels)
                }
            } catch (error) {
                console.error('Ошибка при загрузке уровней')
            }
        }
        getStudent();
        fetchLevels()
    }, [isImageUpdated]);

    useEffect(() => {
        async function getLevels() {
          const {
            data: { studentPrice, preferredSex},
          } = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/profile/step_4`
          );
          setStudentPrice(studentPrice);
          setPreferredSex(preferredSex)
        }
    
        getLevels();
      }, []);

    const handleLessonsChange = (value: string) => {
        setProfileData(prev => ({ ...prev, lessons: value }));
    };
    
    const handlePriceRangeChange = (id: number) => {
        setProfileData(prev => ({ ...prev, price: id }));
    };
    const handleComfortChange = (value: number) => {
        setProfileData(prev => ({...prev, preferred_sex_id: value}))
    }
    const handleSave = async (values: any) => {
        const newData = { ...profileData }

        console.log("PROFDATA", profileData)
        try {
            await axios.put(`http://localhost:4000/api/profile/studentprofileupdate`, newData);
            notification.success({
                message: 'Успех',
                description: 'Ваши изменения были сохранены.',
            });
            setEditing(false);
            // Обновляем данные профиля после сохранения
            const { data } = await axios.get(`http://localhost:4000/api/profile/studentprofile`);
            setProfileData(data);
        } catch (error) {
            notification.error({
                message: 'Ошибка',
                description: 'Необходимо выбрать все пункты!',
            });
        }
    };

    return (
        <>
            <h2>Мой профиль</h2>
            <Card className={styles.profileCard}>
                <div className={styles.avatar}>
                    <Form.Item>
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
                </div>
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
                                    value={profileData.age || ""}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, age: e.target.value }))}
                                />
                            </Form.Item>
                            <h4>Уровень знания языка</h4>
                            <Form.Item className={styles.formcustomm} name="level">
                                <Select
                                    className="custom-select"
                                    value={profileData.level_id || ""}
                                    onChange={(value) => setProfileData(prev => ({ ...prev, level: value }))}
                                >
                                    {levels.map(level => (
                                        <Select.Option key={level.id} value={level.id}>
                                            {level.level}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <h4>Планируемая длительность обучения</h4>
                            <Form.Item className={styles.formcustom} name="duration">
                                <Select
                                    placeholder="Выбор только за вами"
                                    style={{ width: "100%" }}
                                    onChange={(value) => setProfileData(prev => ({ ...prev, duration: value }))}
                                    value={profileData.duration || undefined}
                                    className="custom-select"
                                >
                                    <Select.Option value="Месяц">Месяц</Select.Option>
                                    <Select.Option value="Три месяца">Три месяца</Select.Option>
                                    <Select.Option value="Полгода">Полгода</Select.Option>
                                    <Select.Option value="Год">Год</Select.Option>
                                </Select>
                            </Form.Item>
                            <h4>Комфортней работать с</h4>
                            <Form.Item className={styles.formcustom} name="prefsex">
                            <div className="comfort-selection">
                                    {preferredSex?.map((sex) => (
                                    <Card
                                        key={sex.id}
                                        className={`comfort-card ${profileData.preferred_sex_id === sex.id ? "selected" : ""}`}
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
                            </Form.Item>
                            
                            <h4>Количество уроков в неделю</h4>
                            <Form.Item className={styles.formcustom} name="lessons">
                                <div className={styles["lessons-selection"]}>
                                    <Card
                                        key={`lessons-1-2-${profileData.lessons === "1-2"}`}
                                        className={`${styles["lessons-card"]} ${profileData.lessons === "1-2" ? styles["selected"] : ""}`}
                                        onClick={() => handleLessonsChange("1-2")}
                                        id="card1"
                                    >
                                        <Meta title="1-2" />
                                    </Card>
                                    <Card
                                        key={`lessons-3+-${profileData.lessons === "3+"}`}
                                        className={`${styles["lessons-card"]} ${profileData.lessons === "3+" ? styles["selected"] : ""}`}
                                        onClick={() => handleLessonsChange("3+")}
                                        id="card2"
                                    >
                                        <Meta title="3 и больше" />
                                    </Card>
                                </div>
                            </Form.Item>
                            <h4>Выберите ценовой диапазон</h4>
                            <Form.Item  name="price">
                                <div className={styles["price-range-selection"]}>
                                    {studentPrice?.map((price) => (
                                        <Card
                                            key={price.id}
                                            className={`${styles["price-range-card"]} ${profileData.price === price.id ? styles["selected"] : ""}`}
                                            onClick={() => handlePriceRangeChange(price.id)}
                                        >
                                            <Meta title={price.name} />
                                        </Card>
                                    ))}
                                </div>
                            </Form.Item>
                            <h4>Стаж преподавателя</h4>
                            <Form.Item className={styles.formcustom} name="teacherExperience">
                                <Input
                                    className={styles["info-box"]}
                                    value={profileData.teacherExperience || ""}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, teacherExperience: e.target.value }))}
                                />
                            </Form.Item>
                            <h4>О себе</h4>
                            <Form.Item className={styles.formcustom} name="about">
                                <TextArea
                                    className={styles["info-box"]}
                                    rows={4}
                                    value={profileData.about || ""}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
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
                            <div className={styles.namemail}>
                                <div className={styles["student-name"]}>
                                    {`${profileData.name} ${profileData.surname}, ${profileData.age}`}
                                </div>
                                <div className={styles.email}>{profileData.email}</div>
                                <div>
                                </div>
                                <h4>Язык изучения</h4>
                                <div className={styles["info-box"]}>Английский</div>
                            </div>
                            <div>
                                <h4>Уровень знания языка</h4>
                                <div className={styles["info-box"]}>{profileData.level}</div>
                            </div>
                            <div>
                                <h4>Планируемая длительность обучения</h4>
                                <div className={styles["info-box"]}>{profileData.duration}</div>
                            </div>
                            <div>
                                <h4>Комфортней работать с</h4>
                                  <div className={styles["sex-box"]}>
                                    <Card
                                        className={`sex-box`}

                                        cover={
                                        <SexImage
                                            src={`/images/${profileData.sex}.png`}
                                            alt={''}
                                            className="comfort-selection-img"/>
                                        }
                                    /></div>
                            </div>
                            <div>
                                <h4>Количество уроков в неделю</h4>
                                <div className={styles["info-box"]}>{profileData.lessons}</div>
                            </div>
                            <div>
                                <h4>Ценовой диапазон</h4>
                                <div className={styles["info-box"]}>{profileData.price}</div>
                            </div>
                            <div>
                                <h4>Стаж преподавателя</h4>
                                <div className={styles["info-box"]}>{profileData.teacherExperience}</div>
                            </div>
                            <div>
                                <h4>О себе</h4>
                                <div className={styles["info-box"]}>{profileData.about}</div>
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

export default StudentProfile;
