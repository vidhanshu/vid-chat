"use client";

import React, { useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Conversation from "./Conversation";
import useSocket from "@/src/common/context/socket/use-socket";
import { useAuth } from "@/src/auth/context/use-auth";

const ChatPage = () => {
  const { socket } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", {
        userId: user?._id,
        username: user?.username,
      });
    }
    return () => {
      socket?.off();
    };
  }, [socket, user?._id]);

  return (
    <div className="grid grid-cols-12 border-[1px] h-[900px]">
      <Sidebar />
      <Conversation />
    </div>
  );
};

export default ChatPage;
