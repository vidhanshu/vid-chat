"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { HTMLAttributes } from "react";
import { MoreVertical } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useChat from "@/src/home/context/chat/use-chat";
import useAuth from "@/src/auth/context/use-auth";
import { useModal } from "@/src/common/hooks/use-modal";

import { cn } from "@/lib/utils";

import { TMessage } from "@/src/home/types";

type TMessageProps = {
  message: TMessage;
};
export const Message: React.FC<TMessageProps> = ({ message }) => {
  const { onOpen } = useModal();
  const { user } = useAuth();
  const { activeChat } = useChat();

  const { createdAt, sender, deleted, edited } = message;
  const isMe = sender === user?._id;

  return (
    <>
      <div
        className={cn(
          "p-4 rounded-md w-fit max-w-[80%]",
          !isMe ? "bg-slate-100" : "bg-blue-600 text-white",
          !isMe ? "" : "self-end"
        )}
      >
        <div
          className={cn(
            "border-b-[1px] pb-2 flex gap-x-2 items-center",
            isMe ? "border-blue-700 justify-start flex-row-reverse" : ""
          )}
        >
          {isMe && !deleted ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <IconButton className="hover:bg-blue-500 active:bg-blue-700">
                  <MoreVertical className="w-4 h-4 text-white" />
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => onOpen("EDIT_MESSAGE", { message })}
                >
                  Edit message
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onOpen("DELETE_MESSAGE", { message })}
                >
                  Delete message
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          {!isMe && activeChat?.avatar ? (
            <div className="w-6 h-6 relative rounded-full overflow-hidden">
              <Image
                src={activeChat.avatar}
                alt="user-avatar"
                fill
                quality={10}
                className="object-cover w-auto"
              />
            </div>
          ) : null}
          {isMe && user?.avatar ? (
            <div className="w-6 h-6 relative rounded-full overflow-hidden">
              <Image
                src={user.avatar}
                alt="user-avatar"
                fill
                quality={10}
                className="object-cover w-auto"
              />
            </div>
          ) : null}
          <h5 className="text-sm md:text-base">
            {isMe ? "Me" : activeChat?.username}
          </h5>
        </div>
        <p className="py-2 text-sm md:text-base">
          {deleted ? (
            <em className="text-[14px]">This message has been deleted</em>
          ) : (
            message.message
          )}
        </p>
        <div className="flex justify-end">
          <span
            className={cn("text-xs", isMe ? "text-white" : "text-gray-500")}
          >
            {dayjs(createdAt).format("h:mm A")}
            {edited && !deleted ? " . Edited" : null}
          </span>
        </div>
      </div>
    </>
  );
};

type TTypingMessageProps = {
  receiverAvatar?: string;
  receiverUsername?: string;
};
export const TypingMessage: React.FC<TTypingMessageProps> = ({
  receiverAvatar,
  receiverUsername,
}) => (
  <div className={cn("p-4 rounded-md w-fit max-w-[80%] bg-slate-100")}>
    <div className={cn("border-b-[1px] pb-2 flex gap-x-2 items-center")}>
      {receiverAvatar ? (
        <div className="w-6 h-6 relative rounded-full overflow-hidden">
          <Image
            src={receiverAvatar}
            alt="user-avatar"
            fill
            quality={10}
            className="object-cover w-auto"
          />
        </div>
      ) : null}
      <h5 className="text-sm md:text-base">{receiverUsername}</h5>
    </div>
    <LoadingAnimation />
  </div>
);

type TLoadingAnimationProps = HTMLAttributes<HTMLParagraphElement> & {
  title?: string;
  emote?: string;
};
export const LoadingAnimation: React.FC<TLoadingAnimationProps> = ({
  className,
  title = "Typing",
  emote = "🔥",
  ...props
}) => (
  <p className={cn("py-2 text-sm", className)} {...props}>
    {title}
    <span className="ml-2 text-xs animate-ping delay-0">{emote}</span>
    <span className="text-xs animate-ping delay-300">{emote}</span>
    <span className="text-xs animate-ping delay-700">{emote}</span>
  </p>
);
