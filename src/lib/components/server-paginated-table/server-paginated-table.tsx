import axios from "@/lib/axios.config";
import { GenericObject } from "@/lib/types/misc";
import { isNullish } from "@/lib/utils/misc.utils";
import useUrlState from "@ahooksjs/use-url-state";
import { useDeepCompareEffect, useUpdateEffect } from "ahooks";
import { Table, TableProps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { capitalize, pickBy } from "lodash";
import qs from "qs";
import React, { useCallback, useEffect, useState } from "react";
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
  return cols;
}

export type GetHelpers<T> = {
  data: T[];
  fetchData: Function;
  setData: Function;
  setLoading: Function;
  setTableParams: Function;
  setTotal: Function;
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
};

export default function ServerPaginatedTable<T extends AnyObject>({
  url,
  pageSize = 20,
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
  ...props
}: ServerPaginatedTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useUrlState(
    {
      current: 1,
      pageSize,
      ...filters?.reduce(
        (acc, filter) => ({ ...acc, [`filter.${filter.key}`]: "" }),
        {}
      ),
    },
    { parseOptions: { parseNumbers: true } }
  );
  const [total, setTotal] = useState(0);

  const handleTableChange: ServerPaginatedTableProps<T>["onChange"] = (val) => {
    setTableParams({
      ...tableParams,
      current: val.current,
      pageSize: val.pageSize,
    });
    if (tableParams.pageSize !== val?.pageSize) {
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
        ["current", "pageSize"].includes(key) || key.startsWith("filter.")
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
    if (pageSize) {
      query.per_page = pageSize;
      query.page = current - 1;
    }
    Object.entries(restParams).forEach(([key, value]) => {
      if (!key.startsWith("filter.")) return;
      if (!isNullish(value)) query[key.split("filter.")[1]] = value;
    });

    axios
      .get(`${_url}?${qs.stringify(query)}`)
      .then(({ data }) => {
        const list = (
          Array.isArray(data)
            ? data
            : Object.values(data).find((val) => Array.isArray(val)) || []
        ) as T[];

        setData(
          list.map((item, ix: number) => {
            // @ts-ignore
            item.key = item.id ?? ix.toString();
            return item;
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
      </div>
      <Table
        scroll={{ x: "max-content" }}
        onChange={handleTableChange}
        dataSource={typeof dataSource === "function" ? dataSource(data) : data}
        loading={loading}
        //@ts-ignore
        columns={Array.isArray(columns) ? columns : generateColsFromData(data)}
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
