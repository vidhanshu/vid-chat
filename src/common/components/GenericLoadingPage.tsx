import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { HTMLAttributes } from "react";

const GenericLoadingPage: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "h-screen w-screen flex justify-center items-center",
        className
      )}
      {...props}
    >
      <Loader2 className="w-20 h-20 animate-spin" />
    </div>
  );
};

export default GenericLoadingPage;
