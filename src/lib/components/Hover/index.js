import React, { useCallback, useState } from "react";

export default function Hover({
  element,
  style,
  hoverStyle,
  children,
  onHover,
}) {
  const [appliedStyle, setAppliedStyle] = useState(style);

  const onMouseOver = useCallback(() => {
    setAppliedStyle({ ...style, ...hoverStyle });
    typeof onHover === "function" && onHover(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setAppliedStyle(style);
    typeof onHover === "function" && onHover(false);
  }, []);

  const args = [
    element || children,
    {
      style: {
        ...(element?.props?.style || children?.props?.style || {}),
        ...appliedStyle,
      },
      onMouseOver,
      onMouseOut,
    },
    element ? children : children?.props?.children,
  ];

  return typeof element === "string"
    ? React.createElement(...args)
    : React.cloneElement(...args);
}
