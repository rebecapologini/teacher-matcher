import React from "react";
import { Card, Input, Avatar } from "antd";
import { StepOneData } from "../../../types/profile";
import "./StepOne.css";
interface StepOneProps {
  data: StepOneData;
  updateData: (data: StepOneData) => void;
  next: () => void;
}
const StepOne: React.FC<StepOneProps> = ({ data, updateData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAgeChange = (value: number) => {
    updateData({ ...data, age: value });
  };

  // const handleSubmit = () => {
  // const dataSend = {
  //   name: data.name,
  //   surname: data.surname,
  //   age: data.age,
  // };
  // sendServer(dataSend);
  // };

  //   const sendServer = async (data: {
  //     name: string;
  //     surname: string;
  //     age: number;
  //   }) => {
  //     try {
  //       const baseUrl = import.meta.env.VITE_API_BASE_URL;
  //       const response = await fetch(`${baseUrl}/profile-setup/`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Ошибка при отправке данных");
  //       }

  //       const result = await response.json();
  //       console.log("Ответ сервера:", result);
  //     } catch (error) {
  //       console.error("Ошибка:", error);
  //     }
  // };

  return (
    <>
      <h2>Шаг 1 из 5</h2>
      <Card>
        <div className="avatar">
          <Avatar size={128} icon="user" />
        </div>
        <div>
          <label>
            Имя
            <Input
              name="name"
              value={data.name || ""}
              onChange={handleChange}
              className="custom-input"
            />
          </label>
        </div>
        <div>
          <label>
            Фамилия
            <Input
              name="surname"
              value={data.surname || ""}
              onChange={handleChange}
              className="custom-input"
            />
          </label>
        </div>
        <div>
          <label>
            Возраст
            <Input
              type="number"
              name="age"
              value={data.age || ""}
              onChange={(e) => handleAgeChange(Number(e.target.value))}
              className="custom-input"
            />
          </label>
        </div>
      </Card>
    </>
  );
};

export default StepOne;
