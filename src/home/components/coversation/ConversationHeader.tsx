import Image from "next/image";
import React from "react";
import { User2 } from "lucide-react";

import ActionTooltip from "@/src/common/components/Tooltip";

type TConversationHeaderProps = {
  online?: boolean;
  username?: string;
  avatar?: string;
};
const ConversationHeader: React.FC<TConversationHeaderProps> = ({
  username,
  online = false,
  avatar,
}) => {
  return (
    <div className="flex gap-x-4 items-center">
      {avatar ? (
        <Image
          src={avatar}
          alt="user-avatar"
          width={32}
          height={32}
          className="rounded-full"
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
          <div className="end-0 w-3 h-3 rounded-full bg-green-500" />
        </ActionTooltip>
      ) : username ? (
        <ActionTooltip description={`${username} is offline`}>
          <div className="end-0 w-3 h-3 rounded-full bg-red-500" />
        </ActionTooltip>
      ) : null}
    </div>
  );
};

export default ConversationHeader;
