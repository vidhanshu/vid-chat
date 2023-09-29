"use client";

import React, { HTMLAttributes } from "react";

import { StringShortener } from "@/src/common/utils/string-manipulation";
import { User2 } from "lucide-react";
import ActionTooltip from "@/src/common/components/Tooltip";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TUserCardProps = HTMLAttributes<HTMLDivElement> & {
  last_message?: string;
  username?: string;
  handleClick: () => void;
  online?: boolean;
  avatar?: string;
  active?: boolean;
};
const UserCard = (props: TUserCardProps) => {
  const {
    last_message,
    username,
    handleClick,
    online = false,
    avatar,
    className,
    active,
  } = props;

  return (
    <div
      onClick={handleClick}
      className={cn(
        "cursor-pointer px-4 py-2 bg-slate-100 rounded-sm w-full flex justify-between items-center transition",
        active ? "bg-black text-white hover:bg-black/80" : "hover:bg-slate-200",
        className
      )}
    >
      <div className="flex gap-x-4 items-center">
        {avatar ? (
          <Image
            src={avatar}
            alt="user-avatar"
            width={32}
            height={32}
            className="rounded-full w-auto"
          />
        ) : (
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
            <User2 className="w-5 h-5 text-gray-600" />
          </div>
        )}
        <div>
          <h6 className="text-sm md:text-base font-medium">{username}</h6>
          {last_message ? (
            <p className={cn("text-xs md:text-sm ", active ? "text-white" : "text-gray-600")}>
              {StringShortener(last_message, 25)}
            </p>
          ) : null}
        </div>
      </div>
      {online ? (
        <ActionTooltip description={`${username} is online`}>
          <div className="end-0 w-3 h-3 rounded-full bg-green-500" />
        </ActionTooltip>
      ) : (
        <ActionTooltip description={`${username} is offline`}>
          <div className="end-0 w-3 h-3 rounded-full bg-red-500" />
        </ActionTooltip>
      )}
    </div>
  );
};

export default UserCard;
