import { Loader2 } from "lucide-react";
import React from "react";

const GenericLoadingPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Loader2 className="w-20 h-20 animate-spin" />
    </div>
  );
};

export default GenericLoadingPage;
