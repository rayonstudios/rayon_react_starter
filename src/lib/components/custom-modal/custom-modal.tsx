import { Modal, Spin } from "antd";
import React, { ComponentProps } from "react";

interface Props {
  loading?: boolean;
  submitLoading?: boolean;
}

const CustomModal: React.FC<Props & ComponentProps<typeof Modal>> = ({
  loading,
  submitLoading,
  ...props
}) => {
  return (
    <Modal
      classNames={{
        body: "max-h-[60vh] overflow-y-auto",
        header: "!mb-6",
        footer: "!mt-6",
      }}
      centered
      destroyOnClose
      okText="Submit"
      {...props}
      okButtonProps={{ loading: submitLoading, ...props.okButtonProps }}
    >
      {props.open ? <Spin spinning={loading}>{props.children}</Spin> : null}
    </Modal>
  );
};

export default CustomModal;
