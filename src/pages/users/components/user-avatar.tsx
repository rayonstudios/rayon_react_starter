import ServerImg from "@/lib/components/server-img/server-img";
import { User } from "@/lib/types/api";
import { kebabCaseToWords } from "@/lib/utils/string.utils";
import { Space, Typography } from "antd";
import React from "react";

interface Props {
  user: Pick<User, "name" | "email" | "photo" | "role">;
  imgPreview?: boolean;
  showRole?: boolean;
}

const UserAvatar: React.FC<Props> = ({ user, imgPreview, showRole }) => {
  return (
    <Space size="small">
      <ServerImg
        src={user.photo}
        loader={{ shape: "circle", type: "skeleton" }}
        defaultHeight={36}
        defaultWidth={36}
        preview={imgPreview}
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <Typography.Text className="text-xs">
            {user.name}
            {showRole ? ` (${kebabCaseToWords(user.role ?? "")})` : ""}
          </Typography.Text>
        </div>
        <Typography.Text className="text-xs" type="secondary">
          {user.email}
        </Typography.Text>
      </div>
    </Space>
  );
};

export default UserAvatar;
