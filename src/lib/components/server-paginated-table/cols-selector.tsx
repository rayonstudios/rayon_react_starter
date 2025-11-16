import { AlignLeftOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useState } from "react";

type ColInfo = {
  key: React.Key;
  title: React.ReactNode;
};

type ColsSelectorProps = {
  allColumnsInfo: ColInfo[];
  selectedColumnKeys: string[];
  onSelectedColumnsChange: (keys: string[]) => void;
};

export default function ColsSelector({
  allColumnsInfo,
  selectedColumnKeys,
  onSelectedColumnsChange,
}: ColsSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      open={open}
      onOpenChange={(open, ctx) => ctx.source === "trigger" && setOpen(open)}
      trigger={["click"]}
      menu={{
        items: allColumnsInfo.map((col) => {
          const isSelected = selectedColumnKeys?.includes(col.key as string);
          return {
            key: col.key,
            label: (
              <Space size="small">
                <div className="w-2">{isSelected && <CheckOutlined />}</div>{" "}
                {col.title}
              </Space>
            ),
            onClick: () => {
              const newSelectedKeys = isSelected
                ? selectedColumnKeys.filter((key) => key !== col.key)
                : [...selectedColumnKeys, col.key as string];
              onSelectedColumnsChange(newSelectedKeys);
            },
          };
        }),
        selectable: true,
        selectedKeys: selectedColumnKeys,
      }}
    >
      <Button icon={<AlignLeftOutlined />}>
        Visible columns ({selectedColumnKeys?.length ?? 0}/
        {allColumnsInfo.length})
      </Button>
    </Dropdown>
  );
}
