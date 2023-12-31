import { cn } from "@/lib/utils";
import React, { FC } from "react";

const IconButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition dark:hover:bg-gray-700 dark:active:bg-gray-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
