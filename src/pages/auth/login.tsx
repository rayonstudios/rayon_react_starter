import Validations from "@/lib/utils/validations";
import { useAuth } from "@/modules/auth/hooks/auth.hooks";
import { AuthLoginBody } from "@/modules/auth/types/auth.types";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";

interface Props {}

const Login: React.FC<Props> = () => {
  const { login, loginLoading } = useAuth();

  const onFinish = (values: AuthLoginBody) => {
    login(values);
  };

  return (
    <div>
      <Form<AuthLoginBody> onFinish={onFinish}>
        <Form.Item<AuthLoginBody>
          name="email"
          rules={[
            Validations.requiredField("Email"),
            { validator: Validations.email },
          ]}
          validateFirst
        >
          <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item<AuthLoginBody>
          name="password"
          rules={[Validations.requiredField("Password")]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>

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
