import React from "react";
import { Card, Input, Avatar } from "antd";

import "./ ScreenOne.css";

interface ScreenOneProps {
  stage: number[];
}

const ScreenSuccess: React.FC<ScreenOneProps> = ({ stage }) => {
  return (
    <>
      <h1>
        Stage {stage[0]}:{stage[1]}
      </h1>
      <Card>Вы выбрали преподавателя!</Card>
    </>
  );
};

export default ScreenSuccess;
