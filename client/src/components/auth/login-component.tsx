import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import CustomButton from "../../components/button/button-component";
import { useLoginMutation } from "../../features/auth/auth-api-slice.ts";
import { setUser } from "../../features/auth/auth-slice.ts";
import "./login-component.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
    email: "",
    password: "",
  });

  const [login] = useLoginMutation();;
  const dispatch = useDispatch();;
  const navigate = useNavigate();;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
    }));
  };

  const handleSubmit = async (formData: {
    email: string;
    password: string;
  }) => {
    try {
      const user = await login(formData).unwrap();
      dispatch(setUser(user));
      navigate("/");
      const user = await login(formData).unwrap();
      console.log("Login successful:", user);
      dispatch(setUser(user));
      navigate("/");
    } catch (err) {
      console.error("Failed to login:", err);
      console.error("Failed to login:", err);
    }
  };
  };

  return (
    <>
      <div className="auth-page">
        <div className="login-card">
          <Card
            className="card hoverable-card"
            bordered={true}
            style={{ width: 285, height: 225 }}
          >
            <Form name="login" onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Введите email" }]}
              >
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
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
              <Form.Item>
                <CustomButton
                  type="secondary"
                  text="Продолжить"
                  block
                  htmlType="submit"
                  onClick={() =>
                    handleSubmit({
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

export default Login;
export default Login;
