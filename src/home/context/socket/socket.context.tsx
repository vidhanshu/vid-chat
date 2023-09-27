import { createContext } from "react";
import { TSocketContext } from "../../types";

export const SocketContext = createContext<TSocketContext>({
  socket: null,
  isConnected: false,
});
