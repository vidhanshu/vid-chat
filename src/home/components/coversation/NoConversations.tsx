"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

import useChat from "@/src/home/context/chat/use-chat";

const NoConversations = () => {
  const { activeChat } = useChat();

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <MessageSquare className="w-16 h-16 text-gray-400 dark:text-gray-600" />
        </div>
        <h5 className="text-gray-600 dark:text-gray-300 text-xl mt-4 text-center">
          Start conversation with <b>{activeChat?.username}</b>
        </h5>
        <p className="max-w-[300px] text-gray-400 text-center mt-2">
          send your first message to {activeChat?.username}, using the input
          below
        </p>
      </div>
    </div>
  );
};

export default NoConversations;
