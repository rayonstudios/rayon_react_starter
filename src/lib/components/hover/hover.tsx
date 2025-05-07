import React, {
  CSSProperties,
  ReactElement,
  useCallback,
  useState,
} from "react";

interface HoverProps {
  element?: string | React.ElementType;
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
  children?: ReactElement;
  onHover?: (isHovered: boolean) => void;
}

export default function Hover({
  element,
  style = {},
  hoverStyle = {},
  children,
  onHover,
}: HoverProps) {
  const [appliedStyle, setAppliedStyle] = useState<CSSProperties>(style);

  const onMouseOver = useCallback(() => {
    setAppliedStyle({ ...style, ...hoverStyle });
    typeof onHover === "function" && onHover(true);
  }, [style, hoverStyle, onHover]);

  const onMouseOut = useCallback(() => {
    setAppliedStyle(style);
    typeof onHover === "function" && onHover(false);
  }, [style, onHover]);

  const elementType = element || "div";
  const props = {
    style: {
      ...(children?.props?.style || {}),
      ...appliedStyle,
    },
    onMouseOver,
    onMouseOut,
  };
  const childContent = element ? children : children?.props?.children;

  return typeof element === "string"
    ? React.createElement(elementType, props, childContent)
    : React.cloneElement(children as ReactElement, props);
}
