import { Socket } from "socket.io-client";

import { toast } from "@/components/ui/use-toast";

import chatService from "@/src/home/service/chat.service";

import { TMessage } from "@/src/home/types";

type TSendMessageParams = {
  message?: string;
  fileUrl?: string;
  audioRef?: React.RefObject<HTMLAudioElement>;
  sender: string;
  receiver: string;
  setMessages: React.Dispatch<React.SetStateAction<TMessage[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket | null;
};

export async function sendMessageHandler({
  message,
  fileUrl,
  audioRef,
  sender,
  receiver,
  setMessages,
  setMessage,
  socket,
}: TSendMessageParams) {
  if (!message && !fileUrl) {
    return toast({
      title: "Info",
      description: "Message or file is required",
    });
  }

  await audioRef?.current?.play();

  /**
   * for sending message quickly generating the message dummy and storing it in the context
   */
  const dummyId = new Date().toISOString();
  const chatId = new Date().toISOString();
  const dummyMessage = {
    _id: dummyId,
    chat: chatId,
    message,
    fileUrl,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sender,
    receiver,
    read: false,
  };

  setMessages((prev: TMessage[]) => [...prev, dummyMessage]);
  setMessage("");

  /**
   * Store message to db
   */
  const { data } = await chatService.sendMessage(
    { messageToBeSent: message, fileUrl },
    receiver
  );

  /**
   * emiting event after saving message to db because we need _id for edit/delete message purpose
   */
  socket?.emit("sendMessage", {
    chat: data?.chat,
    _id: data?._id,
    message: message,
    fileUrl,
    receiver,
    sender,
  });

  /**
   * replace dummy message with actual message after saving to db
   */
  setMessages((prev: TMessage[]) =>
    prev.map((m) => (m._id === dummyId ? data : m))
  );
}
