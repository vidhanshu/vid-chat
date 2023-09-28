"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { ServerCrash } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-100">
          <ServerCrash className="w-16 h-16 text-gray-400" />
        </div>
        <h5 className="text-gray-600 text-xl mt-4 text-center">
          Something went wrong!
        </h5>
        <p className="max-w-[300px] text-gray-400 text-center mt-2">
          Please press the reset button to try again
        </p>
        <Button className="mt-8" onClick={reset}>
          Reset & Retry
        </Button>
      </div>
    </div>
  );
}
