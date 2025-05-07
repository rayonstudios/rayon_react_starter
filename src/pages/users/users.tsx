import AlertPopup from "@/lib/components/alert-popup/alert-popup";
import PageHeading from "@/lib/components/page-heading/page-heading";
import ServerPaginatedTable, {
  GetHelpers,
} from "@/lib/components/server-paginated-table/server-paginated-table";
import { useLang } from "@/lib/contexts/root.context";
import { useAppDispatch } from "@/lib/redux/store";
import { formattedDateTime } from "@/lib/utils/dateTime.utils";
import { suppressError } from "@/lib/utils/error.utils";
import { kebabCaseToWords } from "@/lib/utils/string.utils";
import { Role } from "@/modules/auth/hooks/role.hooks";
import { userActions } from "@/modules/user/slices/user.slice";
import { User } from "@/modules/user/types/user.types";
import useUrlState from "@ahooksjs/use-url-state";
import {
  CheckCircleFilled,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Space, Tag, Tooltip, Typography } from "antd";
import React, { useRef } from "react";
import UserAvatar from "./components/user-avatar";
import EditUserModal from "./modals/edit-user-modal";
import InviteUserModal from "./modals/invite-user-modal";

interface Props {}

const Users: React.FC<Props> = () => {
  const { t } = useLang();
  const dispatch = useAppDispatch();
  const tableHelpers = useRef<GetHelpers<User>>();
  const [{ action, user }, setUrlState] = useUrlState(undefined, {
    navigateMode: "replace",
  });

  const onModalCancel = () => {
    setUrlState({ action: undefined, user: undefined });
  };

  const onInviteSuccess = (user: User) => {
    onModalCancel();
    tableHelpers.current?.setData((data) => [user, ...data]);
  };

  const onEditSuccess = (user: User) => {
    onModalCancel();
    tableHelpers.current?.setData((data) =>
      data.map((item) => (item.id === user.id ? { ...item, ...user } : item))
    );
  };

  const onInvite = () => {
    setUrlState({ action: "invite" });
  };

  const onEdit = (user: User) => {
    setUrlState({ action: "edit", user: user.id });
  };

  const onDelete = (user: User) => {
    AlertPopup({
      title: "Delete User",
      message: (
        <>
          Are you sure you want to delete user <strong>{user.name}</strong>?
        </>
      ),
      okType: "danger",
      onOk: () =>
        dispatch(userActions.remove(user.id!))
          .unwrap()
          .then(() => {
            tableHelpers.current?.setData((data) =>
              data.filter((item) => item.id !== user.id)
            );
          })
          .catch(suppressError),
    });
  };

  return (
    <div className="relative">
      <PageHeading>{t("sidebar:users")}</PageHeading>
      <ServerPaginatedTable<User>
        url="users"
        getHelpers={(helpers) => (tableHelpers.current = helpers)}
        optionsBar={
          <Button type="primary" icon={<PlusOutlined />} onClick={onInvite}>
            Invite
          </Button>
        }
        filters={[
          {
            label: "Search",
            type: "search",
            key: "search",
            filterProps: { placeholder: "Search by name, email or bio" },
          },
          {
            label: "Role",
            type: "select",
            key: "role",
            filterProps: {
              options: Object.values(Role).map((item) => ({
                label: kebabCaseToWords(item),
                value: item,
              })),
            },
          },
        ]}
        columns={[
          {
            title: "User",
            dataIndex: "name",
            render: (_, record) => <UserAvatar user={record} />,
            fixed: "left",
            sorter: true,
          },
          {
            title: "Creation Date",
            dataIndex: "created_at",
            sorter: true,
            defaultSortOrder: "descend",
            render: (_, record) => (
              <Typography.Text>
                {formattedDateTime(record.created_at)}
              </Typography.Text>
            ),
          },
          {
            title: "Role",
            dataIndex: "role",
            render: (_, record) => (
              <Tag>{kebabCaseToWords(record.role ?? "")}</Tag>
            ),
          },
          {
            title: "Bio",
            dataIndex: "bio",
            width: 300,
            render: (_, record) =>
              record.bio ? (
                <Typography.Text>
                  {record.bio.slice(0, 110)}
                  {record.bio.length > 110 ? "..." : ""}
                </Typography.Text>
              ) : (
                ""
              ),
          },
          {
            title: "Verified",
            dataIndex: "email_verified",
            render: (_, record) =>
              record.email_verified ? (
                <CheckCircleFilled className="text-green-600" />
              ) : null,
          },
          {
            title: "Actions",
            key: "actions",
            fixed: "right",
            render: (_, user) => {
              return (
                <Space align="center" size="middle">
                  <Tooltip title="Edit">
                    <EditOutlined onClick={() => onEdit(user)} />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteOutlined
                      className="text-danger"
                      onClick={() => onDelete(user)}
                    />
                  </Tooltip>
                </Space>
              );
            },
          },
        ]}
      />

      <InviteUserModal
        open={action === "invite"}
        onCancel={onModalCancel}
        onSuccess={onInviteSuccess}
      />
      <EditUserModal
        open={action === "edit"}
        userId={user}
        onCancel={onModalCancel}
        onSuccess={onEditSuccess}
      />
    </div>
  );
};

export default Users;
