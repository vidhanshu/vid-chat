"use client";

import React from "react";
import { ChatContext } from "./chat.context";

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeChat, setActiveChat] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  return (
    <ChatContext.Provider
      value={{ activeChat, setActiveChat, setMessages, messages, loading }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
