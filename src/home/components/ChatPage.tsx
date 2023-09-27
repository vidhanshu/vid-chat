"use client";

import React, { useEffect } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Sidebar from "./sidebar/Sidebar";
import ConversationSection from "./coversation/ConversationSection";

import useSocket from "@/src/home/context/socket/use-socket";
import { useAuth } from "@/src/auth/context/use-auth";
import { Button } from "@/components/ui/button";

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
      socket?.off("addUser");
    };
  }, [socket, user?._id]);

  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="mb-2">
            <Button>Users</Button>
          </SheetTrigger>
          <SheetContent className="px-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:grid md:grid-cols-12 border-[1px] rounded-sm h-[calc(100vh_-_150px)]">
        <Sidebar className="hidden md:block" />
        <ConversationSection />
      </div>
    </>
  );
};

export default ChatPage;
