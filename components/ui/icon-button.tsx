import { cn } from "@/lib/utils";
import React, { FC } from "react";

const IconButton: FC<React.ButtonHTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default IconButton;
