import React from "react";
import { Button } from "antd";
import "./button.css";

interface CustomButtonProps {
  type: "details" | "secondary" | "tertiary" | "white";
  text: string;
  onClick?: () => void;
  block?: boolean;
  iconAfterText?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset";
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
