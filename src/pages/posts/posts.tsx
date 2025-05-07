import PageHeading from "@/lib/components/page-heading/page-heading";
import ServerPaginatedTable from "@/lib/components/server-paginated-table/server-paginated-table";
import { useLang } from "@/lib/contexts/root.context";
import { getColorFromStr } from "@/lib/utils/colors";
import { formattedDateTime } from "@/lib/utils/dateTime.utils";
import { Post } from "@/modules/posts/post.types";
import { Tag, Typography } from "antd";
import React from "react";
import UserAvatar from "../users/components/user-avatar";

interface Props {}

const Posts: React.FC<Props> = () => {
  const { t } = useLang();

  return (
    <div>
      <PageHeading>{t("sidebar:posts")}</PageHeading>
      <ServerPaginatedTable<Post>
        url="posts?populate=true"
        columns={[
          {
            title: "Title",
            dataIndex: "title",
            ellipsis: true,
            fixed: "left",
            sorter: true,
          },
          {
            title: "Date",
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
            title: "Author",
            dataIndex: "author",
            render: (_, record) => <UserAvatar user={record.author} />,
          },
          {
            title: "Labels",
            dataIndex: "labels",
            render: (_, record) =>
              record.labels.map((label, ix) => (
                <Tag color={getColorFromStr(label)} key={label + ix}>
                  {label}
                </Tag>
              )),
          },
          { title: "Views", dataIndex: "views", sorter: true },
          {
            title: "Content",
            dataIndex: "text",
            width: 400,
            render: (_, record) => (
              <Typography.Text>
                {record.text.slice(0, 110)}
                {record.text.length > 110 ? "..." : ""}
              </Typography.Text>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Posts;
