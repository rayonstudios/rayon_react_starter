import AlertPopup from "@/lib/components/alert-popup/alert-popup";
import PageHeading from "@/lib/components/page-heading/page-heading";
import ServerPaginatedTable from "@/lib/components/server-paginated-table/server-paginated-table";
import { useLang } from "@/lib/contexts/root.context";
import { User } from "@/lib/types/api";
import { formattedDateTime } from "@/lib/utils/dateTime.utils";
import { kebabCaseToWords } from "@/lib/utils/string.utils";
import { Role } from "@/modules/auth/hooks/role.hooks";
import {
  CheckCircleFilled,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Space, Tag, Tooltip, Typography } from "antd";
import React from "react";
import UserAvatar from "./components/user-avatar";

interface Props {}

const Users: React.FC<Props> = () => {
  const { t } = useLang();

  const onEdit = (user: User) => {
    console.log(user);
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
      // onOk: () =>
      //   dispatch(userActions.remove(user.id))
      //     .unwrap()
      //     .then(() => {
      //       onDeleteSucces(user);
      //     })
      //     .catch(console.error),
    });
  };

  return (
    <div className="relative">
      <PageHeading>{t("sidebar:users")}</PageHeading>
      <ServerPaginatedTable<User>
        url="users"
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
          },
          {
            title: "Creation Date",
            dataIndex: "created_at",
            render: (_, record) => (
              <Typography.Text className="text-textSecondary">
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
      <div className="absolute top-0 right-[58px]">
        <Button type="primary" icon={<PlusOutlined />}>
          Invite
        </Button>
      </div>
    </div>
  );
};

export default Users;
