import { GenericObject } from "@/lib/types/misc";
import { FilterOutlined } from "@ant-design/icons";
import { useDeepCompareLayoutEffect } from "ahooks";
import { Button, DatePicker, Form, Input, Select, Switch, Tooltip } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import { ComponentProps, useState } from "react";
import CustomModal from "../custom-modal/custom-modal";
import ServerPaginatedSelect from "../server-paginated-select/server-paginated-select";

type Filter = {
  label: string;
  key: string;
  value?: any;
  valueResolver?: (val: any) => any;
} & (
  | {
      type: "select";
      filterProps?: ComponentProps<typeof Select>;
    }
  | {
      type: "server-select";
      filterProps?: ComponentProps<typeof ServerPaginatedSelect>;
    }
  | {
      type: "date";
      filterProps?: ComponentProps<typeof DatePicker>;
    }
  | {
      type: "boolean";
      filterProps?: ComponentProps<typeof Switch>;
    }
  | {
      type: "search";
      filterProps?: ComponentProps<typeof Input>;
    }
);

type RenderFilterProps = {
  filter: Filter;
  value?: any;
  onChange?: (val: any, ...args: any[]) => void;
};

function RenderFilter({ filter, value, onChange }: RenderFilterProps) {
  const handleChange = (val: any, ...args: any[]) => {
    if (filter.valueResolver) val = filter.valueResolver(val);
    onChange?.(val, ...args);
  };

  switch (filter.type) {
    case "select":
      return (
        <Select
          allowClear
          {...filter.filterProps}
          value={value}
          onChange={handleChange}
        />
      );
    case "server-select":
      return (
        <ServerPaginatedSelect
          allowClear
          {...(filter.filterProps as any)}
          value={value}
          onChange={handleChange}
        />
      );
    case "date":
      return (
        <DatePicker
          allowClear
          {...filter.filterProps}
          value={value ? dayjs(value) : null}
          onChange={handleChange}
        />
      );
    case "boolean":
      return (
        <Switch
          {...filter.filterProps}
          checked={value}
          onChange={handleChange}
        />
      );
    case "search":
    default:
      return (
        <Input
          allowClear
          {...filter.filterProps}
          value={value}
          onChange={handleChange}
        />
      );
  }
}

type FiltersButtonProps = {
  filters: Filter[];
  onFiltersChange: (filters: Filter[]) => void;
  active?: boolean;
};

function FiltersButton({
  filters,
  onFiltersChange,
  active = false,
}: FiltersButtonProps) {
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const onFinish = (values: GenericObject) => {
    onFiltersChange(
      filters.map((filter) => {
        let val = values[filter.key];
        if (val?.toISOString) val = val.toISOString();
        return { ...filter, value: val };
      })
    );
    setOpen(false);
  };

  useDeepCompareLayoutEffect(() => {
    if (open)
      form.setFieldsValue(
        filters.reduce(
          (acc, filter) => ({ ...acc, [filter.key]: filter.value }),
          {}
        )
      );
  }, [filters, open]);

  return (
    <>
      <Tooltip title="Filters">
        <Button
          type={active ? "primary" : undefined}
          onClick={() => setOpen(true)}
        >
          <FilterOutlined />
        </Button>
      </Tooltip>

      <CustomModal
        open={open}
        onCancel={() => setOpen(false)}
        title="Filters"
        okText="Apply"
        onOk={form.submit}
        cancelText="Reset"
        cancelButtonProps={{
          onClick: () => {
            form.setFieldsValue(
              filters.reduce(
                (acc, filter) => ({ ...acc, [filter.key]: "" }),
                {}
              )
            );
            form.submit();
          },
        }}
      >
        <Form onFinish={onFinish} form={form} layout="vertical">
          {filters.map((filter) => (
            <Form.Item
              key={filter.key}
              name={filter.key}
              label={filter.label}
              initialValue={filter.value}
            >
              <RenderFilter filter={filter} />
            </Form.Item>
          ))}
        </Form>
      </CustomModal>
    </>
  );
}

export default FiltersButton;
