import  { useContext } from "react";

import { ChatContext } from "./chat.context";

const useChat = () => useContext(ChatContext);

export default useChat;
