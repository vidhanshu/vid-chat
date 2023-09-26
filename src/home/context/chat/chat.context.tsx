import { createContext } from "react";
import { TChatContext } from "../types";

export const defaultChatContextValue = {
  activeChat: null,
  setActiveChat: () => {},
  messages: [],
  setMessages: () => {},
  loading: false,
};

export const ChatContext = createContext<TChatContext>(defaultChatContextValue);
