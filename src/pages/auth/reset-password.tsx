import { useIsLoading } from "@/lib/redux/enhancers/status.enhancer";
import { useAppDispatch } from "@/lib/redux/store";
import { suppressError } from "@/lib/utils/error.utils";
import Validations from "@/lib/utils/validations";
import { authActions } from "@/modules/auth/slices/auth.slice";
import { AuthResetPasswordBody } from "@/modules/auth/types/auth.types";
import useUrlState from "@ahooksjs/use-url-state";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Typography } from "antd";
import { omit } from "lodash";
import React from "react";
import { useNavigate } from "react-router-dom";

type ResetPasswordForm = Omit<AuthResetPasswordBody, "email"> & {
  confirmPassword: string;
};

interface Props {}

const ResetPassword: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const loading = useIsLoading("auth", "resetPasswordStatus");
  const [{ email, otp }] = useUrlState({ email: "", otp: "" });
  const navigate = useNavigate();

  const onFinish = (values: ResetPasswordForm) => {
    dispatch(
      authActions.resetPassword({ ...omit(values, ["confirmPassword"]), email })
    )
      .unwrap()
      .then(() => {
        message.success("Your password has been updated successfully!");
        navigate("/login");
      })
      .catch(suppressError);
  };

  if (!email) {
    return (
      <div className="text-center space-y-2">
        <Typography.Title level={4}>Invalid link</Typography.Title>
        <Typography.Text type="secondary">
          The link you used to reset your password is invalid or has expired.
        </Typography.Text>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <Typography.Text type="secondary">
          Enter your new password below for email <strong>{email}</strong>. Make
          sure to remember it for future logins.
        </Typography.Text>
      </div>

      <Form<ResetPasswordForm>
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item<ResetPasswordForm>
          name="otp"
          rules={[Validations.requiredField("Recovery code")]}
          initialValue={otp}
          label={otp ? "Recovery code" : undefined}
        >
          <Input size="large" placeholder="Recovery code" disabled={!!otp} />
        </Form.Item>

        <Form.Item<ResetPasswordForm>
          name="password"
          rules={[
            Validations.requiredField("Password"),
            { validator: Validations.minLen(6) },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="New password"
            size="large"
          />
        </Form.Item>

        <Form.Item<ResetPasswordForm>
          name="confirmPassword"
          rules={[
            Validations.requiredField(),
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
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm new password"
            size="large"
          />
        </Form.Item>

        <Form.Item className="mb-0 mt-5">
          <Button
            className="w-full"
            loading={loading}
            type="primary"
            htmlType="submit"
          >
            Reset password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
