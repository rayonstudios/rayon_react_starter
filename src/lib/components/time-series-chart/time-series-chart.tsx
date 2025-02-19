import { GenericObject } from "@/lib/types/misc";
import { formattedNumber } from "@/lib/utils/number.utils";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Empty, theme, Typography } from "antd";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props<T> = {
  title?: string;
  data?: T[];
  lines: { key: string; color?: string }[];
  width?: number | string;
  height?: number | string;
  total: number;
  per: number;
};

function TimeSeriesChart<T extends GenericObject>({
  title,
  data,
  lines,
  width = "100%",
  height = 300,
  total,
  per = 0,
}: Props<T>) {
  const { token } = theme.useToken();
  return (
    <div className="py-4 pr-4 inline-flex flex-col gap-2 border-[1px] border-solid border-stone-300 rounded-md w-full">
      <Typography.Title className="m-0 ml-4" level={4}>
        {title}
      </Typography.Title>
      <span className="ml-4 mb-2">
        Total : {formattedNumber(total)}
        {per >= 0 ? (
          <span className="text-green-500 ml-2">
            {formattedNumber(Math.round(per))}%
            <ArrowUpOutlined />
          </span>
        ) : (
          <span>
            {per}
            <ArrowDownOutlined style={{ color: "red" }} />
          </span>
        )}
      </span>

      <ResponsiveContainer width={width} height={height}>
        {!data?.length ? (
          <div className="w-full h-full grid place-items-center">
            <Empty />
          </div>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis type="number" domain={["dataMin", "dataMax"]} />
            <Tooltip />
            {lines.map(({ key, color }) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color || token.colorPrimary}
              />
            ))}
            {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default TimeSeriesChart;
