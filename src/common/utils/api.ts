import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const authInterceptor = (req: any) => {
  let accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};

export const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(authInterceptor);

export const handleApiError = async (error: any) => {
  let errorMessage = error.response?.data?.error;

  if (error.response?.data?.error && error.response?.config?.method !== "get") {
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  } else {
    errorMessage = "An unexpected error occurred.";
  }
  return { error: errorMessage, data: null };
};
