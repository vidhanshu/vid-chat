"use client";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const authInterceptor = (req: any) => {
  let accessToken = localStorage.getItem("access_token");
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
  try {
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};
