"use client";

import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

import { SocketContext } from "./socket.context";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socketInstance, setSocketInstance] = useState<null | Socket>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    setSocketInstance(io("http://localhost:8000"));
  }, []);

  useEffect(() => {
    if (!socketInstance) return;
    socketInstance.on("connect", () => {
      setIsConnected(true);
    });
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });
    return () => {
      socketInstance.off("connect");
      socketInstance.off("disconnect");
    };
  }, [socketInstance]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketInstance,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
