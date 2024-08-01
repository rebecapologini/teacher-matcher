import { useState } from "react";
import CustomButton from "../../components/button/button-component";
import Header from "../header/header-component.tsx";
import Login from "./login-component";
import Register from "./register-component";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./auth-page-component.css";
const Auth = () => {
  const [activeComponent, setActiveComponent] = useState<"login" | "register">(
    "login"
  );
  const navigate = useNavigate();

  const handleButtonClick = (component: "login" | "register") => {
    setActiveComponent(component);
  };

  return (
    <div className="aut-page">
      <Header />
      <div className="buttons">
        <CustomButton
          type="white"
          text="Войти"
          block
          onClick={() => handleButtonClick("login")}
        />
        <CustomButton
          type="white"
          text="Регистрация"
          block
          onClick={() => handleButtonClick("register")}
        />
      </div>{" "}
      {activeComponent === "login" ? <Login /> : <Register />}
      <CustomButton
        type="white"
        text="Главная"
        block
        onClick={() => navigate("/")}
        iconAfterText={<LeftOutlined />}
      />
    </div>
  );
};

export default Auth;
