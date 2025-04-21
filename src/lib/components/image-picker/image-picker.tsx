import { useRootContextValues } from "@/lib/contexts/root.context";
import { isImage } from "@/lib/utils/image.utils";
import { arrayExtend } from "@/lib/utils/misc.utils";
import { cn } from "@/lib/utils/styles.utils";
import { CloseCircleFilled } from "@ant-design/icons";
import { useUpdateEffect } from "ahooks";
import { List } from "antd";
import { useEffect, useMemo, useState } from "react";
import Hover from "../hover/hover";
import ServerImg, { placeholderImg } from "../server-img/server-img";

function urlToImg(url: string) {
  return {
    src: url,
    type: "image/",
  };
}

type ImagePickerProps = {
  count: number;
  width?: number;
  height?: number;
  gutter?: number;
  listProps?: React.ComponentProps<typeof List>;
  imgProps?: React.ComponentProps<typeof ServerImg>;
  onChange?: (images: any[]) => void;
  value?: string[];
  editable?: boolean;
};

export default function ImagePicker({
  count,
  width = 120,
  height = 120,
  gutter = 16,
  listProps = {},
  imgProps = {},
  onChange = () => {},
  value,
  editable = true,
}: ImagePickerProps) {
  const _value = useMemo(
    () =>
      value?.map((item) => (typeof item === "string" ? urlToImg(item) : item)),
    [value]
  );

  const { openFile } = useRootContextValues();
  const [images, setImages] = useState(
    _value ? arrayExtend(_value, count) : Array(count).fill({})
  );

  useUpdateEffect(() => {
    onChange && onChange(images.filter(isImage));
  }, [images]);

  useEffect(() => {
    if (
      Array.isArray(_value) &&
      JSON.stringify(arrayExtend(_value, count)) !== JSON.stringify(images)
    )
      setImages(arrayExtend(_value, count));
  }, [_value]);

  const fillImagesArr = (files: File[], start: number) => {
    const newImages = [...images];
    let count = 0,
      i = 0;
    while (count < newImages.length && i < files.length) {
      const ix = (start + count) % newImages.length;
      if (!isImage(newImages[ix])) {
        newImages[ix] = files[i];
        newImages[ix].src = URL.createObjectURL(files[i]!);
        i++;
      }
      count++;
    }
    setImages(newImages);
  };

  const onClose = (i: number) => {
    const newImages = images.map((img, ix) => (ix === i ? {} : img));
    setImages(newImages);
  };

  return (
    <List
      grid={{ gutter }}
      style={{
        width: count * width + (count - 1) * gutter,
      }}
      dataSource={images}
      renderItem={(img, i) => {
        const isImageValid = isImage(img as any);
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
              }}
              defaultHeight={height}
              defaultWidth={width}
              loader={{ type: "spin", shape: "square" }}
              src={isImageValid ? (img as any).src : placeholderImg}
              {...imgProps}
              preview={isImageValid ? true : false}
            />
            {isImageValid && editable && (
              <Hover hoverStyle={{ transform: `scale(1.15, 1.15)` }}>
                <CloseCircleFilled
                  title="remove"
                  onClick={() => onClose(i)}
                  className={cn(
                    "text-danger absolute text-base transition-transform duration-300",
                    imgProps.loader?.shape === "circle"
                      ? "right-[24px] top-[1px]"
                      : "right-0 top-[-8px]"
                  )}
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
