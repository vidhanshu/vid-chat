"use client";

import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import ActionTooltip from "@/src/common/components/Tooltip";
import Conversation from "@/src/home/components/coversation/Conversation";
import NoActiveChat from "@/src/home/components/coversation/NoActiveChat";
import ConversationSkeleton from "@/src/home/components/coversation/ConversationSkeleton";
import SendMessageInput from "@/src/home/components/coversation/SendMessageInput";
import ConversationHeader from "@/src/home/components/coversation/ConversationHeader";

import useChat from "@/src/home/context/chat/use-chat";

import useMessageSockets from "@/src/home/hooks/use-message-sockets";

const ConversationSection = () => {
  const { activeChat, setActiveChat, loading, setMessages } = useChat();
  /**
   * Extracted all the socket logic to a custom hook
   */
  const { audioRef, bottomRef, receiverTyping, setReceiverTyping } =
    useMessageSockets();

  return (
    <>
      <div className="col-span-8 md:border-l-[1px] flex flex-col justify-between">
        <div className="border-b-[1px] p-2 flex justify-between items-center h-14">
          <ConversationHeader receiverTyping={receiverTyping} />
          {activeChat ? (
            <ActionTooltip description="Close this chat">
              <IconButton
                onClick={() => {
                  setActiveChat(null);
                  setMessages([]);
                }}
              >
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
