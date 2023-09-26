"use client";

import { API, handleApiError } from "@/src/common/utils/api";

export class AuthService {
  async Signup(username: string, email: string, password: string) {
    try {
      const { data } = await API.post("/auth/sign-up", {
        username,
        email,
        password,
      });
      if (data?.error) {
        return { error: data.error, data: null };
      }
      const { token } = data;
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
      if (data?.error) {
        return { error: data.error, data: null };
      }
      localStorage.setItem("access_token", data.token);
      return { error: null, data };
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
      if (data?.error) {
        return { error: data.error, data: null };
      }
      localStorage.removeItem("access_token");
      return { error: null, message: data?.message };
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
