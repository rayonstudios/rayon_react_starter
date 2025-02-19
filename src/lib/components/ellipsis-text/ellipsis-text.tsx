import { Tooltip, Typography } from "antd";
import React from "react";

interface Props {
  showTooltip?: boolean;
}

const EllipsisText: React.FC<
  Props & React.ComponentProps<typeof Typography.Text>
> = ({ showTooltip = true, ...props }) => {
  const node = <Typography.Text ellipsis {...props} />;

  return showTooltip ? <Tooltip title={props.children}>{node}</Tooltip> : node;
};

export default EllipsisText;
