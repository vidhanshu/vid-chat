import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const SidebarSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array(count)
        .fill(1)
        .map((_, i) => (
          <div key={i} className={"flex items-center gap-x-4"}>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className={"h-8 w-[200px]"} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SidebarSkeleton;
