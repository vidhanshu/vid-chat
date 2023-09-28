import Image from "next/image";
import dayjs from "dayjs";
import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TMessageProps = {
  isMe?: boolean;
  message?: string;
  receiverAvatar?: string;
  myAvatar?: string;
  receiverUsername?: string;
  createdAt: string;
};
export const Message: React.FC<TMessageProps> = ({
  isMe,
  message,
  receiverAvatar,
  myAvatar,
  receiverUsername,
  createdAt,
}) => (
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
      {!isMe && receiverAvatar ? (
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
      {isMe && myAvatar ? (
        <div className="w-6 h-6 relative rounded-full overflow-hidden">
          <Image
            src={myAvatar}
            alt="user-avatar"
            fill
            quality={10}
            className="object-cover w-auto"
          />
        </div>
      ) : null}
      <h5 className="text-sm md:text-base">{isMe ? "Me" : receiverUsername}</h5>
    </div>
    <p className="py-2 text-sm md:text-base">{message}</p>
    <div className="flex justify-end">
      <span className={cn("text-xs", isMe ? "text-white" : "text-gray-500")}>
        {dayjs(createdAt).format("h:mm A")}
      </span>
    </div>
  </div>
);

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
