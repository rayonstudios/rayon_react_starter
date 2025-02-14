import Validations from "@/lib/utils/validations";
import { useAuth } from "@/modules/auth/hooks/auth.hooks";
import { authActions } from "@/modules/auth/slices/auth.slice";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FormProps } from "antd/lib";
import React from "react";
import { useNavigate } from "react-router-dom";

type FormValues = Parameters<typeof authActions.login>[0];

interface Props {}

const Login: React.FC<Props> = () => {
  const { login, loginLoading } = useAuth();

  const navigate = useNavigate();

  const onFinish: FormProps<FormValues>["onFinish"] = (values) => {
    login(values);
  };

  return (
    <div>
      <Form<FormValues> onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: Validations.reqd_msg("Email") },
            { validator: Validations.email },
          ]}
          validateFirst
        >
          <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: Validations.reqd_msg("Password") },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Button
          type="link"
          className="mt-[-10px]"
          onClick={() => navigate("/forgot-password")}
        >
          ForgotPassword
        </Button>

        <Form.Item className="float-right mb-0">
          <Button loading={loginLoading} type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
