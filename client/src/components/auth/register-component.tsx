<<<<<<< HEAD
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../features/auth/auth-api-slice.ts';
import { setUser } from '../../features/auth/auth-slice.ts';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
=======
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
>>>>>>> main
  });

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

<<<<<<< HEAD
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const user = await register(formData).unwrap();
      dispatch(setUser(user));
      navigate('/');
    } catch (err) {
      console.error('Failed to register:', err);
=======
  const handleSubmit = async (formData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const user = await register(formData).unwrap();
      dispatch(setUser(user));
      navigate("/");
    } catch (err) {
      console.error("Failed to register:", err);
>>>>>>> main
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
        {/* <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
          <button type="submit">Register</button>
        </form> */}
      </div>
<<<<<<< HEAD
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
=======
    </>
  );
};

export default Register;
>>>>>>> main
