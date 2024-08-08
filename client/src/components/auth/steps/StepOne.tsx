import React, { useEffect, useState } from "react";
import { Card, Input, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { StepOneData } from "../../../types/profile";
import "./StepOne.css";
import Uploading from "../../../pages/home/Uploading";
import axios from "axios";
const { Meta } = Card;

interface StepOneProps {
  data: StepOneData;
  updateData: (data: StepOneData) => void;
  next: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ data, updateData }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    data.picture_link
  );

  const [sex, setSex] = useState<{ id: number; name: string }[]>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAgeChange = (value: number) => {
    updateData({ ...data, age: value });
  };

  const handleUploadComplete = (fileUrl: string) => {
    setAvatarUrl(fileUrl);
    updateData({ ...data, picture_link: fileUrl }); // Сохранение URL в данные
  };
  const handleRemoveAvatar = () => {
    setAvatarUrl(undefined);
    updateData({ ...data, picture_link: "" });
  };
  const handleSexChange = (value: number) => {
    updateData({ ...data, sex_id: value });
  };
  console.log(avatarUrl);

  useEffect(() => {
    async function getLevels() {
      const {
        data: { sex },
      } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile/step_1`
      );
      console.log("sex", sex);
      setSex(sex);
    }

    getLevels();
  }, []);

  return (
    <>
      <h2>Шаг 1 из 5</h2>
      <Card>
        <div className="avatar">
          <Avatar
            size={128}
            src={
              avatarUrl
                ? `http://localhost:4000${avatarUrl}`
                : "http://localhost:4000/uploads/default-avatar.svg"
            }
            icon={!avatarUrl && <UserOutlined />}
          />

          <Uploading
            onUploadComplete={handleUploadComplete}
            onRemove={handleRemoveAvatar}
          />
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
        <div>
          <label>Пол</label>

          <div className="lessons-selection">
            {sex?.map((sex) => (
              <Card
                key={sex.id}
                className={`lessons-card ${data.sex_id === sex.id ? "selected" : ""}`}
                onClick={() => handleSexChange(sex.id)}
              >
                <Meta title={sex.name} />
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
};

export default StepOne;
