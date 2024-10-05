import axios from "@/lib/axios.config";
import { useStateCallback } from "@/lib/hooks/useStateCallback";
import { GenericObject } from "@/lib/types/misc";
import { useDeepCompareEffect } from "ahooks";
import { Select } from "antd";
import { debounce, uniqBy } from "lodash";
import qs from "qs";
import { useCallback, useEffect, useRef, useState } from "react";
import LazySelect from "./lazy-select";

type ServerPaginatedSelectProps = React.ComponentProps<typeof Select> & {
  url: string;
  pageSize?: number;
  renderItem: (item: any) => { node: React.ReactNode; disabled?: boolean };
  valueResolver: (item: any) => string;
  style?: React.CSSProperties;
  onChange?: (value: any, option: any) => void;
  value?: any;
  dataSource?: (data: any[]) => any[];
  searchDebouncing?: number;
  fetchDefaultValue: (value: any) => Promise<any>;
};

export default function ServerPaginatedSelect({
  url,
  pageSize = 0, // 0 means no pagination
  renderItem,
  valueResolver = (item: any) => item?.id,
  style,
  onChange,
  value,
  dataSource,
  searchDebouncing = 500,
  fetchDefaultValue = (id: string) =>
    axios
      .get(`${url.split("?")[0]}/${id}`)
      .then((res) => res.data)
      .catch(console.error),
  ...props
}: ServerPaginatedSelectProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [noMore, setNoMore] = useStateCallback(false);
  const [currPage, setCurrPage] = useState(1);
  const [opened, setOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const _fetchData = useRef<Function>(() => {});

  const fetchData = () => {
    if (noMore) return;

    setLoading(true);
    const [_url, query = ""] = url.split("?");

    const filters: GenericObject = qs.parse(query) ?? {};
    if (pageSize) {
      filters.limit = pageSize;
      filters.page = currPage;
    }
    if (searchTerm) filters.name = searchTerm;

    axios
      .get(`${_url}?${qs.stringify(filters)}`)
      .then(({ data }) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.docs)
          ? data.docs
          : [];

        if (!pageSize || list.length < pageSize) setNoMore(true);

        setData((prev) => uniqBy(prev.concat(list), "id") as any[]);
      })
      //@ts-ignore
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    _fetchData.current = fetchData;
  }, [fetchData]);

  useEffect(() => {
    if (!opened) return;
    setData([]);
    setCurrPage(1);
    setNoMore(false, () => setTimeout(() => _fetchData.current(), 100));
  }, [opened]);

  const search = useCallback(
    debounce(() => {
      if (!opened) return;
      setData([]);
      setCurrPage(1);
      setNoMore(false, () => setTimeout(() => _fetchData.current(), 100));
    }, searchDebouncing),
    [searchDebouncing, opened]
  );

  const onSearch = useCallback(
    (value: string) => {
      if (value.length > 1 && value.length < 3) return;
      setSearchTerm(value);
      if (pageSize) search();
    },
    [search]
  );

  useDeepCompareEffect(() => {
    const val = props?.defaultValue ?? value;

    if (
      val &&
      !data.find((item) => valueResolver(item) === val) &&
      fetchDefaultValue
    ) {
      fetchDefaultValue(val)
        .then((item) =>
          setData((prev) => uniqBy(prev.concat(item), "id") as any[])
        )
        .catch(console.error);
    }
  }, [props?.defaultValue]);

  const _data = dataSource ? dataSource(data) : data;

  return (
    <LazySelect
      onChange={(value: any) => {
        onChange?.(
          value,
          _data.find((item) => valueResolver(item) === value)
        );
      }}
      onEndReached={() => {
        _fetchData.current();
      }}
      loading={loading}
      dataSource={_data}
      // @ts-ignore
      renderItem={renderItem}
      valueResolver={valueResolver}
      style={style}
      skeletonEntriesCount={3}
      onDropdownVisibleChange={(open: boolean) => setOpened(open)}
      showSearch
      allowClear
      filterOption={!pageSize}
      onSearch={onSearch}
      value={value}
      optionFilterProp={pageSize ? undefined : "node"}
      {...props}
    />
  );
}
