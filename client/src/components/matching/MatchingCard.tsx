import React, { useRef, useEffect, useState } from "react";
import styles from "./Card.module.css";
import "./Card.css";
import { startDrag, showTutorial } from "./utils/cardUtils";
import { Card, Avatar, Button } from "antd";
import Header from "../header/header-component";
import YouTube, { YouTubeProps } from "react-youtube";
import axios from "axios";

const MatchingCard: React.FC = () => {
  const [profileData, setProfileData] = useState({});
  const [selectedDay, setSelectedDay] = useState<string | null>("Пн");

  const declension = ["год", "года", "лет"];

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

  const cardRef = useRef<HTMLDivElement>(null);
  const leftIndicatorRef = useRef<HTMLDivElement>(null);
  const rightIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/matching/teachers`
        );
        console.log("AAAA");
        setProfileData({ ...data });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    const card = cardRef.current;
    const leftIndicator = leftIndicatorRef.current;
    const rightIndicator = rightIndicatorRef.current;

    if (!card || !leftIndicator || !rightIndicator) return;

    card.addEventListener("mousedown", (e) =>
      startDrag(e, card, leftIndicator, rightIndicator)
    );
    card.addEventListener("touchstart", (e) =>
      startDrag(e, card, leftIndicator, rightIndicator)
    );

    showTutorial(card, leftIndicator, rightIndicator);

    return () => {
      card.removeEventListener("mousedown", (e) =>
        startDrag(e, card, leftIndicator, rightIndicator)
      );
      card.removeEventListener("touchstart", (e) =>
        startDrag(e, card, leftIndicator, rightIndicator)
      );
    };
  }, []);
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "200",
    width: "280",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  function plural(number: number, titles: string[]) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  const handleDayClick = (
    day: string,
    e: React.MouseEvent | React.TouchEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDay(day);
  };

  return (
    <>
      <Header />
      <div className={styles.cardContainer}>
        <div
          className={`${styles.indicator} ${styles.leftIndicator}`}
          ref={leftIndicatorRef}
        >
          ✖
        </div>
        <div
          className={`${styles.indicator} ${styles.rightIndicator}`}
          ref={rightIndicatorRef}
        >
          ✔
        </div>
        <Card className={styles.card} ref={cardRef}>
          <div className="avatar">
            {profileData.picture_link && (
              <Avatar
                size={128}
                src={`http://localhost:4000${profileData.picture_link}`}
                className="custom-avatar"
              />
            )}
          </div>
          <div className={styles.name_age}>
            <div>{`${profileData.name} ${profileData.surname}, ${profileData.age} ${plural(profileData.age, declension)}`}</div>
          </div>
          <div className={styles.experience_level}>
            <div className={styles.tabs}>
              {`Стаж ${profileData.teachingExperience} ${plural(profileData.teachingExperience, declension)}`}
            </div>
            {profileData.Level && (
              <div className={styles.tabs}>
                Уровень языка {profileData?.Level?.profile_name}
              </div>
            )}
            {profileData.Goals &&
              profileData.Goals.map((competence) => (
                <div className={styles.tabs}>{competence.name}</div>
              ))}
            {profileData.almaMater &&
              profileData.faculty &&
              profileData.academicDegree && (
                <>
                  {" "}
                  <div className={styles.tabs}>{profileData.almaMater}</div>
                  <div className={styles.tabs}>{profileData.faculty}</div>
                  <div className={styles.tabs}>
                    {profileData.academicDegree}
                  </div>
                </>
              )}
          </div>
          <div className={styles.cost_info}>
            Индивидуальное занятие · 55 мин · {profileData.lessonCost} ₽
          </div>
          <div className={styles.profile_body}>
            <div className={styles.profile_title}>О себе</div>
            {profileData.aboutYourself && (
              <div className={styles.text_blocks}>
                {profileData.aboutYourself}
              </div>
            )}
            <div className={styles.profile_title}>Видеопрезентация</div>
            {profileData.videoPresentation && (
              <YouTube
                videoId={profileData.videoPresentation.match(/[^\/]+$/)}
                opts={opts}
                onReady={onPlayerReady}
              />
            )}
            {profileData.convenientTime && (
              <>
                <div className={styles.profile_title}>Свободные слоты</div>
                <div className="select-day">
                  <div className="days-container">
                    {daysOfWeek.map((day) => (
                      <Button
                        key={day}
                        type={selectedDay === day ? "primary" : "default"}
                        onClick={(e) => handleDayClick(day, e)}
                        onTouchStart={(e) => handleDayClick(day, e)}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="select-time">
                  <div className="times-container">
                    {timesList.map((time) => (
                      <Button
                        key={time}
                        type={
                          profileData.convenientTime.hasOwnProperty(
                            selectedDay
                          ) &&
                          profileData.convenientTime[selectedDay].includes(time)
                            ? "primary"
                            : "default"
                        }
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default MatchingCard;
