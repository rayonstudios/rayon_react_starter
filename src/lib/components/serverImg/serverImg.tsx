//@ts-nocheck
import { cn } from "@/lib/utils/styles.utils";
import { EyeOutlined } from "@ant-design/icons";
import { Image, Skeleton, Spin } from "antd";
import { useCallback, useState } from "react";
import { placeholderImg, randHashString } from "../../../lib/utils/misc.utils";
import Hover from "../Hover";

//loader.type: skeleton | spin
//loader.shape: circle | square
export default function ServerImg({
  loader = { type: "skeleton", shape: "square" },
  defaultWidth = 400,
  defaultHeight = 250,
  fallback = placeholderImg,
  ...props
}) {
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);
  const [id] = useState(props.id || randHashString(8));

  const onLoad = useCallback(() => {
    setLoading(false);
    if (typeof props.onLoad === "function") props.onLoad();
  }, [props.onLoad]);

  const onHover = useCallback((val) => setHover(val), []);

  const onClick = useCallback(() => {
    const elem = document.getElementById(id);
    elem && elem.click();
  }, [id]);

  return (
    <>
      {loading ? (
        loader.type === "skeleton" ? (
          <Skeleton.Avatar
            active
            size={
              props.style?.width ||
              defaultWidth ||
              props.style?.height ||
              defaultHeight
            }
            shape={loader.shape}
          />
        ) : loader.type === "spin" ? (
          <div
            className={"grid-center"}
            style={{
              width: props.style?.width || defaultWidth,
              height: props.style?.height || defaultHeight,
              borderRadius: loader.shape === "circle" ? "50%" : undefined,
              backgroundColor: "rgba(0,0,0,0.03)",
            }}
          >
            <Spin size="small" />
          </div>
        ) : (
          loader
        )
      ) : null}
      <div
        style={{
          position: "relative",
          width: props.style?.width || defaultWidth,
          height: props.style?.height || defaultHeight,
          display: loading && "none",
          cursor: props.preview && "pointer",
        }}
      >
        <Image
          {...props}
          src={props?.src || fallback}
          id={id}
          style={props?.style || {}}
          fallback={fallback}
          width={props.style?.width || defaultWidth}
          height={props.style?.height || defaultHeight}
          onError={onLoad}
          onLoad={onLoad}
          className={cn("object-cover", props.className)}
        />
        {props.preview ? (
          <Hover onHover={onHover}>
            <div
              onClick={onClick}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                opacity: hover ? 1 : 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                transition: "opacity 0.4s",
              }}
            >
              <EyeOutlined />
              <span style={{ marginLeft: 3 }}>Preview</span>
            </div>
          </Hover>
        ) : null}
      </div>
    </>
  );
}
