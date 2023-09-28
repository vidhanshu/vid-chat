"use client";

import React, { HTMLAttributes, useEffect, useState } from "react";

import UserCard from "@/src/home/components/sidebar/UserCard";
import SidebarSkeleton from "@/src/home/components/sidebar/SidebarSkeleton";
import SidebarSearchInput from "@/src/home/components/sidebar/SidebarSearchInput";

import useChat from "@/src/home/context/chat/use-chat";
import { useAuth } from "@/src/auth/context/use-auth";
import { useDebounce } from "@/src/common/hooks/use-debounce";

import { UserService } from "@/src/home/service/user.service";

import { cn } from "@/lib/utils";

import { TUser } from "@/src/auth/types";

const userService = new UserService();
type TSidebarProps = HTMLAttributes<HTMLDivElement> & {
  onUserClick?: () => void;
};
const Sidebar: React.FC<TSidebarProps> = ({
  className,
  onUserClick,
  ...props
}) => {
  const { user } = useAuth();
  const { setActiveChat, activeChats, loading, onlineUsers, activeChat } =
    useChat();

  const [search, setSearch] = useState<string>("");
  const [isLodingResults, setIsLodingResults] = useState<boolean>(false);
  const [users, setUsers] = useState<TUser[]>([]);
  const key = useDebounce<string>(search, 500);

  useEffect(() => {
    async function searchUser() {
      setIsLodingResults(true);
      const { data, error } = await userService.searchUser(key);
      if (!error) {
        setUsers(data);
      }
      setIsLodingResults(false);
    }
    searchUser();
  }, [key]);

  return (
    <aside
      className={cn("col-span-4 h-[calc(100vh_-_150px)]", className)}
      {...props}
    >
      <div className="border-b-[1px] p-2 h-14 flex items-center justify-center">
        <h1 className="text-center font-bold">Users</h1>
      </div>
      <div className="p-4">
        <SidebarSearchInput
          closeSheet={onUserClick}
          isLodingResults={isLodingResults}
          search={search}
          setSearch={setSearch}
          users={users}
        />
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
                  avatar={oppositeUser?.avatar}
                  username={oppositeUser?.username}
                  last_message={chat.last_message}
                  handleClick={() => {
                    setActiveChat(oppositeUser);
                    if (onUserClick) {
                      onUserClick();
                    }
                  }}
                  online={
                    oppositeUser?._id ? onlineUsers[oppositeUser?._id] : false
                  }
                  active={activeChat?._id === oppositeUser?._id}
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
