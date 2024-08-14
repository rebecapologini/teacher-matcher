import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../../features/auth/auth-api-slice.ts";
import { setUser } from "../../features/auth/auth-slice.ts";
import CustomButton from "../../components/button/button-component";

import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Form, Input } from "antd";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [error, setError] = useState<string | null>(null); // Добавлено состояние для ошибки

  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (formData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setError(null); // Сброс ошибки перед началом регистрации
      const user = await register(formData).unwrap();
      dispatch(setUser(user));
      navigate("/profile-setup");
    } catch (err: any) {
      if (err?.data?.error === "Email already in use") {
        setError("Эта почта уже используется.");
      } else if (err?.data?.errors?.some((e: any) => e.msg === "Password must be at least 6 characters long")) {
        setError("Ненадежный пароль.");
      } else {
        setError("Не удалось зарегистрироваться. Попробуйте еще раз.");
      }
      console.error("Failed to register:", err);
    }
  };

  return (
    <>
      <div className="reg-page">
        <div className="reg-card">
          <Card
            className="card hoverable-card"
            bordered={true}
            style={{ width: 285, height: 280 }}
          >
            <Form name="reg" onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Введите Имя" }]}
              >
                <Input
                  type="name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  prefix={<UserOutlined />}
                  placeholder="Имя"
                  className="custom-input"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Введите email" }]}
              >
                <Input
                  name="email"
                  value={formData.email}
                  id="email"
                  onChange={handleChange}
                  autoComplete="current-email"
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  className="custom-input"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Введите пароль" }]}
              >
                <Input.Password
                  name="password"
                  value={formData.password}
                  id="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  className="custom-input"
                />
              </Form.Item>
              {error && <div style={{ color: 'red' }}>{error}</div>} {/* Отображение ошибки */}
              <Form.Item>
                <CustomButton
                  type="secondary"
                  text="Продолжить"
                  block
                  htmlType="submit"
                  onClick={() =>
                    handleSubmit({
                      name: formData.name,
                      email: formData.email,
                      password: formData.password,
                    })
                  }
                />
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
