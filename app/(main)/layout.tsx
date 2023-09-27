import React from "react";

import Navbar from "@/src/common/components/Navbar";
import ChatProvider from "@/src/home/context/chat/chat.provider";
import SocketProvider from "@/src/home/context/socket/socket.provider";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <ChatProvider>
        <Navbar />
        {children}
      </ChatProvider>
    </SocketProvider>
  );
};

export default MainLayout;
