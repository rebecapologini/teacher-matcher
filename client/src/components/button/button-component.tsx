import React from "react";
import { Button } from "antd";
import "./button.css";

interface CustomButtonProps {
  type: "primary" | "secondary" | "tertiary";
  text: string;
  onClick?: () => void;
  block?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  text,
  onClick,
  block,
}) => {
  return (
    <Button className={`custom-button ${type}`} onClick={onClick} block={block}>
      {text}
    </Button>
  );
};

export default CustomButton;
