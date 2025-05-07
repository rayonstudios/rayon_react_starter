import axios from "@/lib/axios.config";
import { GenericObject } from "@/lib/types/misc";
import { isNullish } from "@/lib/utils/misc.utils";
import useUrlState from "@ahooksjs/use-url-state";
import { ReloadOutlined } from "@ant-design/icons";
import { useDeepCompareEffect, useUpdateEffect } from "ahooks";
import { Button, Table, TableProps, Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import { capitalize, pickBy } from "lodash";
import qs from "qs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FiltersButton from "./filters-button";

function generateColsFromData<T>(data: T[] = []) {
  const colKeys = new Set();
  for (const item of data) {
    Object.keys(item || {}).forEach((key) => colKeys.add(key));
  }

  const cols = [];
  for (const key of colKeys) {
    cols.push({
      title: capitalize((key as string).toString()),
      dataIndex: key,
      key,
      render: (item: any) =>
        typeof item === "string" ? item : JSON.stringify(item),
    });
  }
  return cols as ColumnsType<T>;
}

export type GetHelpers<T> = {
  data: T[];
  fetchData: () => void;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTableParams: (params: GenericObject) => void;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

export type ServerPaginatedTableProps<T> = TableProps<T> & {
  url: string;
  pageSize?: number;
  dataSource?: (data: T[]) => T[];
  onDocsChange?: (data: T[]) => void;
  style?: React.CSSProperties;
  filters?: React.ComponentProps<typeof FiltersButton>["filters"];
  optionsBar?: React.ReactNode;
  getHelpers?: (helpers: GetHelpers<T>) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => string;
  showRefresh?: boolean;
};

export default function ServerPaginatedTable<T extends AnyObject>({
  url,
  pageSize = 10,
  dataSource,
  onDocsChange,
  columns,
  style,
  filters,
  optionsBar,
  getHelpers,
  showSizeChanger = true,
  showQuickJumper = true,
  showTotal = (total, range) => `${range[0]} - ${range[1]} of ${total} items`,
  showRefresh = true,
  ...props
}: ServerPaginatedTableProps<T>) {
  const defaultSortCol = useMemo(
    () => columns?.find((col) => col.defaultSortOrder),
    [columns]
  );
  const defaultSortField =
    (defaultSortCol as any)?.dataIndex || defaultSortCol?.key || "";
  const initialState = {
    current: 1,
    pageSize,
    ...filters?.reduce(
      (acc, filter) => ({ ...acc, [`filter.${filter.key}`]: "" }),
      {}
    ),
    ["sort.field"]: defaultSortField,
    ["sort.order"]: defaultSortCol?.defaultSortOrder || "",
  };
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useUrlState(initialState, {
    parseOptions: { parseNumbers: true },
  });
  const [total, setTotal] = useState(0);

  const handleTableChange: ServerPaginatedTableProps<T>["onChange"] = (
    pagination,
    _,
    sorters
  ) => {
    const sortObj = (Array.isArray(sorters) ? sorters[0] : sorters) || {};

    // if sorter is removed from a non-default column, set it to default
    if (
      defaultSortField &&
      sortObj.field !== defaultSortField &&
      !sortObj.order
    ) {
      sortObj.field = defaultSortField;
      sortObj.order = defaultSortCol?.defaultSortOrder;
    }

    setTableParams({
      ...tableParams,
      ["sort.field"]: sortObj?.field || "",
      ["sort.order"]: sortObj?.order || "",
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    if (tableParams.pageSize !== pagination?.pageSize) {
      setData([]);
    }
  };

  const onFiltersChange = useCallback<
    React.ComponentProps<typeof FiltersButton>["onFiltersChange"]
  >((filters) => {
    setTableParams({
      ...tableParams,
      ...filters?.reduce(
        (acc, filter) => ({ ...acc, [`filter.${filter.key}`]: filter.value }),
        {}
      ),
    });
  }, []);

  useDeepCompareEffect(() => {
    fetchData();
  }, [
    pickBy(
      tableParams,
      (_, key) =>
        ["current", "pageSize"].includes(key) ||
        key.startsWith("filter.") ||
        key.startsWith("sort.")
    ),
  ]);

  useUpdateEffect(() => {
    if (typeof onDocsChange === "function" && Array.isArray(data))
      onDocsChange(data);
  }, [data]);

  const fetchData = () => {
    setLoading(true);
    const { current, pageSize, ...restParams } = tableParams;
    const [_url, _query = ""] = url.split("?");

    const query: GenericObject = qs.parse(_query);
    // pagination
    if (pageSize) {
      query.limit = pageSize;
      query.page = current;
    }
    // filters
    Object.entries(restParams).forEach(([key, value]) => {
      if (!key.startsWith("filter.")) return;
      if (!isNullish(value)) query[key.split("filter.")[1]!] = value;
    });
    // sorting
    if (restParams["sort.field"] && !isNullish(restParams["sort.order"])) {
      query.sortField = restParams["sort.field"];
      query.sortOrder = restParams["sort.order"] === "ascend" ? "asc" : "desc";
    }

    axios
      .get(`${_url}?${qs.stringify(query)}`)
      .then(({ data: { data } }) => {
        const list = (
          Array.isArray(data)
            ? data
            : Object.values(data).find((val) => Array.isArray(val)) || []
        ) as T[];

        setData(
          list.map((item, ix: number) => {
            return { ...item, key: item.id ?? ix.toString() };
          })
        );

        setTotal(data.total || list.length);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (typeof getHelpers === "function")
      getHelpers({
        data,
        fetchData,
        setData,
        setLoading,
        setTableParams,
        setTotal,
      });
  }, [data, fetchData, setData, setLoading, setTableParams, setTotal]);

  const cols = useMemo(() => {
    const colsList = Array.isArray(columns)
      ? columns
      : generateColsFromData(data);
    return colsList.map((col) => ({
      ...col,
      sortOrder:
        col.sorter &&
        tableParams["sort.field"] === ((col as any).dataIndex || col.key)
          ? tableParams["sort.order"] || undefined
          : col.defaultSortOrder,
    }));
  }, [columns, data]);

  return (
    <div className="relative">
      <div className="absolute flex flex-row items-center gap-x-3 -translate-y-full -top-6 right-0 z-10">
        {optionsBar}
        {filters?.length ? (
          <FiltersButton
            active={Object.entries(tableParams).some(
              ([key, value]) => key.startsWith("filter.") && !isNullish(value)
            )}
            filters={filters.map((filter) => ({
              ...filter,
              value: (tableParams as GenericObject)[`filter.${filter.key}`],
            }))}
            onFiltersChange={onFiltersChange}
          />
        ) : null}
        {showRefresh && (
          <Tooltip title="Reload">
            <Button onClick={fetchData}>
              <ReloadOutlined />
            </Button>
          </Tooltip>
        )}
      </div>

      <Table
        scroll={{ x: "max-content" }}
        onChange={handleTableChange}
        dataSource={typeof dataSource === "function" ? dataSource(data) : data}
        loading={loading}
        columns={cols}
        style={style}
        pagination={{
          total,
          current: tableParams.current,
          pageSize: tableParams.pageSize,
          showSizeChanger,
          showQuickJumper,
          showTotal,
        }}
        {...props}
      />
    </div>
  );
}
