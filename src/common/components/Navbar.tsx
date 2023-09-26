"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/src/auth/services/authService";
import { useToast } from "@/components/ui/use-toast";

import useSocket from "../context/socket/use-socket";
import { useAuth } from "@/src/auth/context/use-auth";

const authService = new AuthService();
const Navbar = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { isConnected } = useSocket();
  const { setUser } = useAuth();

  const handleSignout = async () => {
    const { message, error } = await authService.Signout();
    if (error)
      return toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    toast({
      title: "Success",
      description: message,
    });
    setUser(null);
    router.push("/sign-in");
  };

  return (
    <div className="shadow-sm border-b-[1px]">
      <div className="max-w-screen-xl m-auto flex justify-between items-center p-4">
        <h1 className="text-lg font-bold">Vchat</h1>
        <div className="flex gap-x-4 items-center">
          {isConnected ? (
            <Badge className="bg-green-600 hover:bg-green-600">Connected</Badge>
          ) : (
            <Badge className="bg-red-600 hover:bg-red-600">Not conencted</Badge>
          )}

          <Button onClick={handleSignout}>Sign out</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
