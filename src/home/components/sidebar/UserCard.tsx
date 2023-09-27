"use client";

import React from "react";

import { StringShortener } from "@/src/common/utils/string-manipulation";
import { User2 } from "lucide-react";
import ActionTooltip from "@/src/common/components/Tooltip";

type TUserCardProps = {
  last_message?: string;
  username?: string;
  handleClick: () => void;
  online?: boolean;
};
const UserCard = (props: TUserCardProps) => {
  const { last_message, username, handleClick, online = false } = props;

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer px-4 py-2 bg-slate-100 rounded-sm w-full flex justify-between items-center"
    >
      <div className="flex gap-x-4 items-center">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center">
          <User2 className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h6 className="font-medium">{username}</h6>
          {last_message ? (
            <p className="text-gray-600 text-sm">
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
