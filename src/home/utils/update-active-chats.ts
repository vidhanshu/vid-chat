import { TChat } from "@/src/home/types";
import { TMessage } from "@/src/home/types";

export const updateActiveChats = (prev: TChat[], data: TMessage) => {
  const chats = [...prev];
  const sender = data.sender;
  const receiver = data.receiver;
  const chatIndex = chats.findIndex((chat) => {
    const participants = chat.participants.map((p) => p._id);
    return participants.includes(sender) && participants.includes(receiver);
  });
  if (chatIndex !== -1) {
    chats[chatIndex].last_message = data.message!;
  }
  return chats;
};
