import PageHeading from "@/lib/components/page-heading/page-heading";
import ServerPaginatedTable from "@/lib/components/server-paginated-table/server-paginated-table";
import { useLang } from "@/lib/contexts/root.context";
import { User } from "@/lib/types/api";
import { formattedDateTime } from "@/lib/utils/dateTime.utils";
import { kebabCaseToWords } from "@/lib/utils/string.utils";
import { CheckCircleFilled } from "@ant-design/icons";
import { Tag, Typography } from "antd";
import React from "react";
import UserAvatar from "./components/user-avatar";

interface Props {}

const Users: React.FC<Props> = () => {
  const { t } = useLang();

  return (
    <div>
      <PageHeading>{t("sidebar:users")}</PageHeading>
      <ServerPaginatedTable<User>
        url="users"
        columns={[
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
            title: "User",
            dataIndex: "name",
            render: (_, record) => <UserAvatar user={record} />,
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
        ]}
      />
    </div>
  );
};

export default Users;
