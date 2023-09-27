import { useContext } from "react";
import { SocketContext } from "./socket.context";

const useSocket = () => useContext(SocketContext);

export default useSocket;
