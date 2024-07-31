import React from "react";
import { Button } from "antd";
import "./button.css";
import { RightOutlined } from "@ant-design/icons";

interface CustomButtonProps {
  type: "details" | "secondary" | "tertiary";
  text: string;
  onClick?: () => void;
  block?: boolean;
  iconAfterText?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  text,
  onClick,
  block,
  iconAfterText,
}) => {
  return (
    <Button
      className={`custom-button ${type}`}
      onClick={onClick}
      block={block}
      icon={iconAfterText}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
