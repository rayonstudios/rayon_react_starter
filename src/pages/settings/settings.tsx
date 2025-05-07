import ImagePicker from "@/lib/components/image-picker/image-picker";
import PageSpinner from "@/lib/components/spinner/page-spinner";
import { useIsLoading } from "@/lib/redux/enhancers/status.enhancer";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Modify } from "@/lib/types/misc";
import { suppressError } from "@/lib/utils/error.utils";
import { sizedImg } from "@/lib/utils/image.utils";
import Validations from "@/lib/utils/validations";
import { authActions } from "@/modules/auth/slices/auth.slice";
import { profileActions } from "@/modules/auth/slices/profile.slice";
import { AuthChangePasswordBody } from "@/modules/auth/types/auth.types";
import { Profile } from "@/modules/auth/types/profile.types";
import { Button, Form, Input, message, Typography } from "antd";
import { omit } from "lodash";
import React from "react";

type ProfileForm = Modify<Profile, { photo: (File | string)[] }>;

type ChangePasswordForm = AuthChangePasswordBody & {
  confirmPassword: string;
};

interface Props {}

const Settings: React.FC<Props> = () => {
  const user = useAppSelector((state) => state.profile.data);
  const dispatch = useAppDispatch();
  const updateProfileLoading = useIsLoading("profile", "updateStatus");
  const changePasswordLoading = useIsLoading("auth", "changePasswordStatus");

  const onUpdateProfile = (values: ProfileForm) => {
    dispatch(
      profileActions.update({
        ...values,
        photo: values.photo[0] instanceof File ? values.photo[0] : undefined,
      })
    )
      .unwrap()
      .then(() => message.success("Profile updated successfully"))
      .catch(suppressError);
  };

  const onChangePassword = (values: ChangePasswordForm) => {
    dispatch(authActions.changePassword(omit(values, ["confirmPassword"])))
      .unwrap()
      .then(() => message.success("Password updated successfully"))
      .catch(suppressError);
  };

  if (!user) return <PageSpinner />;

  return (
    <div>
      <Typography.Title className="mt-0 !mb-4" level={3}>
        Update Profile
      </Typography.Title>
      <Form<ProfileForm>
        layout="vertical"
        className="w-96"
        initialValues={{ ...user, photo: [sizedImg(user, "photo", "small")] }}
        onFinish={onUpdateProfile}
      >
        <Form.Item<ProfileForm> name="photo">
          <ImagePicker
            count={1}
            imgProps={{ loader: { type: "skeleton", shape: "circle" } }}
          />
        </Form.Item>
        <Form.Item<ProfileForm> name="name">
          <Input placeholder="Your full name" />
        </Form.Item>
        <Form.Item<ProfileForm> name="bio">
          <Input.TextArea
            placeholder="Tell a bit about yourself in a few sentences"
            autoSize={{ minRows: 3, maxRows: 10 }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="float-right"
            loading={updateProfileLoading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>

      <Typography.Title className="!mb-4" level={3}>
        Update Password
      </Typography.Title>
      <Form<ChangePasswordForm>
        layout="vertical"
        className="w-96"
        onFinish={onChangePassword}
      >
        <Form.Item<ChangePasswordForm>
          name="oldPassword"
          label="Old Password"
          rules={[Validations.requiredField()]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<ChangePasswordForm>
          name="newPassword"
          label="New Password"
          rules={[
            Validations.requiredField(),
            { validator: Validations.minLen(6) },
          ]}
          validateFirst
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<ChangePasswordForm>
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            Validations.requiredField(),
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match");
              },
            }),
          ]}
          validateFirst
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="float-right"
            loading={changePasswordLoading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings;
