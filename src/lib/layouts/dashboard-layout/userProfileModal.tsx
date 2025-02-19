import CustomModal from "@/lib/components/custom-modal/custom-modal";
import ImagePicker from "@/lib/components/imagePicker";
import { useAppSelector } from "@/lib/redux/store";
import { ThunkStatus } from "@/lib/types/misc";
import { Profile, ProfileUpdate } from "@/modules/auth/types/profile.type";
import useUrlState from "@ahooksjs/use-url-state";
import { Button, Form, FormProps, Input } from "antd";
import React, { useEffect } from "react";
import ChangeUserPassModal from "./change-user-pass-modal";

type FieldType = ProfileUpdate;

interface Props {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profile: Profile;
}

const UserProfile: React.FC<Props> = ({
  isModalOpen,
  setModalOpen,
  profile,
}) => {
  const [form] = Form.useForm();

  const [urlState, setUrlState] = useUrlState({
    dialogType: "",
  });

  const loading = useAppSelector(
    (state) => state.profile.patchStatus === ThunkStatus.LOADING
  );

  useEffect(() => {
    if (isModalOpen && profile) {
      form.setFieldsValue({
        ...profile,
        photo: [profile?.photo || {}],
      });
    }
  }, [isModalOpen, form, profile]);

  const handleClose = () => {
    form.resetFields();
    setModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = () => {};

  return (
    <div>
      <CustomModal
        title="Profile"
        open={isModalOpen}
        onOk={form.submit}
        submitLoading={loading}
        onCancel={() => {
          handleClose();
        }}
      >
        <Form
          form={form}
          style={{ maxWidth: 600 }}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="Photo" name="photo">
            <ImagePicker count={1} value={[]} width={100} height={100} />
          </Form.Item>

          <Form.Item<FieldType>
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Last Name"
            name="last_name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Button
            className="w-full"
            onClick={() => setUrlState({ dialogType: "changePassword" })}
          >
            Change Password
          </Button>
        </Form>
      </CustomModal>
      <ChangeUserPassModal
        profile={profile}
        isModalOpen={urlState.dialogType === "changePassword"}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};

export default UserProfile;
