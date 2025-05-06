import { useIsLoading } from "@/lib/redux/enhancers/status.enhancer";
import { useAppDispatch } from "@/lib/redux/store";
import { suppressError } from "@/lib/utils/error.utils";
import Validations from "@/lib/utils/validations";
import { authActions } from "@/modules/auth/slices/auth.slice";
import { AuthForgotPasswordBody } from "@/modules/auth/types/auth.types";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import React, { useRef, useState } from "react";

interface Props {}

const ForgotPassword: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const loading = useIsLoading("auth", "forgotPasswordStatus");
  const [isSuccess, setIsSuccess] = useState(false);
  const email = useRef<string>();

  const onFinish = (values: AuthForgotPasswordBody) => {
    dispatch(authActions.forgotPassword(values))
      .unwrap()
      .then(() => {
        email.current = values.email;
        setIsSuccess(true);
      })
      .catch(suppressError);
  };

  if (isSuccess)
    return (
      <div className="text-center space-y-2">
        <Typography.Title level={4}>
          Password reset instructions sent!
        </Typography.Title>
        <Typography.Text type="secondary">
          Check your inbox or spam folder. You will receive an email at{" "}
          <strong>{email.current}</strong> with instructions on how to reset
          your password.
        </Typography.Text>
      </div>
    );

  return (
    <div>
      <Form<AuthForgotPasswordBody> onFinish={onFinish}>
        <div className="mb-6 text-center">
          <Typography.Text type="secondary">
            Enter your email to start the password reset process. You will
            receive an email with instructions.
          </Typography.Text>
        </div>

        <Form.Item<AuthForgotPasswordBody>
          className="mb-1"
          name="email"
          rules={[
            Validations.requiredField("Email"),
            { validator: Validations.email },
          ]}
          validateFirst
        >
          <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
        </Form.Item>

        <div className="flex justify-end">
          <Typography.Link href="/login" className="text-xs">
            Back to login
          </Typography.Link>
        </div>

        <Form.Item className="mb-0 mt-5">
          <Button
            className="w-full"
            loading={loading}
            type="primary"
            htmlType="submit"
          >
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
