import CustomModal from "@/lib/components/custom-modal/custom-modal";
import ImagePicker from "@/lib/components/image-picker/image-picker";
import { useIsLoading } from "@/lib/redux/enhancers/status.enhancer";
import { useAppDispatch } from "@/lib/redux/store";
import { Modify } from "@/lib/types/misc";
import { suppressError } from "@/lib/utils/error.utils";
import { sizedImg } from "@/lib/utils/image.utils";
import { kebabCaseToWords } from "@/lib/utils/string.utils";
import Validations from "@/lib/utils/validations";
import { Role } from "@/modules/auth/hooks/role.hooks";
import { fileActions } from "@/modules/file/slices/file.slice";
import { userActions } from "@/modules/user/slices/user.slice";
import { User, UserUpdateBody } from "@/modules/user/types/user.types";
import { Form, Input, message, Select } from "antd";
import React, { ComponentProps, useEffect, useState } from "react";

type EditUserForm = Modify<UserUpdateBody, { photo: (File | string)[] }>;

type Props = ComponentProps<typeof CustomModal> & {
  userId?: string;
  onSuccess?: (user: User) => void;
};

const EditUserModal: React.FC<Props> = ({
  userId,
  open,
  onSuccess,
  ...props
}) => {
  const [form] = Form.useForm<EditUserForm>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const dispatch = useAppDispatch();
  const loading = useIsLoading("user", "fetchStatus");
  const isOpen = open && Boolean(userId);

  const onFinish = async (values: EditUserForm) => {
    try {
      setSubmitLoading(true);

      // upload photo if it's a file
      let photo = values.photo?.[0];
      if (photo instanceof File) {
        photo = (await dispatch(fileActions.save({ file: photo })).unwrap())
          .url;
      }

      const updatedUser = await dispatch(
        userActions.update({ ...values, id: userId!, photo })
      ).unwrap();

      message.success("User updated successfully");
      form.resetFields();
      onSuccess?.(updatedUser);
    } catch (error) {
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(userActions.fetch(userId!))
        .unwrap()
        .then((user) => {
          form.setFieldsValue({
            ...user,
            photo: [sizedImg(user, "photo", "small")],
          });
        })
        .catch(suppressError);
    }
  }, [isOpen]);

  return (
    <CustomModal
      {...props}
      open={isOpen}
      title="Update user"
      okText="Update"
      onOk={form.submit}
      submitLoading={submitLoading}
      loading={loading}
    >
      <Form<EditUserForm> onFinish={onFinish} form={form} layout="vertical">
        <Form.Item<EditUserForm> name="photo">
          <ImagePicker
            count={1}
            imgProps={{ loader: { type: "skeleton", shape: "circle" } }}
          />
        </Form.Item>

        <Form.Item<EditUserForm>
          name="name"
          label="Name"
          rules={[
            Validations.requiredField("name"),
            { validator: Validations.minLen(3) },
          ]}
          validateFirst
        >
          <Input />
        </Form.Item>

        <Form.Item<EditUserForm> name="bio" label="Bio">
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
        </Form.Item>

        <Form.Item<EditUserForm>
          name="role"
          label="Role"
          rules={[Validations.requiredField("role")]}
        >
          <Select
            options={Object.values(Role).map((item) => ({
              label: kebabCaseToWords(item),
              value: item,
            }))}
          />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export default EditUserModal;
