import { Select, Skeleton } from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef } from "react";

type LazySelectProps = {
  style?: React.CSSProperties;
  dataSource: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  onEndReached: () => void;
  skeletonEntriesCount?: number;
  endReachedPercent?: number;
  debouncing?: number;
  loading?: boolean;
  skeletonProps?: any;
  valueResolver?: (item: any) => any;
  idResolver?: (value: any) => any;
  onChange?: (value: any) => void;
  value?: any;
  defaultValue?: any;
};

function LazySelect({
  style,
  dataSource,
  renderItem,
  onEndReached,
  skeletonEntriesCount = 4,
  endReachedPercent = 80,
  debouncing = 800,
  loading,
  skeletonProps,
  valueResolver, //how to get value from item when onChange is called
  idResolver, //how to get unique id from above value (valueResolver)
  onChange,
  value,
  defaultValue,
  ...props
}: LazySelectProps) {
  const onEndReachedRef = useRef<Function>(() => {});

  useEffect(() => {
    onEndReachedRef.current = onEndReached;
  }, [onEndReached]);

  const _onEndReached = useCallback(
    debounce(() => onEndReachedRef.current?.(), debouncing, {
      leading: true,
      trailing: false,
    }),
    [debouncing]
  );

  const onScrollDown = useCallback(
    (e: any) => {
      e = e.target;
      const clientHeight = e.clientHeight;
      const currentScroll = e.scrollTop;
      const maxScroll = e.scrollHeight - clientHeight;
      const currentPercent = (currentScroll / maxScroll) * 100;

      if (currentPercent > endReachedPercent) _onEndReached();
    },
    [endReachedPercent, _onEndReached]
  );

  const _onChange = useCallback(
    (id: any) => {
      let multiple = true;
      if (!Array.isArray(id)) {
        id = [id];
        multiple = false;
      }

      const values = id.map((_id: any) => {
        const item = dataSource.find((item) => item.id === _id);
        return typeof valueResolver === "function" ? valueResolver(item) : item;
      });

      typeof onChange === "function" && onChange(multiple ? values : values[0]);
    },
    [dataSource, onChange, valueResolver]
  );

  const _idResolver = useCallback(
    (val: any) => {
      if (val === undefined) return val;

      let multiple = true;
      if (!Array.isArray(val)) {
        val = [val];
        multiple = false;
      }

      const values = val.map((_val: any) =>
        typeof idResolver === "function" && _val ? idResolver(_val) : _val
      );
      return multiple ? values : values[0];
    },
    [idResolver]
  );

  const data = loading
    ? dataSource.concat(...Array(skeletonEntriesCount).fill({ _loading: true }))
    : dataSource;

  return (
    <Select
      onPopupScroll={onScrollDown}
      onChange={_onChange}
      style={style}
      value={_idResolver(value)}
      defaultValue={_idResolver(defaultValue)}
      // @ts-ignore
      options={data.map((item, ix) => {
        const value = item._loading ? ix + "loading" : item.id;
        const children: any =
          typeof renderItem === "function" && !item?._loading
            ? renderItem(item, ix)
            : null;

        if (!item?._loading && !children) return null;

        return {
          data: item,
          node: children?.node,
          value,
          label: (
            <Skeleton
              title={false}
              paragraph={{ rows: 1 }}
              active
              {...skeletonProps}
              loading={item?._loading}
            >
              {children?.node || null}
            </Skeleton>
          ),
          disabled: item?._loading || children?.disabled,
        };
      })}
      {...props}
    />
  );
}

export default LazySelect;
