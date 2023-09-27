import React from "react";
import { MessageSquare } from "lucide-react";

const NoActiveChat = () => {
  return (
    <div className="h-[calc(100vh_-_270px)] flex justify-center items-center">
      <div className="flex flex-col gap-y-4 items-center">
        <MessageSquare size={64} className="text-gray-400" />
        <h5 className="font-semibold text-lg text-gray-400">
          No chat selected
        </h5>
      </div>
    </div>
  );
};

export default NoActiveChat;
