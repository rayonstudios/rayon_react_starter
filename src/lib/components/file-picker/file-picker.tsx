import { useRootContextValues } from "@/lib/contexts/root.context";
import { fileNameFromUrl } from "@/lib/utils/misc.utils";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import React, { useMemo } from "react";

type ConsistentFile = {
  src: string;
  name: string;
};

type AnyFile = File | string;

type Props = {
  value?: AnyFile[];
  count?: number;
  onChange?: (files: AnyFile[]) => void;
  accept?: string;
  loading?: boolean;
};

function toConsistentFile(file: AnyFile): ConsistentFile {
  return {
    src: typeof file === "string" ? file : URL.createObjectURL(file),
    name: typeof file === "string" ? fileNameFromUrl(file)! : file.name,
  };
}

const FilePicker: React.FC<Props> = ({
  value,
  count,
  onChange,
  accept,
  loading,
}) => {
  const { openFile } = useRootContextValues();
  const _value = useMemo(() => value?.map(toConsistentFile) || [], [value]);

  return (
    <div className="flex flex-col gap-y-2">
      <Button
        loading={loading}
        icon={<UploadOutlined />}
        disabled={_value.length === count}
        onClick={() =>
          openFile({
            accept,
            multiple: true,
            onChange: (files) =>
              onChange?.([...(value || []), ...files].slice(0, count) as any),
          })
        }
      >
        Upload
      </Button>
      {_value.map((file, ix) => (
        <Space align="center" key={file.name || ix}>
          {file && (
            <Typography.Text
              onClick={() => file.src && window.open(file.src, "_blank")}
              className="text-xs"
            >
              {file.name || "Unnamed File"}
            </Typography.Text>
          )}
          <CloseCircleOutlined
            className="text-danger mt-[5px]"
            onClick={() =>
              onChange?.(_value.filter((_, _ix) => ix !== _ix) as any)
            }
          />
        </Space>
      ))}
    </div>
  );
};

export default FilePicker;
