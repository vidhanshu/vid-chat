import { createContext } from "react";
import { TAuthContext, TUser } from "./types";

export const AuthContext = createContext<TAuthContext>({
  user: null,
  setUser: () => {},
  loading: false
});
