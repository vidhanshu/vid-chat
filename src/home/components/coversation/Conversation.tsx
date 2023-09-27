"use client";

import Image from "next/image";
import dayjs from "dayjs";
import React, { LegacyRef, forwardRef } from "react";

import { cn } from "@/lib/utils";
import { TMessage } from "../../types";
import useChat from "../../context/chat/use-chat";
import { useAuth } from "@/src/auth/context/use-auth";

type TConversationProps = {
  messages: TMessage[];
  myId?: string;
  recieverUsername?: string;
};
const Conversation = forwardRef(
  (
    { messages, myId, recieverUsername }: TConversationProps,
    ref?: LegacyRef<HTMLDivElement>
  ) => {
    const { activeChat } = useChat();
    const { user } = useAuth();
    return (
      <div className="h-[calc(100vh_-_270px)] p-4 gap-y-4 flex flex-col overflow-y-auto">
        {messages.map(({ _id, sender, createdAt, message }, _) => {
          const isMe = sender === myId;
          return (
            <div
              className={cn(
                "p-4 rounded-md w-fit max-w-[80%]",
                !isMe ? "bg-slate-100" : "bg-blue-600 text-white",
                !isMe ? "" : "self-end"
              )}
              key={_}
            >
              <div
                className={cn(
                  "border-b-[1px] pb-2 flex gap-x-2 items-center",
                  isMe ? "border-blue-700 justify-start flex-row-reverse" : ""
                )}
              >
                {!isMe && activeChat?.avatar ? (
                  <Image
                    src={activeChat.avatar}
                    alt="user-avatar"
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                ) : null}
                {isMe && user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="user-avatar"
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                ) : null}
                <h5 className="text-sm md:text-base">
                  {isMe ? "Me" : recieverUsername}
                </h5>
              </div>
              <p className="py-2 text-sm md:text-base">{message}</p>
              <div className="flex justify-end">
                <span
                  className={cn(
                    "text-xs",
                    isMe ? "text-white" : "text-gray-500"
                  )}
                >
                  {dayjs(createdAt).format("h:mm A")}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={ref} />
      </div>
    );
  }
);

export default Conversation;

Conversation.displayName = "Conversation";
