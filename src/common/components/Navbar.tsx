"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useSocket from "@/src/home/context/socket/use-socket";
import { useAuth } from "@/src/auth/context/use-auth";

import { AuthService } from "@/src/auth/services/auth.service";

import { FRONTEND_ROUTES } from "@/src/common/utils/routes";

const authService = new AuthService();
const Navbar = () => {
  const router = useRouter();
  const { isConnected } = useSocket();
  const { setUser, user } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSignout = async () => {
    setLoading(true);

    await authService.Signout();

    setUser(null);
    router.push(FRONTEND_ROUTES.signIn);
    setLoading(false);
  };

  return (
    <div className="shadow-sm border-b-[1px]">
      <div className="max-w-screen-xl m-auto flex justify-between items-center p-4">
        <h1 className="text-lg font-bold">
          <Link href={FRONTEND_ROUTES.chat}>Vchat</Link>
        </h1>
        <div className="flex gap-x-4 items-center">
          {isConnected ? (
            <Badge className="bg-green-600 hover:bg-green-600">Connected</Badge>
          ) : (
            <Badge className="bg-red-600 hover:bg-red-600">Not conencted</Badge>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2">
              <div className="flex items-center gap-x-2">
                {user?.username}
                {user?.avatar ? (
                  <Image
                    src={user?.avatar}
                    alt="user-avatar"
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                    <User2 className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={FRONTEND_ROUTES.profile}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled={loading} onClick={handleSignout}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
