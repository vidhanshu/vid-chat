"use client";

import React, { useEffect, useRef, useState } from "react";
import { SearchIcon, X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserCard from "@/src/home/components/sidebar/UserCard";

import useChat from "@/src/home/context/chat/use-chat";

import { TUser } from "@/src/auth/types";
import { Button } from "@/components/ui/button";
import { LoadingAnimation } from "@/src/home/components/coversation/Message";

type SidebarSearchInputProps = {
  search: string;
  isLodingResults: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  users: TUser[];
  closeSheet?: () => void;
};
const SidebarSearchInput: React.FC<SidebarSearchInputProps> = ({
  search,
  setSearch,
  users,
  isLodingResults,
  closeSheet,
}) => {
  const { onlineUsers, setActiveChat } = useChat();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-2">
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setOpen(false);
          }
        }}
      >
        <DialogTrigger onClick={() => setOpen(true)} className="w-full">
          <Button variant="outline" className="w-full">
            <span className="flex items-center gap-x-2">
              <SearchIcon className="w-5 h-5 text-slate-400" /> Search users
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[calc(100vh_-_40px)]">
          <DialogHeader>
            <DialogTitle className="mb-2">Search users</DialogTitle>
            <DialogDescription>
              <div className="flex gap-x-2 items-center border-[1px] rounded-sm p-1 mb-4">
                <SearchIcon className="w-5 h-5 text-slate-400" />
                <input
                  autoFocus={false}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                  className="focus:outline-none w-full bg-transparent"
                  placeholder="Enter username to search..."
                />
                <IconButton
                  onClick={() => setSearch("")}
                  className="p-1 hidden md:block"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </IconButton>
              </div>

              <div>
                {!search ? (
                  <span className="text-sm text-slate-400">
                    Type to search...
                  </span>
                ) : isLodingResults ? (
                  <LoadingAnimation title="Searching..." emote="🔍" />
                ) : !!users?.length ? (
                  <div className="space-y-2 max-h-[calc(100vh_-_200px)] overflow-y-auto">
                    {users.map((u) => {
                      return (
                        <UserCard
                          avatar={u.avatar}
                          key={u._id}
                          username={u.username}
                          online={onlineUsers[u._id]}
                          handleClick={() => {
                            setActiveChat(u);
                            setOpen(false);
                            if (closeSheet) {
                              closeSheet();
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    No users found with query: <b>{search}</b>
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SidebarSearchInput;
