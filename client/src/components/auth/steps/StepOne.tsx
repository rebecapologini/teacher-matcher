import React, { useState } from "react";
import { Card, Input, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { StepOneData } from "../../../types/profile";
import "./StepOne.css";
import Uploading from "../../../pages/home/Uploading";
import UniSelector from "../../../pages/uni-selector";
interface StepOneProps {
  data: StepOneData;
  updateData: (data: StepOneData) => void;
  next: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ data, updateData }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(data.avatarUrl);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAgeChange = (value: number) => {
    updateData({ ...data, age: value });
  };

  const handleUploadComplete = (fileUrl: string) => {
    setAvatarUrl(fileUrl);
    updateData({ ...data, avatarUrl: fileUrl });  // Сохранение URL в данные
  };
  const handleRemoveAvatar = () => {
    setAvatarUrl(undefined);
    updateData({ ...data, avatarUrl: '' });
  };
  console.log(avatarUrl)
  return (
    <>
      <h2>Шаг 1 из 5</h2>
      <Card>
        <div className="avatar">
          <Avatar 
            size={128} 
            src={avatarUrl ? `http://localhost:4000${avatarUrl}` : 'http://localhost:4000/uploads/default-avatar.svg'} 
            icon={!avatarUrl && <UserOutlined />} 
          />
          <Uploading onUploadComplete={handleUploadComplete} onRemove={handleRemoveAvatar} />
          <UniSelector/>
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