"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import ActionTooltip from "@/src/common/components/Tooltip";
import Conversation from "@/src/home/components/coversation/Conversation";
import NoActiveChat from "@/src/home/components/coversation/NoActiveChat";
import ConversationSkeleton from "@/src/home/components/coversation/ConversationSkeleton";
import SendMessageInput from "@/src/home/components/coversation/SendMessageInput";
import ConversationHeader from "@/src/home/components/coversation/ConversationHeader";

import useChat from "@/src/home/context/chat/use-chat";
import useSocket from "@/src/home/context/socket/use-socket";
import { useAuth } from "@/src/auth/context/use-auth";

import { ChatService } from "@/src/home/service/chat.service";

import { scrollInView } from "@/src/common/utils/scroll-in-view";
import { updateActiveChats } from "@/src/home/utils/update-active-chats";

import { TChat, TMessage, TReceiverTyping } from "@/src/home/types";

const chatService = new ChatService();
const ConversationSection = () => {
  const [receiverTyping, setReceiverTyping] = useState<TReceiverTyping>({
    typing: false,
    sender: "",
  });

  const { socket } = useSocket();
  const {
    activeChat,
    setActiveChat,
    messages,
    loading,
    setMessages,
    activeChats,
    setActiveChats,
  } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    scrollInView(bottomRef);
  }, [bottomRef.current, messages, receiverTyping]);

  useEffect(() => {
    // to fetch chats if new message is recieved
    async function fetchChats() {
      const { data, error } = await chatService.getChats();
      if (!error) {
        setActiveChats(data);
      }
    }
    const getAndSetNewMessage = async (data: TMessage) => {
      // to update messages, iff the message is from active chat
      if (data.sender === activeChat?._id) {
        setMessages((prev: TMessage[]) => [...prev, data]);
      }
      // play sound
      await audioRef.current?.play();
      // to update last message in chats
      setActiveChats((prev: TChat[]) => updateActiveChats(prev, data));
      // check if the message is coming from new user
      const isNewChatRequest = !activeChats.some((chat) => {
        const participants = chat.participants.map((p) => p._id);
        return (
          participants.includes(data.sender) &&
          participants.includes(data.receiver)
        );
      });

      if (isNewChatRequest) {
        // fetch chats if new chat is created
        fetchChats();
      }
    };
    socket?.on("newMessage", getAndSetNewMessage);

    return () => {
      socket?.off("newMessage", getAndSetNewMessage);
    };
  }, [socket, activeChats, activeChat]);

  return (
    <>
      <div className="col-span-8 md:border-l-[1px] flex flex-col justify-between">
        <div className="border-b-[1px] p-2 flex justify-between items-center h-14">
          <ConversationHeader receiverTyping={receiverTyping} />
          {activeChat ? (
            <ActionTooltip description="Close this chat">
              <IconButton onClick={() => setActiveChat(null)}>
                <X className="w-5 h-5 text-gray-600" />
              </IconButton>
            </ActionTooltip>
          ) : null}
        </div>
        {activeChat ? (
          loading.messages ? (
            <ConversationSkeleton />
          ) : (
            <>
              <Conversation ref={bottomRef} receiverTyping={receiverTyping} />
              <SendMessageInput
                receiverTyping={receiverTyping}
                setReceiverTyping={setReceiverTyping}
              />
            </>
          )
        ) : (
          <NoActiveChat />
        )}
      </div>
      <audio className="hidden" ref={audioRef} src="/message_received.mp3" />
    </>
  );
};

export default ConversationSection;
