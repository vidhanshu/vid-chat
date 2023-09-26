import React, { useContext } from "react";
import { SocketContext } from "./socket.context";

const useSocket = () => {
  return useContext(SocketContext);
};

export default useSocket;
