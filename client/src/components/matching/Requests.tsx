import React, { useRef, useEffect, useState } from "react";
import Header from "../header/header-component";
import axios from "axios";
import { useFetchUserQuery } from "../../features/auth/auth-api-slice";
import { Avatar, Button, Card, Tabs } from "antd";
import "./Requests.css";
import {
  useAcceptMutation,
  useDeclineMutation,
} from "../../features/profile/profile-api-slice";

const Requests: React.FC = () => {
  const abcd = useFetchUserQuery();
  const [showRequests, setShowRequests] = useState(true);
  const [students, setStudents] = useState([]);
  const [newStudents, setNewStudents] = useState([]);
  const [pageShown, setPageShown] = useState("1");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const {
          data: { acceptedStudents, newStudents },
        } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/matching/requests`,
          { id: abcd.data.id }
        );
        console.log("dataRequests", acceptedStudents);

        setStudents(acceptedStudents);
        setNewStudents(newStudents);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const [accept] = useAcceptMutation();
  const handleAccept = (id: number, student) => {
    console.log(id);
    accept({ id });
    setStudents((prev) => [...prev, student]);
    setNewStudents((prev) => prev.filter((el) => el.id !== id));
  };
  const [decline] = useDeclineMutation();
  const handleDecline = (id: number) => {
    console.log(id);
    decline({ id });
    setNewStudents((prev) => prev.filter((el) => el.id !== id));
  };
  const onTabsChange = (id: string) => {
    setPageShown(id);
  };
  const items = [
    {
      key: "1",
      label: "Новые",
    },
    {
      key: "2",
      label: "Одобренные",
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
      <Header />
      <div className="requests-name">Заявки</div>
      <div className="requests-types">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onTabsChange}
          className="real-tabs"
        />
      </div>
      {pageShown === "1" &&
        newStudents.map((student) => (
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
                        src={`http://localhost:4000${student.picture_link}`}
                        className="custom-avatar"
                      />
                    )}
                  </div>
                )}
                <div className="tabs_container">
                  <div className="tabs">{student.Level.profile_name}</div>
                  <div className="tabs">{student.Goal.name}</div>
                  <div className="tabs">{student.Language.name}</div>
                  <div className="tabs"> {student.lessons} ур/нед</div>
                  <div className="tabs"> {student.duration}</div>
                </div>
              </div>
            </div>
            <div className="text_block">{student.about}</div>
            <div className="buttons">
              <div className="button_decline">
                <Button
                  onClick={() => handleDecline(student.id)}
                  type="primary"
                  shape="circle"
                  className="button_decline"
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24 8L8 24"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 8L24 24"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  size="large"
                />
              </div>
              <div className="button_accept">
                <Button
                  onClick={() => handleAccept(student.id, student)}
                  type="primary"
                  shape="circle"
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.66667 18.6667L11.2331 22.0915C11.6618 22.413 12.2677 22.3395 12.607 21.9247L24 8"
                        stroke="white"
                        strokeLinecap="round"
                      />
                    </svg>
                  }
                  size="large"
                />
              </div>
            </div>
          </Card>
        ))}
      {pageShown === "2" &&
        students.map((student) => (
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
                        src={`http://localhost:4000${student.picture_link}`}
                        className="custom-avatar"
                      />
                    )}
                  </div>
                )}
                <div className="tabs_container">
                  <div className="tabs">{student.Level.profile_name}</div>
                  <div className="tabs">{student.Goal.name}</div>
                  <div className="tabs">{student.Language.name}</div>
                  <div className="tabs"> {student.lessons} ур/нед</div>
                  <div className="tabs"> {student.duration}</div>
                </div>
              </div>
            </div>
            <div className="text_block">{student.about}</div>
            <div className="phone_block">
              Номер для связи: <b>{student.phone}</b>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default Requests;
