import React, { ReactNode } from "react";
import { cn } from "../../../lib/utils/styles.utils";

const Center: React.FC<
  { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>
> = ({ children, ...props }) => {
  return (
    <div {...props} className={cn("grid place-items-center", props.className)}>
      {children}
    </div>
  );
};

export default Center;
