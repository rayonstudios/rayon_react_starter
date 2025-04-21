import ImagePicker from "@/lib/components/image-picker/image-picker";
import PageSpinner from "@/lib/components/spinner/page-spinner";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Profile } from "@/lib/types/api";
import { Modify } from "@/lib/types/misc";
import { suppressError } from "@/lib/utils/error.utils";
import { sizedImg } from "@/lib/utils/image.utils";
import Validations from "@/lib/utils/validations";
import { profileActions } from "@/modules/auth/slices/profile.slice";
import { AuthChangePasswordBody } from "@/modules/auth/types/auth.types";
import { Button, Form, Input, message, Typography } from "antd";
import { omit } from "lodash";
import React from "react";

type ProfileForm = Modify<Profile, { photo: (File | string)[] }>;

interface Props {}

const Settings: React.FC<Props> = () => {
  const user = useAppSelector((state) => state.profile.data);
  const dispatch = useAppDispatch();

  const onUpdateProfile = (values: ProfileForm) => {
    const data = omit(values, ["photo"]);
    dispatch(
      profileActions.update({
        ...data,
        photo: values.photo[0] instanceof File ? values.photo[0] : undefined,
      })
    )
      .unwrap()
      .then(() => message.success("Profile updated successfully"))
      .catch(suppressError);
  };

  if (!user) return <PageSpinner />;

  return (
    <div>
      <Typography.Title className="mt-0 !mb-4" level={3}>
        Update Profile
      </Typography.Title>
      <Form<ProfileForm>
        onFinish={onUpdateProfile}
        layout="vertical"
        initialValues={{ ...user, photo: [sizedImg(user, "photo", "small")] }}
        className="w-96"
      >
        <Form.Item<Profile> name="photo">
          <ImagePicker
            count={1}
            imgProps={{ loader: { type: "skeleton", shape: "circle" } }}
          />
        </Form.Item>
        <Form.Item<Profile> name="name">
          <Input placeholder="Your full name" />
        </Form.Item>
        <Form.Item<Profile> name="bio">
          <Input.TextArea
            placeholder="Tell a bit about yourself in a few sentences"
            autoSize={{ minRows: 3, maxRows: 10 }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="float-right">
            Save
          </Button>
        </Form.Item>
      </Form>

      <Typography.Title className="!mb-4" level={3}>
        Update Password
      </Typography.Title>
      <Form<AuthChangePasswordBody> layout="vertical" className="w-96">
        <Form.Item<AuthChangePasswordBody>
          name="oldPassword"
          rules={[Validations.requiredField()]}
        >
          <Input.Password placeholder="Old Password" />
        </Form.Item>
        <Form.Item<AuthChangePasswordBody>
          name="newPassword"
          rules={[Validations.requiredField()]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
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
        >
          <Input.Password placeholder="Re-enter new Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="float-right">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings;
