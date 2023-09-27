import { Socket } from "socket.io-client";
import { TUser } from "../auth/context/types";
import { TChat } from "./components/types";

export type TMessage = {
  _id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  sender: string;
  receiver: string;
  read: boolean;
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
