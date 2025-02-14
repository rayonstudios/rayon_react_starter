import { Button, Form, Input, message } from "antd";
import { FormProps } from "antd/lib";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Validations from "@/lib/utils/validations";
import { MailOutlined } from "@ant-design/icons";
import HCaptcha from "@hcaptcha/react-hcaptcha";

type FormValues = {
  email: string;
  token: string;
};

interface Props {}

const ForgotPassword: React.FC<Props> = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const onFinish: FormProps<FormValues>["onFinish"] = (values) => {
    console.log({ ...values, token: token });
    message.success("Otp has been sent to your email");
    // dispatch forgotPassword Api
    navigate(`/reset-password/${values.email}`);

    // ;
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
        <Form.Item className="float-right mt-4">
          <Button type="primary" htmlType="submit">
            Conitnue
          </Button>
        </Form.Item>
        <Form.Item
          name="token"
          rules={[
            {
              required: token == "",
              message: "Please complete the captcha",
            },
          ]}
          validateFirst
        >
          <HCaptcha
            sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
            onVerify={(token) => setToken(token)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
