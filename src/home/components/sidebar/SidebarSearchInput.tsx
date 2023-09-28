"use client";

import React from "react";
import { SearchIcon, X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import UserCard from "./UserCard";

import useChat from "@/src/home/context/chat/use-chat";

import { TUser } from "@/src/auth/types";

type SidebarSearchInputProps = {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  isSearching: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  users: TUser[];
};
const SidebarSearchInput: React.FC<SidebarSearchInputProps> = ({
  setIsSearching,
  isSearching,
  search,
  setSearch,
  users,
}) => {
  const { onlineUsers, setActiveChat } = useChat();

  return (
    <div className="relative flex gap-x-2 items-center border-[1px] rounded-sm p-2 search-bar-hover-element">
      <SearchIcon className="w-5 h-5 text-slate-400" />
      <input
        onFocus={() => {
          setIsSearching(true);
        }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        className="focus:outline-none flex-grow"
        placeholder="Enter username to search..."
      />
      <IconButton onClick={() => setSearch("")} className="p-1 hidden md:block">
        <X className="w-4 h-4 text-slate-400" />
      </IconButton>

      {isSearching && (
        <div className="absolute top-full left-0 w-full p-2 bg-white shadow-sm rounded-sm border-[1px]">
          {!search ? (
            <span className="text-sm text-slate-400">Type to search...</span>
          ) : (
            <div className="space-y-2">
              {users.map((u) => {
                return (
                  <UserCard
                    avatar={u.avatar}
                    key={u._id}
                    username={u.username}
                    online={onlineUsers[u._id]}
                    handleClick={() => {
                      setActiveChat(u);
                      setIsSearching(false);
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarSearchInput;
