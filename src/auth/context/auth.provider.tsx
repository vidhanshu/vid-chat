"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import GenericLoadingPage from "@/src/common/components/GenericLoadingPage";

import { AuthContext } from "@/src/auth/context/auth.context";

import authService from "@/src/auth/services/auth.service";

import { FRONTEND_ROUTES } from "@/src/common/utils/routes";

import { TUser } from "@/src/auth/types";

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
        return router.push(FRONTEND_ROUTES.signUp);
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
