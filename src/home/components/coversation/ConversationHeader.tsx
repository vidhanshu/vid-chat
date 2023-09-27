import React from "react";

import ActionTooltip from "@/src/common/components/Tooltip";

type TConversationHeaderProps = {
  online?: boolean;
  username?: string;
};
const ConversationHeader: React.FC<TConversationHeaderProps> = ({
  username,
  online = false,
}) => {
  return (
    <div className="flex gap-x-4 items-center">
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
