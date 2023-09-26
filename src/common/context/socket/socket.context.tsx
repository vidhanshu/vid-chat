import { Socket } from "socket.io-client";
import { createContext } from "react";

type TSocketContext = {
  socket: null | Socket;
  isConnected: boolean;
};

export const SocketContext = createContext<TSocketContext>({
  socket: null,
  isConnected: false,
});
