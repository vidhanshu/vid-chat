"use client";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { HTMLAttributes } from "react";
import { FileText, MoreVertical } from "lucide-react";

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
import { StringShortener } from "@/src/common/utils/string-manipulation";

type TMessageProps = {
  message: TMessage;
};
export const Message: React.FC<TMessageProps> = ({ message }) => {
  const { onOpen } = useModal();
  const { user } = useAuth();
  const { activeChat } = useChat();

  const { createdAt, sender, deleted, edited, fileUrl } = message;
  const isMe = sender === user?._id;

  const isImg = fileUrl?.match(/\.(jpeg|jpg|gif|png)$/i);

  return (
    <>
      <div
        className={cn(
          "p-4 rounded-md w-fit max-w-full",
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
          {!deleted && fileUrl && isImg ? (
            <div
              onClick={() => onOpen("VIEW_IMAGE", { message })}
              className="relative min-w-[250px] w-full h-[250px] rounded-lg overflow-hidden cursor-pointer"
            >
              <Image
                src={fileUrl}
                alt="message-image"
                fill
                className="object-contain"
              />
            </div>
          ) : null}
          {!deleted && fileUrl && !isImg ? (
            <div className="relative md:min-w-[250px] w-full h-[100px]">
              <Link href={fileUrl} target="_blank" referrerPolicy="no-referrer">
                <div
                  className={cn(
                    "w-full h-[100px] border-[1px] rounded-lg shadow-sm flex flex-col gap-y-4 items-center justify-center transition",
                    isMe
                      ? "hover:bg-blue-500 border-blue-700 active:bg-blue-700"
                      : "hover:bg-gray-200 active:bg-gray-300"
                  )}
                >
                  <FileText
                    className={cn(
                      "w-14 h-14",
                      isMe ? "text-blue-800" : "text-gray-400"
                    )}
                  />
                  <span className="px-2 text-xs">
                    {StringShortener(fileUrl.split("/").pop() || "", 25)}
                  </span>
                </div>
              </Link>
            </div>
          ) : null}
          {fileUrl ? (
            <div
              className={cn(
                "border-b-[1px] my-2",
                isMe ? "border-blue-700" : "border-gray-200"
              )}
            />
          ) : (
            ""
          )}
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
