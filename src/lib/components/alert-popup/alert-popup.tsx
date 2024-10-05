import { getRootContextValues } from "@/lib/contexts/root.context";
import { globalErrorHandler } from "@/lib/utils/error.utils";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, ModalFuncProps } from "antd";
import { HookAPI } from "antd/es/modal/useModal";
import { t } from "i18next";
import _ from "lodash";
import { ReactNode } from "react";

function handleCb(cb: AlertPopupProps["onOk"]) {
  if (typeof cb !== "function") return cb;
  return function () {
    const res = cb();
    if (res instanceof Promise) {
      return new Promise((_res) => {
        res.catch(globalErrorHandler).finally(() => _res(undefined));
      });
    }
    return res;
  };
}

export type AlertPopupProps = ModalFuncProps & {
  message: ReactNode;
  cancellable?: boolean;
  type?: keyof HookAPI;
};

export default function AlertPopup({
  title,
  message,
  okText = _.capitalize(t("common:ok")),
  cancelText = _.capitalize(t("common:cancel")),
  onOk,
  onCancel,
  cancellable = true,
  type,
  ...ModalProps
}: AlertPopupProps) {
  const { modalInstance } = getRootContextValues();
  const modal = modalInstance || Modal;

  return modal[type || "confirm"]({
    title,
    content: message,
    okText,
    cancelText,
    onOk: handleCb(onOk),
    onCancel: handleCb(onCancel),
    closable: cancellable,
    maskClosable: cancellable,
    cancelButtonProps: {
      style: cancelText === null ? { display: "none" } : undefined,
    },
    icon: <ExclamationCircleOutlined />,
    okType: "default",
    ...ModalProps,
  });
}
