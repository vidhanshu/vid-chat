"use client";

import React, { useEffect, useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Sidebar from "@/src/home/components/sidebar/Sidebar";
import ConversationSection from "@/src/home/components/coversation/ConversationSection";


import useSocket from "@/src/home/context/socket/use-socket";
import useAuth from "@/src/auth/context/use-auth";

const ChatPage = () => {
  const { socket } = useSocket();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

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
      <div className="lg:hidden">
        <Sheet
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setOpen(false);
            }
          }}
        >
          <SheetTrigger onClick={() => setOpen(true)} className="mb-2">
            <Button>Users</Button>
          </SheetTrigger>
          <SheetContent className="px-0">
            <Sidebar onUserClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
      <div className="lg:grid lg:grid-cols-12 border-[1px] rounded-sm h-[calc(100vh_-_150px)]">
        <Sidebar className="hidden lg:block" />
        <ConversationSection />
      </div>
    </>
  );
};

export default ChatPage;
