import { Socket } from "socket.io-client";

import { TUser } from "@/src/auth/types";

export type TChat = {
  _id: string;
  participants: TUser[];
  last_message: string;
  createdAt: string;
  updatedAt: string;
};

export type TMessage = {
  _id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  sender: string;
  receiver: string;
  read?: boolean;
  deleted?: boolean;
  edited?: boolean;
};

export type TOnlineUsers = { [key: string]: boolean };

export type TChatContext = {
  activeChat: TUser | null;
  setActiveChat: Dispatch<SetStateAction<string | null>>;
  messages: TMessage[];
  setMessages: Dispatch<SetStateAction<TMessage[]>>;
  activeChats: TChat[];
  setActiveChats: Dispatch<SetStateAction<TChat[]>>;
  loading: {
    messages: boolean;
    chats: boolean;
  };
  onlineUsers: TOnlineUsers;
};

export type TSocketContext = {
  socket: null | Socket;
  isConnected: boolean;
};

export type TReceiverTyping = {
  typing: boolean;
  sender: string;
};
