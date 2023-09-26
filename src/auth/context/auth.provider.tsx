"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import { AuthService } from "../services/authService";
import { TUser } from "./types";
import { useRouter } from "next/navigation";
import GenericLoadingPage from "@/src/common/components/GenericLoadingPage";

const authService = new AuthService();
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let id: any = null;
    async function getUser() {
      try {
        setLoading(true);
        const { error, data } = await authService.GetMe();
        if (error) throw new Error("Unauthorized");
        setUser(data);
      } catch (error) {
        return router.push("/sign-up");
      } finally {
        // doing this stuff because routing takes time
        id = setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }
    getUser();
    () => clearTimeout(id);
  }, []);

  if (loading) return <GenericLoadingPage />;

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
