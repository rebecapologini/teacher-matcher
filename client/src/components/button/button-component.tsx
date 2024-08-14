import React from "react";
import { Button } from "antd";
import "./button.css";
import { useProfile } from "../context/profileContext";

interface CustomButtonProps {
  type: "details" | "secondary" | "tertiary" | "white";
  text: string;
  onClick?: () => void;
  block?: boolean;
  iconAfterText?: React.ReactNode;
  icon?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset";
  transparent?: boolean;
  disabled: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  text,
  onClick,
  block,
  iconAfterText,
  icon,
  transparent,
  disabled,
}) => {
  return (
    <Button
      className={`custom-button ${type} ${transparent ? "transparent-button" : ""}`}
      onClick={onClick}
      block={block}
      icon={icon}
      disabled={disabled}
    >
      {text}{" "}
      {iconAfterText && <span className="icon-right">{iconAfterText}</span>}
    </Button>
  );
};

export default CustomButton;
