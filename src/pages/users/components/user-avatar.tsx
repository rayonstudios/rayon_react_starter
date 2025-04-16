import ServerImg from "@/lib/components/server-img/server-img";
import { User } from "@/lib/types/api";
import { Space, Typography } from "antd";
import React from "react";

interface Props {
  user: Pick<User, "name" | "email" | "photo">;
}

const UserAvatar: React.FC<Props> = ({ user }) => {
  return (
    <Space size="small">
      <ServerImg
        src={user.photo}
        loader={{ shape: "circle", type: "skeleton" }}
        defaultHeight={36}
        defaultWidth={36}
      />
      <div className="flex flex-col">
        <Typography.Text className="text-xs">{user.name}</Typography.Text>
        <Typography.Text className="text-xs" type="secondary">
          {user.email}
        </Typography.Text>
      </div>
    </Space>
  );
};

export default UserAvatar;
