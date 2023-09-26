"use client";

import { useAuth } from "@/src/auth/context/use-auth";
import UserCard from "./UserCard";

type TUser = {
  userId: string;
  socketId: string;
  username: string;
};

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="col-span-4">
      <div className="border-b-[1px] p-2">
        <h1 className="text-center font-bold">Users</h1>
      </div>
      <div className="space-y-2 p-4">
        {[{ username: "Vidhanshu" }].map((user) => (
          <UserCard key={user.username} {...user} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
