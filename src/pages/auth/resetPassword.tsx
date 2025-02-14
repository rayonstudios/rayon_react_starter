import { Button, Form, Input } from "antd";
import { FormProps } from "antd/lib";
import React from "react";
import { useParams } from "react-router-dom";

type FormValues = {
  email: string;
  otp: string;
  password: string;
  confirm_password?: string;
};

interface Props {}

const ResetPassword: React.FC<Props> = () => {
  const { email } = useParams();
  const onFinish: FormProps<FormValues>["onFinish"] = (values) => {
    //dispatch resetPassword Api
    delete values.confirm_password;
    console.log("values: ", { ...values, email: email });
  };

  return (
    <div>
      <Form<FormValues> onFinish={onFinish} layout="vertical">
        <Form.Item
          name="otp"
          label="Otp"
          rules={[{ required: true, message: "Please enter a password" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter a password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          label="Confirm Password"
          rules={[
            { required: true, message: "Please confirm the password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="float-right mb-0">
          <Button type="primary" htmlType="submit">
            Conitnue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
