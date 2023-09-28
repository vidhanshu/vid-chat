"use client";

import Image from "next/image";
import React from "react";
import { User2 } from "lucide-react";

import ActionTooltip from "@/src/common/components/Tooltip";
import { TypingAnimation } from "@/src/home/components/coversation/Message";

import useChat from "@/src/home/context/chat/use-chat";

import { TReceiverTyping } from "@/src/home/types";

type TConversationHeaderProps = {
  receiverTyping: TReceiverTyping;
};
const ConversationHeader: React.FC<TConversationHeaderProps> = ({
  receiverTyping,
}) => {
  const { activeChat, onlineUsers } = useChat();

  const online = activeChat?._id ? onlineUsers[activeChat?._id] : false;
  const avatar = activeChat?.avatar;
  const username = activeChat?.username;

  return (
    <div className="flex gap-x-4 items-center">
      {avatar ? (
        <Image
          src={avatar}
          alt="user-avatar"
          width={32}
          height={32}
          className="rounded-full w-8 h-8 object-cover"
          quality={75}
        />
      ) : (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
          <User2 className="w-5 h-5 text-gray-600" />
        </div>
      )}
      <h1 className="text-center font-bold">
        {username ? username : "Start Conversation"}
      </h1>
      {online ? (
        <ActionTooltip description={`${username} is online`}>
          <div className="flex items-center gap-x-2">
            <div className="end-0 w-3 h-3 rounded-full bg-green-500" />
            <span className="hidden md:block">online</span>
          </div>
        </ActionTooltip>
      ) : username ? (
        <ActionTooltip description={`${username} is offline`}>
          <div className="flex items-center gap-x-2">
            <div className="end-0 w-3 h-3 rounded-full bg-red-500" />
            <span className="hidden md:block">offline</span>
          </div>
        </ActionTooltip>
      ) : null}
      {/**
       * 1) chat is active and
       * 2) reciever is typing and
       * 3) the opened chat is the one who is typing
       */}
      {activeChat &&
      receiverTyping.typing &&
      receiverTyping.sender === activeChat?._id ? (
        <TypingAnimation className="ml-4" />
      ) : null}
    </div>
  );
};

export default ConversationHeader;
