import React from "react";

import Navbar from "@/src/common/components/Navbar";

import ChatProvider from "@/src/home/context/chat/chat.provider";
import SocketProvider from "@/src/home/context/socket/socket.provider";
import ModelsProvider from "@/src/common/components/providers/modals-provider";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <ChatProvider>
        <Navbar />
        {children}
        <ModelsProvider/>
      </ChatProvider>
    </SocketProvider>
  );
};

export default MainLayout;
