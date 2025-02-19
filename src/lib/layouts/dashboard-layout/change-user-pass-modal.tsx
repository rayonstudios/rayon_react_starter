import CustomModal from "@/lib/components/custom-modal/custom-modal";
import { useAppSelector } from "@/lib/redux/store";
import { ThunkStatus } from "@/lib/types/misc";
import { Profile } from "@/modules/auth/types/profile.type";
import { Form, Input } from "antd";
import { ComponentProps } from "react";

type Props = {
  profile?: Profile;
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & ComponentProps<typeof CustomModal>;

const ChangeUserPassModal: React.FC<Props> = ({
  profile,
  isModalOpen,
  setModalOpen,

  ...props
}) => {
  const loading = useAppSelector(
    (state) => state.auth.changePasswordStatus === ThunkStatus.LOADING
  );
  const [form] = Form.useForm();
  const handleClose = () => {
    form.resetFields();
    setModalOpen(false);
  };

  const onFininsh = (values: { password: string }) => {
    if (!profile) return null;
    console.log("values: ", values);
  };

  return (
    <CustomModal
      title="Change Password"
      open={isModalOpen}
      onOk={form.submit}
      onCancel={handleClose}
      submitLoading={loading}
      {...props}
    >
      {!profile && (
        <>
          <Form form={form} onFinish={onFininsh} layout="vertical">
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
                ({
                  getFieldValue,
                }: {
                  getFieldValue: (name: string) => string;
                }) => ({
                  validator(_: unknown, value: string) {
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
          </Form>
        </>
      )}
    </CustomModal>
  );
};

export default ChangeUserPassModal;
