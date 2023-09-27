"use client";

import { SearchIcon } from "lucide-react";
import React, { HTMLAttributes, useEffect, useState } from "react";

import UserCard from "./UserCard";
import SidebarSkeleton from "./SidebarSkeleton";

import { useAuth } from "@/src/auth/context/use-auth";
import { useDebounce } from "@/src/common/hooks/use-debounce";
import useChat from "../../context/chat/use-chat";

import { UserService } from "../../service/user.service";

import { TUser } from "@/src/auth/context/types";
import { cn } from "@/lib/utils";

const userService = new UserService();
const Sidebar: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { user } = useAuth();
  const { setActiveChat, activeChats, loading, onlineUsers } = useChat();

  const [search, setSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [users, setUsers] = useState<TUser[]>([]);
  const key = useDebounce(search, 500);

  useEffect(() => {
    async function searchUser() {
      const { data, error } = await userService.searchUser(key);
      if (!error) {
        setUsers(data);
      }
    }
    searchUser();
  }, [key]);

  useEffect(() => {
    const handleClickAway = (ev: any) => {
      if (!(ev.target as HTMLElement).closest(".search-bar-hover-element")) {
        setIsSearching(false);
      }
    };
    document.addEventListener("click", handleClickAway);

    return () => document.removeEventListener("click", handleClickAway);
  }, []);

  return (
    <aside className={cn("col-span-4 h-[calc(100vh_-_150px)]", className)} {...props}>
      <div className="border-b-[1px] p-2 h-14 flex items-center justify-center">
        <h1 className="text-center font-bold">Users</h1>
      </div>
      <div className="p-4">
        <div className="relative flex gap-x-2 items-center border-[1px] rounded-sm p-2 search-bar-hover-element">
          <SearchIcon className="w-5 h-5 text-slate-400" />
          <input
            onFocus={() => {
              setIsSearching(true);
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="focus:outline-none flex-grow"
            placeholder="Enter username to search..."
          />

          {isSearching && (
            <div className="absolute top-full left-0 w-full p-4 bg-white shadow-sm rounded-sm border-[1px]">
              {!search ? (
                <span className="text-sm text-slate-400">
                  Type to search...
                </span>
              ) : (
                <>
                  {users.map((u) => {
                    return (
                      <UserCard
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="max-h-[calc(100vh_-_150px)] md:max-h-[calc(100vh_-_150px_-_130px)] overflow-hidden">
        <h5 className="px-4 font-medium mb-2">Recent chats</h5>
        <div className="px-4 py-4 space-y-2  md:h-[calc(100vh_-_308px)] h-[calc(100vh_-_200px)] overflow-auto">
          {loading.chats ? (
            <SidebarSkeleton count={20} />
          ) : !!activeChats?.length ? (
            activeChats.map((chat) => {
              const oppositeUser = chat.participants.find(
                (p) => p._id !== user?._id
              );
              return (
                <UserCard
                  key={chat._id}
                  username={oppositeUser?.username}
                  last_message={chat.last_message}
                  handleClick={() => setActiveChat(oppositeUser)}
                  online={
                    oppositeUser?._id ? onlineUsers[oppositeUser?._id] : false
                  }
                />
              );
            })
          ) : (
            <div>No Recent Chats</div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;