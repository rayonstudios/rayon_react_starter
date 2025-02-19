//@ts-nocheck
import { useRootContextValues } from "@/lib/contexts/root.context";
import { CloseCircleFilled } from "@ant-design/icons";
import { List } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { arrayExtend, placeholderImg } from "../../../lib/utils/misc.utils";
import Hover from "../Hover";

import ServerImg from "../serverImg/serverImg";

function isValid(img) {
  return img.type?.startsWith("image/");
}

function urlToImg(url) {
  return {
    src: url,
    type: "image/",
  };
}

export default function ImagePicker({
  count,
  width = 120,
  height = 100,
  gutter = 16,
  listProps = {},
  imgProps = {},
  onChange = () => {},
  value,
  editable = true,
}) {
  const _value = useMemo(
    () =>
      value?.map((item) => (typeof item === "string" ? urlToImg(item) : item)),
    [value]
  );

  const { openFile, ip } = useRootContextValues();
  const [images, setImages] = useState(
    _value ? arrayExtend(_value, count) : Array(count).fill({})
  );

  useEffect(() => {
    onChange && onChange(images.filter(isValid));
  }, [images]);

  useEffect(() => {
    if (
      Array.isArray(_value) &&
      JSON.stringify(arrayExtend(_value, count)) !== JSON.stringify(images)
    )
      setImages(arrayExtend(_value, count));
  }, [_value]);

  const fillImagesArr = useCallback(
    (files, start) => {
      const newImages = [...images];
      let count = 0,
        i = 0;
      while (count < newImages.length && i < files.length) {
        const ix = (start + count) % newImages.length;
        if (!isValid(newImages[ix])) {
          newImages[ix] = files[i];
          newImages[ix].src = URL.createObjectURL(files[i]);
          i++;
        }
        count++;
      }
      setImages(newImages);
    },
    [images]
  );

  const onClose = useCallback(
    (i) => {
      const newImages = images.map((img, ix) => (ix === i ? {} : img));

      if (ip?.current) {
        ip.current.value = null;
      }

      setImages(newImages);
    },
    [images]
  );

  return (
    <List
      grid={{ count, gutter }}
      style={{
        width: count * width + (count - 1) * gutter,
      }}
      dataSource={images}
      renderItem={(img, i) => {
        const isImageValid = isValid(img);
        return (
          <List.Item
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              !isImageValid &&
              editable &&
              openFile({
                onChange: (files) => fillImagesArr(files, i),
                accept: "image/*",
              })
            }
          >
            <ServerImg
              style={{
                border: isImageValid ? "none" : "1px solid #99999933",
                objectFit: "cover",
                width,
                height,
              }}
              loader={{ type: "spin", shape: "square" }}
              src={isImageValid ? img.src : placeholderImg}
              {...imgProps}
              preview={isImageValid ? true : false}
            />
            {isImageValid && editable && (
              <Hover hoverStyle={{ transform: `scale(1.15, 1.15)` }}>
                <CloseCircleFilled
                  title={"remove"}
                  onClick={() => onClose(i)}
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: 0,
                    fontSize: 16,
                    color: "#EC4949",
                    transition: "transform 0.4s",
                  }}
                />
              </Hover>
            )}
          </List.Item>
        );
      }}
      {...listProps}
    />
  );
}
