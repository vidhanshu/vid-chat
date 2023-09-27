"use client";

import { API, handleApiError } from "@/src/common/utils/api";
import { toast } from "@/components/ui/use-toast";

export class AuthService {
  async Signup(username: string, email: string, password: string) {
    try {
      const { data } = await API.post("/auth/sign-up", {
        username,
        email,
        password,
      });
      const { token, message } = data;
      if (message) {
        toast({
          title: "Success",
          description: message,
        });
      }
      localStorage.setItem("access_token", token);
      return { error: null, data: token };
    } catch (error) {
      return handleApiError(error);
    }
  }

  async Signin(email: string, password: string) {
    try {
      const { data } = await API.post("/auth/sign-in", {
        email,
        password,
      });
      const { token, message } = data;
      if (message) {
        toast({
          title: "Success",
          description: message,
        });
      }
      localStorage.setItem("access_token", token);
      return { error: null, data: token };
    } catch (error) {
      return handleApiError(error);
    }
  }

  async Signout(): Promise<{
    error?: any;
    message?: any;
    data?: any;
  }> {
    try {
      const { data } = await API.post("/auth/sign-out");
      const { message } = data;
      if (message) {
        toast({
          title: "Success",
          description: message,
        });
      }
      localStorage.removeItem("access_token");
      return { error: null, data: null };
    } catch (error) {
      return handleApiError(error);
    }
  }

  async GetMe() {
    try {
      const { data } = await API.get("/users/me");
      return { error: null, data: data?.data };
    } catch (error) {
      return handleApiError(error);
    }
  }
}
