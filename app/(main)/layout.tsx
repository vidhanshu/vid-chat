import React from "react";

import Navbar from "@/src/common/components/Navbar";
import ChatProvider from "@/src/home/context/chat/chat.provider";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatProvider>
      <>
        <Navbar />
        {children}
      </>
    </ChatProvider>
  );
};

export default MainLayout;
