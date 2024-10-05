import { GenericObject } from "@/lib/types/misc";
import { FilterOutlined } from "@ant-design/icons";
import { useDeepCompareLayoutEffect } from "ahooks";
import { Button, DatePicker, Form, Input, Select, Switch, Tooltip } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import CustomModal from "../custom-modal/custom-modal";
import ServerPaginatedSelect from "../server-paginated-select/server-paginated-select";

type Filter = {
  label: string;
  key: string;
  type: "select" | "server-select" | "date" | "boolean" | "search";
  filterProps?: GenericObject;
  value?: any;
};

type RenderFilterProps = {
  filter: Filter;
  value?: any;
  onChange?: (value: any) => void;
};

function RenderFilter({ filter, value, onChange }: RenderFilterProps) {
  switch (filter.type) {
    case "select":
      return (
        <Select
          {...filter.filterProps}
          allowClear
          value={value}
          onChange={onChange}
        />
      );
    case "server-select":
      return (
        <ServerPaginatedSelect
          {...(filter.filterProps as any)}
          allowClear
          onChange={onChange}
          value={value}
        />
      );
    case "date":
      return (
        <DatePicker
          {...filter.filterProps}
          allowClear
          onChange={onChange}
          value={value}
        />
      );
    case "boolean":
      return <Switch checked={value} onChange={onChange} />;
    case "search":
      return (
        <Input
          {...filter.filterProps}
          allowClear
          onChange={onChange}
          value={value}
        />
      );
    default:
      return (
        <Input
          {...filter.filterProps}
          allowClear
          onChange={onChange}
          value={value}
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
