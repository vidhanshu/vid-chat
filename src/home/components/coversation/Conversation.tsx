import React, { LegacyRef, forwardRef } from "react";
import dayjs from "dayjs";

import { cn } from "@/lib/utils";
import { TMessage } from "../../types";

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
    return (
      <div className="max-h-[calc(100vh_-_270px)] p-4 gap-y-4 flex flex-col overflow-y-auto">
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
                  "border-b-[1px] pb-2",
                  isMe ? "border-blue-700" : ""
                )}
              >
                <h5>{isMe ? "Me" : recieverUsername}</h5>
              </div>
              <p className="py-2">{message}</p>
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
