import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

const ConversationSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="flex-grow flex flex-col p-4 gap-y-4">
      {Array(count)
        .fill(1)
        .map((_, i) => (
          <Convo id={i} key={i} />
        ))}
    </div>
  );
};

const Convo = ({ id }: { id: number }) => (
  <div
    className={cn(
      "flex items-center gap-x-4",
      id & 1 ? "flex-row-reverse" : ""
    )}
  >
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="flex flex-col gap-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className={cn("h-8 w-[200px]", id & 1 ? "self-end" : "")} />
    </div>
  </div>
);

export default ConversationSkeleton;
