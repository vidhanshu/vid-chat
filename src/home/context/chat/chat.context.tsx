import { createContext } from "react";
import { TChatContext } from "../../types";

export const defaultChatContextValue = {
  activeChat: null,
  setActiveChat: () => {},
  messages: [],
  setMessages: () => {},
  activeChats: [],
  setActiveChats: () => {},
  loading: {
    messages: false,
    chats: false,
  },
  onlineUsers: {},
};

export const ChatContext = createContext<TChatContext>(defaultChatContextValue);
