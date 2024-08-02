import { useState } from "react";
import CustomButton from "../../components/button/button-component";
import Header from "../header/header-component.tsx";
import Login from "./login-component";
import Register from "./register-component";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./auth-page-component.css";
const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialForm =
    (queryParams.get("form") as "login" | "register") || "login";

  const [activeComponent, setActiveComponent] = useState<"login" | "register">(
    initialForm
  );

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
          transparent={activeComponent === "login" ? true : false}
        />
        <CustomButton
          type="white"
          text="Регистрация"
          block
          onClick={() => handleButtonClick("register")}
          transparent={activeComponent === "register" ? true : false}
        />
      </div>{" "}
      {activeComponent === "login" ? <Login /> : <Register />}
      <CustomButton
        type="white"
        text="Главная"
        block
        onClick={() => navigate("/")}
        icon={<LeftOutlined />}
      />
    </div>
  );
};

export default Auth;
