//@ts-ignore

import React, { useRef, useEffect, useState } from "react";
import Header from "../header/header-component";
import axios from "axios";
import { useFetchUserQuery } from "../../features/auth/auth-api-slice";
import { Avatar, Button, Card, Tabs } from "antd";
import "./StudentProfile.css";

const StudentProfile: React.FC = () => {
  const abcd = useFetchUserQuery();
  const [showRequests, setShowRequests] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [pageShown, setPageShown] = useState("1");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const {
          data: { teachers },
        } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/matching/profile`,
          { id: abcd.data.id }
        );

        setTeachers(teachers);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const onTabsChange = (id: string) => {
    setPageShown(id);
  };
  const items = [
    {
      key: "1",
      label: "Одобренные заявки",
    },
  ];
  const declension = ["год", "года", "лет"];

  function plural(number: number, titles: string[]) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }
  return (
    <div className="main_container">
      <Header showBack={true} />
      <div className="requests-types">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onTabsChange}
          className="real-tabs"
        />
      </div>

      {pageShown === "1" &&
        teachers.map((student) => (
          <Card className="requests_card" key={student.id}>
            <div className="student_title">
              {`${student.name} ${student.surname}, ${student.age} ${plural(student.age, declension)}`}
            </div>
            <div className="info_block_container">
              <div className="info_block">
                {student?.picture_link && (
                  <div className="avatar">
                    {student.picture_link && (
                      <Avatar
                        size={64}
                        src={`${import.meta.env.VITE_API_BASE_URL_SECOND}${student.picture_link}`}
                        className="custom-avatar"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="tabs_container">
                <div className="tabs">{student.Level.profile_name}</div>
                <div className="tabs">{student.almaMater}</div>
                <div className="tabs"> {student.faculty}</div>
                <div className="tabs"> {student.lessonCost} ₽/55 мин</div>
              </div>
            </div>
            <div className="phone_block">
              Номер для связи: <b>{student.phone}</b>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default StudentProfile;
