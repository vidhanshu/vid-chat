"use client";

import React, { LegacyRef, forwardRef } from "react";

import {
  Message,
  TypingMessage,
} from "@/src/home/components/coversation/Message";
import NoConversations from "@/src/home/components/coversation/NoConversations";

import useChat from "@/src/home/context/chat/use-chat";

import { TReceiverTyping } from "@/src/home/types";

type TConversationProps = {
  receiverTyping: TReceiverTyping;
};
const Conversation = forwardRef(
  ({ receiverTyping }: TConversationProps, ref?: LegacyRef<HTMLDivElement>) => {
    const { activeChat, messages } = useChat();
    
    return (
      <div className="h-[calc(100vh_-_266px)] p-4 gap-y-4 flex flex-col overflow-y-auto">
        {!!messages.length ? (
          messages.map((message, _) => {
            return <Message key={_} message={message} />;
          })
        ) : (
          <NoConversations />
        )}
        {/**
         * TYPING STATUS:
         * 1) chat is active and
         * 2) reciever is typing and
         * 3) the opened chat is the one who is typing
         */}
        {activeChat &&
        receiverTyping.typing &&
        receiverTyping.sender === activeChat?._id ? (
          <TypingMessage
            receiverAvatar={activeChat?.avatar}
            receiverUsername={activeChat?.username}
          />
        ) : null}
        {/* to scroll to bottom */}
        <div ref={ref} />
      </div>
    );
  }
);

export default Conversation;

Conversation.displayName = "Conversation";
