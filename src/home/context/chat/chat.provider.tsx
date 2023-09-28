"use client";

import React, { useEffect } from "react";

import { ChatContext } from "./chat.context";

import useSocket from "@/src/home/context/socket/use-socket";

import { ChatService } from "@/src/home/service/chat.service";

import { TChat } from "@/src/home/types";
import { TUser } from "@/src/auth/types";
import { TMessage, TOnlineUsers } from "@/src/home/types";

const chatService = new ChatService();
const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useSocket();
  // currently going on chat
  const [activeChat, setActiveChat] = React.useState<TUser | null>(null);
  // all recent chats
  const [activeChats, setActiveChats] = React.useState<TChat[]>([]);
  const [onlineUsers, setOnlineUsers] = React.useState<TOnlineUsers>({});
  const [messages, setMessages] = React.useState<TMessage[]>([]);
  const [loading, setLoading] = React.useState({
    messages: false,
    chats: false,
  });

  useEffect(() => {
    async function fetchMessages() {
      setLoading((prev) => ({ ...prev, messages: true }));
      const { data, error } = await chatService.getConversation(
        activeChat?._id || null
      );
      if (!error) {
        setMessages(data);
      }
      setLoading((prev) => ({ ...prev, messages: false }));
    }
    fetchMessages();
  }, [activeChat?._id]);

  useEffect(() => {
    async function fetchChats() {
      setLoading((prev) => ({ ...prev, chats: true }));
      const { data, error } = await chatService.getChats();
      if (!error) {
        setActiveChats(data);
      }
      setLoading((prev) => ({ ...prev, chats: false }));
    }
    fetchChats();
  }, []);

  useEffect(() => {
    const getAndSetOnlineUsers = (data: TOnlineUsers) => {
      setOnlineUsers(data);
    };
    socket?.on("getUsers", getAndSetOnlineUsers);

    return () => {
      socket?.off("getUsers", getAndSetOnlineUsers);
    };
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{
        activeChats,
        setActiveChats,
        activeChat,
        setActiveChat,
        setMessages,
        messages,
        loading,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
