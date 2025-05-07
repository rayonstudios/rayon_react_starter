import CustomModal from "@/lib/components/custom-modal/custom-modal";
import { useIsLoading } from "@/lib/redux/enhancers/status.enhancer";
import { useAppDispatch } from "@/lib/redux/store";
import { suppressError } from "@/lib/utils/error.utils";
import { kebabCaseToWords } from "@/lib/utils/string.utils";
import Validations from "@/lib/utils/validations";
import { Role } from "@/modules/auth/hooks/role.hooks";
import { userActions } from "@/modules/user/slices/user.slice";
import { User, UserCreateBody } from "@/modules/user/types/user.types";
import { Form, Input, message, Select } from "antd";
import React, { ComponentProps } from "react";

type Props = ComponentProps<typeof CustomModal> & {
  onSuccess?: (user: User) => void;
};

const InviteUserModal: React.FC<Props> = ({ onSuccess, ...props }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const loading = useIsLoading("user", "createStatus");

  const onFinish = (values: UserCreateBody) => {
    dispatch(userActions.create(values))
      .unwrap()
      .then((user) => {
        message.success(
          "An invitation has been sent to the user's email to join the platform"
        );
        form.resetFields();
        onSuccess?.(user);
      })
      .catch(suppressError);
  };

  return (
    <CustomModal
      {...props}
      title="Invite new user"
      okText="Invite"
      onOk={form.submit}
      submitLoading={loading}
    >
      <Form<UserCreateBody> onFinish={onFinish} form={form} layout="vertical">
        <Form.Item<UserCreateBody>
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

        <Form.Item<UserCreateBody>
          name="email"
          label="Email"
          rules={[
            Validations.requiredField("email"),
            { validator: Validations.email },
          ]}
          validateFirst
        >
          <Input />
        </Form.Item>

        <Form.Item<UserCreateBody>
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

export default InviteUserModal;
